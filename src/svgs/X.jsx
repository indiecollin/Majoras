import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "16px"};
    height: ${props => props.dims ? props.dims + 'px' : "16px"};
    fill: ${props => props.fill || "#888"};
    cursor: ${props => props.disabled ? 'unset' : 'pointer' };
`;

const XIcon = (props) => {
    return (            
        <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" dims = {props.dims} onClick={props.onClick}>
            <path d="M14.74,16a1.26,1.26,0,0,1-.9-.37L.37,2.16A1.27,1.27,0,0,1,2.16.37L15.63,13.84a1.27,1.27,0,0,1,0,1.79A1.25,1.25,0,0,1,14.74,16Z" transform="translate(0)"/>
            <path d="M1.26,16a1.25,1.25,0,0,1-.89-.37,1.27,1.27,0,0,1,0-1.79L13.84.37a1.27,1.27,0,0,1,1.79,1.79L2.16,15.63A1.26,1.26,0,0,1,1.26,16Z" transform="translate(0)"/>
        </SVG>
    );
};

export default XIcon;