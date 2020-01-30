import React from 'react';


function Button(props) {
return <button {...props} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
    {
        props.icon 
            ? <i className={props.icon}></i> 
            : ''
    }
    {props.title}
</button>;
}

export default Button;
