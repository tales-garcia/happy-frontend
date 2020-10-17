import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import MapMarkerImg from '../../../images/logo2.svg';

import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import './map.css';
import api from '../../../services/api';
import MapMarker from '../../shared/MapMarker/MapMarker';
import { OrphanageProps } from '../../../App';


function MapPage() {

    const [orphanages, setOrphanages] = useState([]);

    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data.orphanages);
        })
    }, [])

    return (
        <div id="page-map">
            
            <aside>
                <header>
                    <img src={MapMarkerImg} alt="Marcador"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Distrito Federal</strong>
                    <span>Brasília</span>
                </footer>
            </aside>

            <Map
                center={[-15.8292324, -47.9310554]}
                zoom={11}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map((orphanage : OrphanageProps) => {
                    return (
                        <MapMarker
                        key={orphanage.id}
                        latitude={orphanage.latitude}
                        longitude={orphanage.longitude}
                        orphanageId={orphanage.id}
                        orphanageName={orphanage.name}
                        />
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}
export default MapPage;