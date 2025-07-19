import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import MenuContext from './MenuContext.jsx';
import { rotateButtonInfo } from './data/index.js';
import { frame, infoBarNav } from './styles/colors.js';
import InfoBarCs from '../public/Interface/info-bar-Cs.png';

const InfoBarWrapper = styled.div`
    position: absolute;
    z-index: 1000;
    background-color: ${frame};
    width: 300px;
    color: ${props => props.nav ? infoBarNav : 'white'};
    -webkit-text-stroke: 1px black;
    font-family: cursive;
    font-weight: 600;
    font-size: 24px;
    bottom: 72px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:before{
        position: absolute;
        z-index: -1;
        content: '';
        inset: 0;
        filter: url(#grainy);        
    }

    img{
        height: 36px;
    }
`;

const InfoBar = (props) => {
    const { description, setInfoBar } = useContext(MenuContext);
    const {name, equippable} = props;
    let instructions, nav;
    if (rotateButtonInfo.includes(name)){
        nav = true;
    } else if(equippable){
        instructions = <><img src={InfoBarCs}/> to Equip</>
    } else{
        instructions = props.instructions;
    }
    const [info, setInfo] = useState(name ? <p>{name}</p> : <p>{'\u00A0'}</p>);

    useEffect(()=>{
        if(description){
            setInfoBar('\u00A0');
            setInfo(<p>{'\u00A0'}</p>);
            return;
        }
        setInfo(<p>{name}</p>);
        if(name?.trim().length){
            const interval = setInterval(() => {
                setInfo((prevState) => prevState.props.children === name && instructions ? instructions : <p>{name}</p>);
            }, 1500);
            return () => clearInterval(interval);
        }        
    },[name, description]);

    return <InfoBarWrapper nav={nav}>{info}</InfoBarWrapper>
}

export default InfoBar;