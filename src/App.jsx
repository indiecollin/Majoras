import React, { Component } from 'react';
import styles from '../styles.css';
import MajorasMenu from './MajorasMenu.jsx';
import MobileNotice from './Interface/MobileNotice.jsx';
import TouchDeviceNotice from './Interface/TouchDeviceNotice.jsx';
import useOrientationReset from './hooks/useOrientationReset.jsx';


const App = () => {
    useOrientationReset(); 
    return <>
        <MajorasMenu/>                
        <MobileNotice/>
        <TouchDeviceNotice/>
    </>
}

export default App;