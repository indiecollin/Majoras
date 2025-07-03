import React, { useState, useRef} from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';

const ButtonGroup = styled.div`
    display: flex;
    position: absolute;
    z-index: 1000;
    top: 62px;
    left: 1200px;
    width: 300px;    

    span{        
        border-radius: 50%;
        width: 64px;
        height: 64px;
        background-color: yellow;
        position: relative;
    }

    span:nth-child(1){   
        left: -8px;   
    }

    span:nth-child(2){   
        top: 32px;
        left: -16px;   
    }

    span:nth-child(3){   
        left: -24px;   
    }
`;

const EquippedItem = styled.img`
    opacity: ${props => props.src ? 0: 1};
    transition: opacity 0 1s linear;
`;

const EquipButtons = (props) => {
    return <ButtonGroup>
        <span ref={props.cLeftRef}><EquippedItem src={props.cLeft.image}/></span>
        <span><EquippedItem src={''}/></span>
        <span><EquippedItem src={''}/></span>
        {/* <span ref={cDownRef}><EquippedItem src={cDown.image}/></span>
        <span ref={cRightRef}><EquippedItem src={cRight.image}/></span> */}
    </ButtonGroup>         
}

export default EquipButtons;