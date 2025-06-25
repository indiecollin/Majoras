import React, { Component } from 'react';
import styles from '../styles.css';
import MajorasMenu from './MajorasMenu.jsx';
import Sun from './svgs/Sun.jsx'


class App extends Component{
    constructor(props){
        super(props);
        this.state = {};        
    }    

    render(){
        // return <Sun/>
        return <MajorasMenu/>
    }
}

export default App;