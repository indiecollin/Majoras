import React, { Component } from 'react';
import styles from '../styles.css';
import MajorasMenu from './MajorasMenu.jsx';
import useOrientationReset from './hooks/useOrientationReset.jsx';


const App = () => {
    useOrientationReset(); 
    return <MajorasMenu/>
}

export default App;