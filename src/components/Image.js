import React from 'react';

const Image = props => 
    
<img className="Image" src={REACT_APP_MGNL_DAM_RAW + props.image['@link']} alt="Etiam Purus" />


export default Image;
