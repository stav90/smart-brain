import React from 'react';
import Clarifai from 'clarifai';

import Navigation from './components/navigation/navigation';
import ImagelinkForm from './components/image-link-form/image-link-form';
import Rank from './components/rank/rank';
import FaceRecognition from './components/face-recognition/face-recognition';
import SignIn from './components/sign-in/sign-in';
import Register from './components/register/register';

import './App.css';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: 'd196d6999b78439ba83ba913441fe72d'
});

const particlesOptions = {  
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
            		}
            	}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  };

  
  
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
}

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    
  };
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    }
    else if (route === 'home') {
      this.setState({isSignedIn: true})
      }
    
    this.setState({route: route});
  }



  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'
          ?
          <div>
            <Rank />
            <ImagelinkForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
          </div>
            
         : (this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
        </div>
    )

  }
};

export default App;
