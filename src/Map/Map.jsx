import React, {useContext} from 'react';
import styled from 'styled-components';
import AddHoverEffectAbsolute from '../helpers/AddHoverEffectAbsolute.jsx';
import { mapLegend } from '../data/mapsData.jsx';
import MenuContext from '../MenuContext.jsx';
import { frame } from '../styles/colors.js';
import { mod } from '../helpers/index.js';
import MapImage from '../../public/Map/map.png';
import Point from '../../public/Map/point.png';
import cursor from '../../public/Interface/cursor.wav';

const sounds = {
    cursor: new Audio(cursor),
}

const MapContainer = styled.div`        
    display: flex;
    flex-direction: column;    
    h1{
        background-color: ${frame};
        text-transform: uppercase;
        text-align: center;         
        font-size: 50px;
    }
`;

const MapWrapper = styled.div`
    height: 100%;
    display: flex;
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
    pointer-events: ${props => props.disablelite ? 'none' : 'unset'};
    img{
        position: relative;
    }    
`;  

const Frame = styled.div`
    background-color: ${frame};
    position: relative;
    width: 72px;
`;

const Base = styled.div`
    background-color: ${frame};    
    height: 36px; 
    z-index: -1;
`;

const Map = () => {
    const { curMenu, description } = useContext(MenuContext);
    const mapDisplayPadding = 4;
    const rotatorOffset = 4;      
    const isActive = mod(curMenu, 4) === 3;
    
    return <MapContainer>
        <h1 className='wendy-one-regular'>map</h1>
        <MapWrapper>
            <Frame/>
            <MapDisplay>
                <img src={MapImage}/>
                {
                    mapLegend.map(p => {
                        const positions = `
                            left: ${p.x};
                            top: ${p.y};
                        `;  
                        return <AddHoverEffectAbsolute key={p.name}>
                            <MapPoint key={p.name}
                                name={p.name} 
                                parentWidth={mapDisplayPadding} 
                                absoluteOffset={rotatorOffset}
                                positions={positions} 
                                onHover={() => sounds['cursor'].play()}
                                disablelite={description}
                                disabled={!isActive}
                            >                    
                                <img src = {Point} />
                            </MapPoint>
                        </AddHoverEffectAbsolute>
                    })
                }            
            </MapDisplay>
            <Frame/>
        </MapWrapper>
        <Base/>
    </MapContainer>
}

export default Map;
