import React, { useState, useEffect, useMemo, useContext } from 'react';
import MenuContext from '../MenuContext.jsx';
import styled from 'styled-components';
import { allHover } from '../styles/colors.js';

const HoverContainer = styled.div`
    ${props => props.positionRules }    
    ${props => props.flexRules }
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
    animation-delay: ${props => props.delay}, 0s;
    z-index: 1010;
    position: absolute;
    ${props => props.positionRules}
    transition: transform 2s;
    transform-origin: ${props => `${props.transformOriginX} ${props.transformOriginY}`};
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
`;

const useHover = (props, ref) => {
  const [hovered, setHovered] = useState(false);
  const { setInfoBar, setInstructions, setHoveredEquip } = useContext(MenuContext);
  const isTouchDevice = window?.matchMedia("(pointer:coarse)").matches;
  const eventHandlers = useMemo(() => ({    
    onMouseOver() {    
        if(props.disabled || isTouchDevice) return;    
        setHovered(true); 
        setInfoBar(props.name);
        if(props.equip){
            let equipInfo = {...ref.current.getBoundingClientRect().toJSON()};
            equipInfo.image = props.src;
            equipInfo.name = props.name;
            equipInfo.bottle = props.bottle;
            setHoveredEquip(equipInfo);         
        } else {
            setInstructions(props.instructions);
        }
        props.onHover && props.onHover();    
    },
    onMouseLeave() {     
        if(props.disabled) return;    
        setHovered(false);
        setInfoBar('\u00A0');
        setInstructions();
        if(props.equip){            
            setHoveredEquip({});
        }
        props.onBlur && props.onBlur();
    }
  }), [props.name, props.disabled]);
  
  return [hovered, setHovered, eventHandlers];
}

const AddHoverEffect = ((props, ref) => {
  const { selecting, description } = useContext(MenuContext); 
  const { color, dims, border } = props;
  const { selected, disabled, hoverDisabled } = props.children.props;
  let { parentWidth } = props.children.props;
  if(ref && ref.current){ // hacky fix for variable parent widths
    const element = ref.current.parentElement.parentElement.getBoundingClientRect();
    const parent = ref.current.parentElement.getBoundingClientRect();
    if(element.width ==! parent.width){
        parentWidth = parent.parentElement.getBoundingClientRect().width;
    }

  }
  const Component = props.children.type;
  const orbitterRadius = 12;  
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
  let transformOriginX;
  let transformOriginY;
  if (parentWidth && mirrorStyles.includes('left:')){
      transformOriginX = `${(parentWidth/2) + orbitterRadius}px`;
  } else if(parentWidth && mirrorStyles.includes('right:')){
      transformOriginX = `-${(parentWidth/2 - orbitterRadius)}px`;
  } else{
      // try to get it directly from element
      transformOriginX = '50%';
  }
  if (parentWidth && mirrorStyles.includes('top:')){
      transformOriginY = `${(parentWidth/2)}px`;
  } else if(parentWidth && mirrorStyles.includes('bottom:')){
      transformOriginY = `-${(parentWidth/2)}px`;
  } else{
      // try to get it directly from element
      transformOriginY = '50%'
  }
      const [hovered, setHovered, eventHandlers] = useHover(props.children.props, ref);
      const className = hovered || selected ? 'hover-orbitter' : '';
      useEffect(()=>{
        if(description || disabled){
            setHovered(false);
        }
      },[description, disabled])
       return <HoverContainer positionRules = {mirrorStyles} flexRules={ flexStyles }>
          <Component {...props.children.props} {...eventHandlers} {...((ref.current || ref.current === null) ? { ref: ref } : {})}/>
          {
            ((hovered && !disabled && !hoverDisabled && !selecting) || selected) && <>
                <Orbitter delay={'0s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={className} color={selected ? allHover : color} dims={dims} border={border} />
                <Orbitter delay={'-0.5s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={className} color={selected ? allHover : color} dims={dims} border={border} />
                <Orbitter delay={'-1.0s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={className} color={selected ? allHover : color} dims={dims} border={border} />
                <Orbitter delay={'-1.5s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={className} color={selected ? allHover : color} dims={dims} border={border} />
            </>
          }           
      </HoverContainer>

});

export default AddHoverEffect;  