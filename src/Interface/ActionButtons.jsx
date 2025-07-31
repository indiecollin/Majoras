import React from 'react';
import styled from 'styled-components';
import { buttonRed, buttonGreen, buttonBlue, buttonOutline } from '../styles/colors.js';

const ActionButtonsContainer = styled.div`
    position: absolute;
    z-index: 1100;
    top: 72px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;    

    button{
        position: absolute;
        color: white;
        -webkit-text-stroke: 1px black;        
        border: 2px solid black;
        outline: 3px solid ${buttonOutline};
        outline-offset: -5px;
        cursor: pointer;

        &:before {
            content: "";
            margin-left: -100%;
        }
        &:after {
            content: "";
            margin-right: -100%;
        }

    }

    .start{
        border-radius: 50%;
        width: 28px;
        height: 28px;
        background-color: ${buttonRed};
    }

    .B{
        margin-left: 10px;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        background-color: ${buttonGreen};
        left: 40px;
    }

    .A{
        margin-left: 10px;
        border-radius: 50%;
        width: 48px;
        height: 48px;        
        background-color: ${buttonBlue};
        left: 100px;
        top: 12px;
    }
`;

const ActionButtonsWrapper = styled.div`
    position: relative;
`;

const ActionButtons = () => {
    return (<ActionButtonsContainer>
        <ActionButtonsWrapper>
            <button className='start comic-relief' onClick={()=>{}}>Return</button>
            <button className='B comic-relief' onClick={()=>{}}>Save</button>
            <button className='A comic-relief' onClick={()=>{}}>Decide</button>
        </ActionButtonsWrapper>
    </ActionButtonsContainer>)
};

export default ActionButtons;