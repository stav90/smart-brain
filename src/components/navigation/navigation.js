import React from 'react';
import './navigation.styles.scss';
import Logo from '../logo/logo';

const Navigation = ({ onRouteChange, isSignedIn}) => {
    
    if (isSignedIn) {
        return ( //display when signed in
            <nav > 
            <div className='nav-container'>    
            <Logo className='logo'/>             
            <span className= 'buttons'>    
            <p className='f3 link dim undelined pa3 pointer signin' onClick={() => onRouteChange('signout') }>sign out</p>
                                      
                </span> 
                </div>
        </nav> 
            ); 
        } else {
    return ( //display when signed out
        <nav > 
            <div className='nav-container'>    
            <Logo className='logo'/>             
            <span className= 'buttons'>    
            <p className='f3 link dim undelined pa3 pointer signin' onClick={() => onRouteChange('signin') }>sign in</p>
            <p className='f3 link dim undelined pa3 pointer signin' onClick={() => onRouteChange('register')}>register</p>                             
                </span> 
                </div>
        </nav>
    );   
        };      
    
};

export default Navigation;