import React, { useState } from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
import { frame } from './styles/colors.js';

const InfoBarWrapper = styled.div`
    position: absolute;
    z-index: 1000;
    background-color: ${frame};
    width: 300px;
    color: #ffffff;
    -webkit-text-stroke: 1px black;
    font-family: cursive;
    font-weight: 600;
    font-size: 20px;
    bottom: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
`;

const InfoBar = (props) => {    
    const [info, setInfo] = useState(props.infoBar.name);
    setInterval(()=>{
        setInfo(prevState => {
            return prevState.info === props.infoBar.name && props.infoBar.instructions ? props.infoBar.instructions : props.infoBar.name;
        })
    }, 2000)
    return <InfoBarWrapper>{info}</InfoBarWrapper>    
}

export default InfoBar;