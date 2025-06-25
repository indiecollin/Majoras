import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

const HoverContainer = styled.div`
    ${props => props.positionRules }
    ${props => props.flexRules }
    position: relative;
    align-items: center;
    justify-content: center;
    
    *:first-child{
        z-index: 1010;
    }
`;

const Orbitter = styled.div`
    background-color: goldenrod;
    ${props => props.top ? 'top: 0;' : '' }
    ${props => props.bottom ? 'bottom: 0;' : '' }
    ${props => props.left ? 'left: ' + (props.absoluteOffset-props.parentWidth) + 'px;' : '' }
    ${props => props.right ? 'right: ' + (props.absoluteOffset-props.parentWidth) + 'px;' : '' }
    width: 24px;
    height: 24px;
    border-radius: 50%;
    z-index: 1000;
    position: absolute;
    ${props => props.positionRules}
    transition: transform 2s;
    // these numbers work for now. Need to test with other dimensions to see if it needs to be formulaic instead
    ${props => (props.top && props.left) ? `transform-origin: 200% 200%;` : ''}
    ${props => (props.top && props.right) ? `transform-origin: -75% 200%;` : ''}
    ${props => (props.bottom && props.left) ? `transform-origin: 200% -75%;` : ''}
    ${props => (props.bottom && props.right) ? `transform-origin: -75% -75%;` : ''}
    opacity: 0;
`;

const useHover = (onHoverHook, disabled, name, setInfoBar) => {
  const [hovered, setHovered] = useState(false);  
  
  const eventHandlers = useMemo(() => ({
    onMouseOver() { 
        if(disabled) return;
        setHovered(true);
        setInfoBar(name)
        onHoverHook && onHoverHook();
    },
    onMouseOut() { 
        if(disabled) return;
        setHovered(false); 
        setInfoBar('\u00A0');
    }
  }), []);
  
  return [hovered, eventHandlers];
}

const AddHoverEffectAbsolute = (Component, parentWidth, absoluteOffset, setInfoBar) => {  
    const positionRules = [
        'top', 'right', 'left', 'bottom'
    ];

    const flexRules = [
        'flex-grow',
        'flex-shrink',
        'flex-basis',
        'display'
    ];

    const flexStyles = Component.componentStyle.rules[0]
    .split('\n')
    .map(rule => rule.trim())
    .filter(rule => rule.includes(':'))
    .reduce((acc, cur)=>{
        if(flexRules.includes(cur.split(':')[0])){
            acc += `${cur} `
        }
        return acc;
    }, '');

    const mirrorStyles = Component.componentStyle.rules[0]
    .split('\n')
    .map(rule => rule.trim())
    .filter(rule => rule.includes(':'))
    .reduce((acc, cur)=>{
        if(positionRules.includes(cur.split(':')[0])){
            acc += `${cur} `
        }
        return acc;
    }, '');
    return (props) => {
        const [hovered, eventHandlers] = useHover(props.onHover, props.disabled, props.name, setInfoBar);

        return <HoverContainer positionRules = {props.positionRules} flexRules={ flexStyles }>
            <Component {...props} {...eventHandlers}/>
            <Orbitter positionRules = {mirrorStyles} className={hovered ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} top left/>
            <Orbitter positionRules = {mirrorStyles} className={hovered ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} top right/>
            <Orbitter positionRules = {mirrorStyles} className={hovered ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} bottom left/>
            <Orbitter positionRules = {mirrorStyles} className={hovered ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} bottom right/>
        </HoverContainer>
    }
}

export default AddHoverEffectAbsolute;