import React, { Component } from 'react';
import styled from 'styled-components';
import { frame, darkFrame } from '../styles/colors';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "84px"};
    height: ${props => props.dims ? props.dims + 'px' : "84px"};
    fill: ${frame};
    stroke: ${darkFrame}BF; //75% opacity
    transform-origin: 50% 50%;    
    transform: ${props => props.left ? 'rotate(90deg)' : 'rotate(-90deg)'};
    clip-path: polygon(100% 0, 100% 50%, 50% 100%, 0 50%, 0 0);
    filter: url(#stone);
`;

const BaseIcon = (props) => {
        return (                        
<SVG
    viewBox="0 0 28 28"
    version="1.1"
    id="svg1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
>
    <defs id="defs1" />
    <path d="M 1.058333275, 1.058333275 V 14.28749925 L 14.28749925, 27.516665 27.516665,14.28749925 V 1.058333275 Z"/>
</SVG>);
};

export default BaseIcon;

//style="fill:none;stroke:#000000;stroke-width:0.52916664;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1;stroke-dasharray:none"