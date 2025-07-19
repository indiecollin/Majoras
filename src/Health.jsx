import React, { useState } from 'react';
import styled from 'styled-components';
import Heart from './svgs/Heart.jsx';

const HealthContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 280px;
`;

const Health = (props) => {
    const {health, hearts, defense} = props;
    const getHeartClasses = (index) => {
        //if index = 0  then health needs to be greater than or equal to 4 to be full
        let className = '';
        const fullThreshold = (index+1)*4;
        if(health > fullThreshold){
            className+= 'full ';
        } else if(health == fullThreshold){
            className+= 'full heart-mark '; 
        } else if(health == fullThreshold-1){
            className+= 'three heart-mark '
        } else if(health == fullThreshold-2){
            className+= 'half heart-mark '
        } else if(health == fullThreshold-3){
            className+= 'quarter heart-mark '
        } else{
            className+= 'empty '
        }
        return className;
    }
    
    return <HealthContainer>
        {new Array(hearts).fill().map((_,i) => {
            return <Heart key={`heart-${i}`} className={getHeartClasses(i)} defense={defense}/>        
        })}                        
    </HealthContainer>
}

export default Health;