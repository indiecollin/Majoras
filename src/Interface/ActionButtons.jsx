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
        display: flex;
        align-items: center;
        justify-content: center;   
        position: absolute;
        border: none;         
        cursor: pointer;
        color: white;
        -webkit-text-stroke: 1.2px black;
        background-color: transparent;
        font-size: 26px;
        &:before{
            border-radius: 50%;
            clip-path: polygon(50% 0%, 80.9% 9.5%, 97.6% 34.5%, 97.6% 65.5%, 80.9%
            90.5%, 50% 100%, 19.1% 90.5%, 2.4% 65.5%, 2.4% 34.5%, 19.1% 9.5%, 50% 0%);
        }
    }

    .start{        
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
    }

    .B{
        width: 64px;
        height: 64px;
        left: 80px;
        margin-left: 10px;        
        &:before {
            content: "";
            display: flex;
            position: absolute;
            z-index: -1;
            width: 64px;
            height: 64px;        
            background-color: ${buttonGreen};                        
            border: 1px solid transparent;            
            outline: 5px solid ${buttonOutline};
            outline-offset: -8px;
        }
    }

    .A{
        width: 64px;
        height: 64px;        
        left: 180px;
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