import React from 'react';




const ImagelinkForm = ({ onInputChange, onSubmit}) => {
    return (
        <div >
            <p className='f5 white' >
                {'This Magic brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='pa4 br3 center'>
            <div className='center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}></input>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
};

export default ImagelinkForm;