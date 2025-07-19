import React, { useState, useMemo, useContext, useEffect } from 'react';
import styled from 'styled-components';
import MenuContext from '../MenuContext.jsx';
import { allHover } from '../styles/colors.js';

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
    background-color: transparent;
    ${props => props.top ? 'top: 0;' : '' }
    ${props => props.bottom ? 'bottom: 0;' : '' }
    ${props => props.left ? 'left: ' + (props.absoluteOffset-props.parentWidth) + 'px;' : '' }
    ${props => props.right ? 'right: ' + (props.absoluteOffset-props.parentWidth) + 'px;' : '' }
    width: ${props => props.dims ? props.dims : '24px'};
    height: ${props => props.dims ? props.dims : '24px'};
    border-radius: 50%;
    outline-offset: -6px;
    outline: 2px solid black;
    border: 6px solid ${props => props.color ? props.color : allHover};
    box-shadow: 0 0 0 1px black;
    animation-delay: ${props => props.delay}, 0s;
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
    filter: brightness(100%);
`;

const useHover = (props) => {
  const { setInfoBar, setInstructions } = useContext(MenuContext);
  const [hovered, setHovered] = useState(false);
  const eventHandlers = useMemo(() => ({
    onMouseOver() { 
        if(props.disabled) return;
        setHovered(true);
        setInfoBar(props.name);
        setInstructions(props.instructions)
        props.onHover && props.onHover();
    },
    onMouseLeave() { 
        if(props.disabled) return;
        setHovered(false); 
        setInfoBar('\u00A0');
        setInstructions();
        props.onBlur && props.onBlur();
    }
  }), [props.disabled, props.onHover, props.onBlur]);
  
  return [hovered, setHovered, eventHandlers];
}

const AddHoverEffectAbsolute = ((props, ref) => {
    const { selecting } = useContext(MenuContext);
    const { color, dims} = props;
    const { parentWidth, absoluteOffset, positions, disabled} = props.children.props;
    const Component = props.children.type;

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

    const [hovered, setHovered, eventHandlers] = useHover(props.children.props);
    useEffect(()=>{
        setHovered(false);
    },[disabled])
    return <HoverContainer positionRules = {positions} flexRules={ flexStyles }>            
        <Component {...props.children.props} {...eventHandlers} {...((ref.current || ref.current === null) ? { ref: ref } : {})} />
        {
          hovered &&  !disabled && !selecting && <>
          <Orbitter positionRules = {mirrorStyles} className={hovered ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} color={color} dims={dims} top left/>
          <Orbitter positionRules = {mirrorStyles} className={hovered ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} color={color} dims={dims} top right/>
          <Orbitter positionRules = {mirrorStyles} className={hovered ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} color={color} dims={dims} bottom left/>
          <Orbitter positionRules = {mirrorStyles} className={hovered ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} color={color} dims={dims} bottom right/>
        </>
        }
    </HoverContainer>
});

export default AddHoverEffectAbsolute;