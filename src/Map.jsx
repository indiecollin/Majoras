import React, { useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import AddHoverEffectAbsolute from './helpers/AddHoverEffectAbsolute.jsx';
import MenuContext from './MenuContext.jsx';
import MapImage from '../public/Map/map.png';
import Point from '../public/Map/point.png';

const MapContainer = styled.div`
        background-color: wheat;
        display: flex;
        flex-direction: column;    
        h1{
            margin: 0 auto;
            text-transform: uppercase;
            padding: 16px 20px;
            font-size: 50px;
        }
        /* &>div{        
            padding: 0 120px 60px;

            &>div{
                background-color: #0B0B0F;
                display: flex;
                flex-direction: column;
                position: relative;
            }
        }     */
`;

const MapDisplay = styled.div`
    display: flex;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    justify-content: center;
    position: relative;
    &>img{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    &>div{
        position: absolute;
    }
`;

const MapPoint = styled.div`    
    img{
        position: relative;
    }
`;  

const mapLegend = [
    {x: '51.7%', y: '46.5%', name: 'Clock Town'},
    {x: '46%', y: '58%', name: 'Romani Ranch'},
    {x: '51.5%', y: '75%', name: 'Woodfall'},
    {x: '48.3%', y: '84%', name: 'Deku Palace'},
    {x: '55.7%', y: '22.8%', name: 'Goron Village'},
    {x: '49.3%', y: '15.2%', name: 'Snowhead'},
    {x: '25.1%', y: '59.6%', name: 'Zora Hall'},
    {x: '29.2%', y: '52.2%', name: 'Great Bay Coast'},
    {x: '79%', y: '40%', name: 'Ikana Graveyard'},
    {x: '77.5%', y: '47.5%', name: 'Ikana Valley'},
    {x: '85%', y: '41.3%', name: 'Stone Tower'},
]

const Map = () => {
    const mapDisplayPadding = 4;
    const rotatorOffset = 4;        
    
    return <MapContainer>
        <h1>map</h1>
        <MapDisplay>
            <img src={MapImage}/>
            {
                mapLegend.map(p => {
                    const positions = `
                        left: ${p.x};
                        top: ${p.y};
                    `;  
                    return <AddHoverEffectAbsolute>
                        <MapPoint key={p.name} name={p.name} parentWidth={mapDisplayPadding} absoluteOffset={rotatorOffset} positions={positions}>                    
                            <img src = {Point} />
                        </MapPoint>
                    </AddHoverEffectAbsolute>
                })
            }            
        </MapDisplay>
    </MapContainer>
}

export default Map;
