import React, {useContext} from 'react';
import styled from 'styled-components';
import AddHoverEffectAbsolute from './helpers/AddHoverEffectAbsolute.jsx';
import { mapLegend } from './data/mapsData.jsx';
import MenuContext from './MenuContext.jsx';
import { frame } from './styles/colors.js';
import { mod } from './helpers/index.js';
import MapImage from '../public/Map/map.png';
import Point from '../public/Map/point.png';
import cursorSound from '../public/Interface/cursor.wav';

const MapContainer = styled.div`        
    display: flex;
    flex-direction: column;    
    h1{
        background-color: ${frame};
        text-transform: uppercase;
        text-align: center;         
        font-size: 50px;
        &:before{
            position: absolute;
            z-index: -1;
            content: '';
            inset: 0;
            filter: url(#grainy);        
        }
    }
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
    pointer-events: ${props => props.disableLite ? 'none' : 'unset'};
`;  

const Map = () => {
    const { curMenu, description } = useContext(MenuContext);
    const mapDisplayPadding = 4;
    const rotatorOffset = 4;      
    const isActive = mod(curMenu, 4) === 3;
    
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
                    return <AddHoverEffectAbsolute key={p.name} dims={'24px'}>
                        <MapPoint key={p.name}
                            name={p.name} 
                            parentWidth={mapDisplayPadding} 
                            absoluteOffset={rotatorOffset} 
                            positions={positions} 
                            onHover={() => new Audio(cursorSound).play()}
                            disableLite={description}
                            disabled={!isActive}
                        >                    
                            <img src = {Point} />
                        </MapPoint>
                    </AddHoverEffectAbsolute>
                })
            }            
        </MapDisplay>
    </MapContainer>
}

export default Map;
