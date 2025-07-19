import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "24px"};
    height: ${props => props.dims ? props.dims + 'px' : "24px"};
    fill: #0000003F;
    stroke: #0000007F;  
    /* transform: ${props => props.left ? 'rotate(90deg)' : 'rotate(-90deg)'}; */
`;

const Triangle = (props) => {
        return (                        
<SVG
    viewBox="0 0 32 32"
    version="1.1"
    id="svg1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
>
    <defs id="defs1" />
    <path d="M 0,8 L 16,32 32,8 Z"/>
</SVG>);
};

export default Triangle;