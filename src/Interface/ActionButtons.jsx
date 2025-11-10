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

    @media only screen and (max-width: 1600px) {
        top: 0;
        left: 60%;
    }

    @media only screen and (max-width: 720px) {        
        left: 90%;
    } 
`;

const ActionButtonsWrapper = styled.div`
    position: relative;
    a{
        position: absolute;
        width: 64px;
        height: 64px;
        left: 20%;
        margin-left: 10px;

        @media only screen and (max-width: 1600px) {
            width: 56px;
            height: 56px;  
            &:before {
                width: 56px;
                height: 56px;
            }
        }
    }
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;   
    position: absolute;
    border: none;         
    cursor: ${props => props.disabled ? 'unset' : 'pointer'};
    color: white;
    -webkit-text-stroke: 1.2px black;
    background-color: transparent;
    font-size: 26px;
    &:before{
        border-radius: 50%;
        clip-path: polygon(50% 0%, 80.9% 9.5%, 97.6% 34.5%, 97.6% 65.5%, 80.9%
        90.5%, 50% 100%, 19.1% 90.5%, 2.4% 65.5%, 2.4% 34.5%, 19.1% 9.5%, 50% 0%);
    }

    @media only screen and (max-width: 1600px) {
        font-size: 20px;
    }

    &.start{        
        width: 52px;
        height: 52px;        
        &:before {
            content: "";
            display: flex;
            position: absolute;
            z-index: -1;
            width: 52px;
            height: 52px;         
            background-color: ${buttonRed};                        
            border: 1px solid transparent;      
            outline: 4px solid ${buttonOutline};
            outline-offset: -6px;
        }

        @media only screen and (max-width: 1600px) {
            width: 40px;
            height: 40px;  
            &:before {
                width: 40px;
                height: 40px;
            }
        }
    }

    &.B{
        width: 100%;
        height: 100%;                
        &:before {
            content: "";
            display: flex;
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;        
            background-color: ${buttonGreen};                        
            border: 1px solid transparent;            
            outline: 5px solid ${buttonOutline};
            outline-offset: -8px;
        }

        /* @media only screen and (max-width: 1600px) {
            width: 56px;
            height: 56px;  
            &:before {
                width: 56px;
                height: 56px;
            }
        } */

    }

    &.A{
        width: 64px;
        height: 64px;        
        left: 45%;
        top: 12px;
        margin-left: 10px;
        &:before {
            content: "";
            display: flex;
            position: absolute;
            z-index: -1;
            width: 64px;
            height: 64px;        
            background-color: ${buttonBlue};                                    
            border: 1px solid transparent;      
            outline: 5px solid ${buttonOutline};
            outline-offset: -8px;
        }
        @media only screen and (max-width: 1600px) {
            width: 40px;
            height: 40px;  
            &:before {
                width: 40px;
                height: 40px;
            }
        }
    }
`;

const ActionButtons = (props) => {
    const { setShowAbout } = props;
    return (<ActionButtonsContainer>
        <ActionButtonsWrapper>
            <ActionButton className='start comic-relief' onClick={()=>{setShowAbout(true)}} >About</ActionButton>
            <a href='https://github.com/indiecollin/Majoras' target="_blank" rel="noopener noreferrer">
                <ActionButton className='B comic-relief'>Code</ActionButton>
            </a>
            <ActionButton className='A comic-relief' disabled>More</ActionButton>
        </ActionButtonsWrapper>
    </ActionButtonsContainer>)
};  

export default ActionButtons;