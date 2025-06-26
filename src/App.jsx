import React, { Component } from 'react';
import styles from '../styles.css';
import MajorasMenu from './MajorasMenu.jsx';


class App extends Component{
    constructor(props){
        super(props);
        this.state = {};        
    }    

    render(){        
        return <MajorasMenu/>
    }
}

export default App;