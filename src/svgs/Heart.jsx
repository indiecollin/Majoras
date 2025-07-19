import React from 'react';
import styled from 'styled-components';
import { heartRed, partialPurple, emptyPurple, emptyGray, heartOutline } from '../styles/colors';

const SVG = styled.svg`
    width: ${props => props.dims ? props.dims + 'px' : "26px"};
    height: ${props => props.dims ? props.dims + 'px' : "24px"};
    fill: ${heartRed};
    stroke: ${heartRed};
    transform: scale(1);

    &.empty{
        stroke: ${props => props.defense ? emptyGray : emptyPurple };
        fill: ${props => props.defense ? emptyGray : emptyPurple };
 
    }

    &.quarter{
        .top-right, .bot-right, .bot-left{
            fill: ${props => props.defense ? emptyGray : partialPurple};
            stroke: ${props => props.defense ? emptyGray : partialPurple};
        }
    }

    &.half{
        .top-right, .bot-right{
            fill: ${props => props.defense ? emptyGray : partialPurple};
            stroke: ${props => props.defense ? emptyGray : partialPurple};
        }
    }

    &.three{
        .top-right{
            fill: ${props => props.defense ? emptyGray : partialPurple};
            stroke: ${props => props.defense ? emptyGray : partialPurple};
        }
    }

    g>g>path.defense{
        &.top-right, &.bot-right, &.bot-left, &.top-left{
            stroke: ${props => props.defense ? heartOutline : 'transparent'};
            fill: ${props => props.defense ? heartOutline : 'transparent'};
        }
    }

    
    &.heart-mark{
        animation: heartbeat .5s linear alternate infinite;
    }

    @keyframes heartbeat {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.2);
        }
    }
`;

 const HeartIcon = (props) => {
    const {className} = props;
    return (                        
        <SVG
            version="1.1"
            id="svg1"
            width="360"
            height="360"
            viewBox="0 0 360 360"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
            >
            <defs id="defs1" />
            <g id="layer">
                <g id="g8">
                    <path className={`bot-right ${className}`}
                        d="M 180.39727,311.53118 V 179.44141 h 143.51484 c -31.98703,58.04737 -85.50177,95.08153 -143.51484,132.08977 z"/>
                </g>
                <g id="g7">
                    <path className={`bot-left ${className}`}
                        d="M 179.39487,311.54371 V 179.43911 H 34.598555 c 31.987026,58.04737 85.501765,95.08153 144.796315,132.1046 z" />
                </g>
                <g id="g6">
                    <path className={`top-left ${className}`}
                        d="M 179.39464,178.44389 V 95.060637 c 0,0 -44.11559,-59.816118 -107.955689,-27.607744 C 6.864107,100.03185 34.662557,178.98816 34.476709,178.44389 Z"/>
                </g>
                <g id="g5">
                    <path className={`top-right ${className}`}
                        d="M 180.38722,178.46838 V 95.085433 c 0,0 44.11559,-59.816118 107.95568,-27.607798 64.57484,32.579015 36.77639,111.535015 36.96224,110.990745 z"/>
                </g>
                <g d="g4">
                    <path className={`bot-right defense`}
                        d="m 179.88976,312.41339 v 10 C 258.01443,275.26263 295.12555,238.7428 333.16179,179.32163 h -10 C 286.0193,243.73894 233.085,280.06463 179.88976,312.41339 Z"/>
                </g>
                <g d="g3">
                    <path className={`bot-left defense`}
                        d="m 178.8887,312.42069 v 10 C 100.76404,275.26993 63.652918,238.7501 25.616677,179.32893 h 10 c 37.142491,64.41731 90.076783,100.743 143.272023,133.09176 z"/>
                </g>
                <g d="g2">
                    <path className={`top-right defense`}
                        d="M 179.88585,94.868632 V 84.846646 c -9.79257,-12.189664 88.79668,-78.478817 143.86219,-16.673418 48.52871,54.468512 9.92125,110.551182 9.92125,110.551182 h -8.7874 C 359.60034,51.671134 228.55121,28.423346 179.88585,94.868632 Z"/>
                </g>
                <g d="g1">
                    <path className={`top-left defense`}
                        d="M 179.27136,95.164542 V 85.142556 C 189.06393,72.952892 90.47467,6.66374 35.40916,68.469138 -13.119547,122.93765 25.487913,179.02032 25.487913,179.02032 H 34.27531 C -0.4431362,51.96704 130.606,28.71926 179.27136,95.164542 Z"/>
                </g>
            </g>
        </SVG>
    );
};

export default HeartIcon;