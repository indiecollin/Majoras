import React from 'react';
import A from '../public/Interface/promptA.png';
import B from '../public/Interface/promptB.png';
import C from '../public/Interface/promptC.png';
import Stick from '../public/Interface/promptStick.png';
import InputImage from './InputImage.jsx';

const ControllerInput = ({children}) => {
    let src;
    switch(children){
        case 'A':
            src = A;
            break;
        case 'B':
            src = B;
            break;
        case 'C':
            src = C;
            break;
        case 'S':
            src = Stick;
            break;
        default:
            return;
    }
    return <InputImage src = {src}/>
};

export default ControllerInput;