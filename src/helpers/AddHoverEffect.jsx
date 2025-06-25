import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
// import useInfoBar  from '../hooks/useInfoBar.jsx';

const HoverContainer = styled.div`
    ${props => props.positionRules }    
    ${props => props.flexRules }
    align-items: center;
    justify-content: center;
    
    *:first-child{
        z-index: 1010;
    }
`;

const Orbitter = styled.div`
    background-color: goldenrod;
    
    width: 24px;
    height: 24px;
    border-radius: 50%;
    animation-delay: ${props => props.delay};
    z-index: 1000;
    position: absolute;
    ${props => props.positionRules}
    transition: transform 2s;
    transform-origin: ${props => `${props.transformOriginX} ${props.transformOriginY}`};
    opacity: 0;
`;

const useHover = (props, setInfoBar, setToEquip, ref) => {
  const [hovered, setHovered] = useState(false);  
  const eventHandlers = useMemo(() => ({
    // is it possible to pass a function to call here to grab current props instead of using whatever props when the addhovereffect was first invoked
    onMouseOver() {
        setHovered(true); 
        setInfoBar(props.name);
        if(setToEquip){
            console.log("show me the morty");            
        }
    },
    onMouseOut() { 
        setHovered(false);
        setInfoBar('\u00A0');
        if(setToEquip){            
            setToEquip();
        }
    }
  }), []);
  
  return [hovered, eventHandlers];
}

const AddHoverEffect = ((props, ref) => {   
  const { parentWidth, setInfoBar, setToEquip} = props.children.props;
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
//   return (props) => {
      const [hovered, eventHandlers] = useHover(props.children.props, setInfoBar, setToEquip, ref);      
    //   const getRef = (ref) => {
    //     console.log(ref);
    //   }
       return <HoverContainer positionRules = {mirrorStyles} flexRules={ flexStyles }>
          <Component {...props.children.props} {...eventHandlers} ref={ref}/>
          <Orbitter delay={'0s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={hovered ? 'hover-orbitter' : ''} />
          <Orbitter delay={'-0.5s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={hovered ? 'hover-orbitter' : ''} />
          <Orbitter delay={'-1.0s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={hovered ? 'hover-orbitter' : ''} />
          <Orbitter delay={'-1.5s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={hovered ? 'hover-orbitter' : ''} />
      </HoverContainer>
//   }

}
);

export default AddHoverEffect;