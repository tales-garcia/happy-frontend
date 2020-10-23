import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import mapMarkerImg from '../../../images/logo2.svg';

import './orphanage.css';
import SideBar from "../../shared/SideBar/SideBar";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import { OrphanageProps } from "../../../App";
import Slider from "../../shared/Slider/Slider";
import Stroke from "../../shared/Stroke/Stroke";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface OrphanageDetailsParams {
  id: string
}

export default function Orphanage() {
  const [orphanage, setOrphanage] = useState<OrphanageProps>();
  const { id } = useParams<OrphanageDetailsParams>();

  useEffect(() => {
    api.get(`orphanages/${id}`).then(res => {
      setOrphanage(res.data.orphanage);
    });
  }, [id]);
  if(orphanage) {
    return (
      <div id="page-orphanage">
        <SideBar/>
  
        <main>
          <div className="orphanage-details">
            

            <Slider images={orphanage.images} />
            
            <div className="orphanage-details-content">
              <h1>{orphanage.name}</h1>
              <p>{orphanage.description}</p>
  
              <div className="map-container">
                <Map 
                  center={[orphanage.latitude, orphanage.longitude]} 
                  zoom={16} 
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                  <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                </Map>
  
                <footer>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
                </footer>
              </div>
  
              <hr />
  
              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>
  
              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                  Segunda à Sexta <br />
                  {orphanage.open_hours}
                </div>
                <div className={orphanage.open_on_weekends ? "open-on-weekends" : "not-open-on-weekends"}>
                  <FiInfo size={32} color={orphanage.open_on_weekends ? "#39CC83" : "#ff669d"} />
                  {orphanage.open_on_weekends ? "Atendemos" : "Não atendemos"} <br />
                  fim de semana
                </div>
              </div>
  
              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  
  } else {
    return (<div id="page-orphanage">
              <SideBar/>

              <main>
                <div className="orphanage-details">
                  

                  <img src="" alt=""/>
                  
                  <div className="orphanage-details-content">
                    <h1><Stroke width={500} height={50} color="#858585" /></h1>
                    <p>
                      <Stroke styles={{marginBottom: 10}} width={500} height={20} color="#BDBDBD" />
                      <Stroke styles={{marginBottom: 10}} width={400} height={20} color="#BDBDBD" />
                      <Stroke styles={{marginBottom: 10}} width={460} height={20} color="#BDBDBD" />
                      <Stroke width={500} height={20} color="#BDBDBD" />
                    </p>

                    <div className="map-container">
                      <Map 
                        center={[-15.8292324, -47.9310554]}
                        zoom={16} 
                        style={{ width: '100%', height: 280 }}
                        dragging={false}
                        touchZoom={false}
                        zoomControl={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                      >
                        <TileLayer 
                          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                        />
                      </Map>

                      <footer>
                        <p><Stroke width={100} height={20} color="#BDBDBD" /></p>
                      </footer>
                    </div>

                    <hr />

                    <h2><Stroke width={180} height={40} color="#858585" /></h2>
                    <p><Stroke width={100} height={20} color="#BDBDBD" /></p>

                    <div className="open-details">
                      <div className="hour">
                        <FiClock size={32} color="#15B6D6" />
                        <Stroke width={180} height={40} color="#858585" /> <br />
                        <Stroke width={100} height={20} color="#BDBDBD" />
                      </div>
                      <div className="open-on-weekends">
                        <FiInfo size={32} color="#39CC83" />
                        <Stroke width={180} height={30} color="#858585" /> <br />
                        <Stroke width={100} height={20} color="#BDBDBD" />
                      </div>
                    </div>

                    <button type="button" className="contact-button">
                      <FaWhatsapp size={20} color="#FFF" />
                      <Stroke gradientColor="rgb(84 210 80)" width={300} height={20} color="#60F35B" />
                    </button>
                  </div>
                </div>
              </main>
            </div>)
  }
}