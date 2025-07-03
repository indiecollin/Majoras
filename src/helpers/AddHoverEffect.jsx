import React, { useState, useMemo, useContext } from 'react';
import MenuContext from '../MenuContext.jsx';
import styled from 'styled-components';

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
    z-index: 1010;
    position: absolute;
    ${props => props.positionRules}
    transition: transform 2s;
    transform-origin: ${props => `${props.transformOriginX} ${props.transformOriginY}`};
    opacity: 0;
`;

const useHover = (props, ref) => {
  const [hovered, setHovered] = useState(false);
  const { setInfoBar, setInstructions, setHoveredEquip } = useContext(MenuContext);
  const eventHandlers = useMemo(() => ({    
    onMouseOver() {
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
    onMouseOut() { 
        setHovered(false);
        setInfoBar('\u00A0');
        setInstructions();
        if(props.equip){            
            setHoveredEquip({});
        }
        props.onBlur && props.onBlur();
    }
  }), []);
  
  return [hovered, eventHandlers];
}

const AddHoverEffect = ((props, ref) => {
  const { selecting } = useContext(MenuContext); 
  const { parentWidth } = props.children.props;
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
      const [hovered, eventHandlers] = useHover(props.children.props, ref);
       return <HoverContainer positionRules = {mirrorStyles} flexRules={ flexStyles }>
          <Component {...props.children.props} {...eventHandlers} {...((ref.current || ref.current === null) ? { ref: ref } : {})}/>
          {
            hovered && !selecting && <>
                <Orbitter delay={'0s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={hovered ? 'hover-orbitter' : ''} />
                <Orbitter delay={'-0.5s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={hovered ? 'hover-orbitter' : ''} />
                <Orbitter delay={'-1.0s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={hovered ? 'hover-orbitter' : ''} />
                <Orbitter delay={'-1.5s'} positionRules = {mirrorStyles} transformOriginX = {transformOriginX} transformOriginY = {transformOriginY} className={hovered ? 'hover-orbitter' : ''} />
            </>
          }           
      </HoverContainer>

});

export default AddHoverEffect;  