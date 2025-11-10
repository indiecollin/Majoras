import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tingle from '../../public/Interface/tingle.png';
import XIcon from '../svgs/X.jsx';
import { background } from '../styles/colors';

const TouchDeviceNoticeContainer = styled.div`
    display: flex;    
    z-index: 20000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${background};
    color: #ffffff;
    padding: 24px;

    @media only screen and (max-width: 480px) {
        display: none;
    }

    div{
        margin-top: 40px;
        text-align: center;
    }

    svg{
        position: absolute;
        top: 5%;
        right: 5%;
    }

    h1{
        text-align: center;
    }
`;

const TouchDeviceNotice = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [showNotice, setShowNotice] = useState(true);

    useEffect(()=>{
        if (!window.matchMedia) return;
        setIsTouchDevice(window.matchMedia("(pointer:coarse)").matches);
    },[])

    return isTouchDevice && showNotice && <TouchDeviceNoticeContainer>
        <XIcon onClick = {() => { setShowNotice(false) }}/>
        <div>
            <h1>Attention!</h1>
            <h2>While this app functions for touchscreen devices like phones and tablets, mouse and keyboard are recommended for the best user experience.</h2>      
        </div>
        <img src={Tingle}/>      
    </TouchDeviceNoticeContainer>
}

export default TouchDeviceNotice;