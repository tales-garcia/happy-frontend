import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import leaflet from 'leaflet';
import MapMarkerImg from '../../../images/logo2.svg';


const mapIcon = leaflet.icon({
    iconUrl: MapMarkerImg,
    iconAnchor: [29, 68],
    iconSize: [58, 68],
    popupAnchor: [170, 2]
})

interface mapMarkerProps {
    latitude: number,
    longitude: number,
    orphanageId: number,
    orphanageName: string
}

const MapMarker : React.FC<mapMarkerProps> = ({ latitude, longitude, orphanageName, orphanageId }) => {
    return (
        <Marker
        position={[ latitude, longitude ]}
        icon={mapIcon}
        >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="marker-popup" >
                {orphanageName}
                <Link to={`/orphanages/${orphanageId}`}>
                    <FiArrowRight size={20} color="#fff"/>
                </Link>
            </Popup>
        </Marker>
    );
}

export default MapMarker;