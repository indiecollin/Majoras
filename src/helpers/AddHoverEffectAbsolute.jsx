import React, { useState, useMemo, useContext, useEffect } from 'react';
import styled from 'styled-components';
import MenuContext from '../MenuContext.jsx';
import { allHover } from '../styles/colors.js';

const HoverContainer = styled.div`
    ${props => props.positionRules }
    ${props => props.passedRules}
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    
    *:first-child{
        z-index: 1020;
    }
`;

const Orbitter = styled.div`
    --b: ${props => props.border ? props.border : 4}px;  /* border thickness */
    --s: ${props => props.dims ? props.dims : 24}px; /* preferred size shape */
    --c: ${props => props.color ? props.color: allHover};
    ${props => props.top ? 'top: 0;' : '' }
    ${props => props.bottom ? 'bottom: 0;' : '' }
    ${props => props.left ? 'left: ' + (props.absoluteOffset-props.parentWidth) + 'px;' : '' }
    ${props => props.right ? 'right: ' + (props.absoluteOffset-props.parentWidth) + 'px;' : '' }
    animation-delay: ${props => props.delay}, 0s;
    z-index: 1010;
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
    width: round(var(--s),4*var(--b));
    aspect-ratio: 1;
    border-radius: 50%;
    background: 
        repeating-radial-gradient(calc(2*var(--b)) at top,#0000 -1px,var(--c) 0 calc(50% - 1px),#0000 50% calc(100% - 1px)) calc(50% + var(--b)) 100%, 
        repeating-radial-gradient(calc(2*var(--b)) at bottom,var(--c) -1px,#0000 0 calc(50% - 1px),var(--c) 50% calc(100% - 1px)) 50% 0;
    background-size: 150% 50%;
    background-repeat: no-repeat;
    mask: 
        radial-gradient(calc(1.5*var(--b)) at calc(100% - var(--b)/2) 0, #0000 calc(100%/3), #000 calc(100%/3 + 1px) 110%, #0000 0) calc(50% + var(--b)/2) 
        100%/calc(3*var(--b)) 50% exclude no-repeat, 
        conic-gradient(#000 0 0);

    @media only screen and (max-width: 1600px) {                  
        ${props => props.parentWidth!=props.absoluteOffset && props.left ?
            'left: calc('  + (props.absoluteOffset-props.parentWidth) + 'px + 1 / 22 * 100vw - 580px / 11);' : '' }
        ${props => props.parentWidth!=props.absoluteOffset && props.right ?
            'right: calc('  + (props.absoluteOffset-props.parentWidth) + 'px + 1 / 22 * 100vw - 580px / 11);' : '' }
    }
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
    const { color, dims, border, rules} = props;
    const { parentWidth, absoluteOffset, positions, selected, disabled} = props.children.props;
    const Component = props.children.type;

    const positionRules = [
        'top', 'right', 'left', 'bottom'
    ];

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
    return <HoverContainer positionRules = {positions} passedRules={rules}>            
        <Component {...props.children.props} {...eventHandlers} {...((ref.current || ref.current === null) ? { ref: ref } : {})} />
        {
          ((hovered && !disabled && !selecting) || selected) && <>
          <Orbitter positionRules = {mirrorStyles} className={hovered || selected ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} color={selected ? allHover : color} dims={dims} border={border} top left/>
          <Orbitter positionRules = {mirrorStyles} className={hovered || selected ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} color={selected ? allHover : color} dims={dims} border={border} top right/>
          <Orbitter positionRules = {mirrorStyles} className={hovered || selected ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} color={selected ? allHover : color} dims={dims} border={border} bottom left/>
          <Orbitter positionRules = {mirrorStyles} className={hovered || selected ? 'hover-orbitter' : ''} parentWidth={parentWidth} absoluteOffset={absoluteOffset} color={selected ? allHover : color} dims={dims} border={border} bottom right/>
        </>
        }
    </HoverContainer>
});

export default AddHoverEffectAbsolute;