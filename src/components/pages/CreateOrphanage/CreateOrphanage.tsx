import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../../../images/logo2.svg';

import './create-orphanage.css';
import SideBar from "../../shared/SideBar/SideBar";
import api from "../../../services/api";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const [mapMarkerLatLong, setMapMarkerLatLong] = useState({ lat: 0, lng: 0 });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [open_hours, setOpenHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagesURLs, setImagesURLs] = useState<string[]>([]);

  function handleMapClick(e : LeafletMouseEvent) {
    setMapMarkerLatLong(e.latlng);
  }

  function handleFormSubmit(ev: FormEvent) {
    ev.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('description', description);
    data.append('latitude', String(mapMarkerLatLong.lat));
    data.append('longitude', String(mapMarkerLatLong.lng));
    data.append('instructions', instructions);
    data.append('open_hours', open_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => data.append('images', image));

    api.post('orphanages', data).then(res => {

    });
  }

  function handleImagesSelect(ev: ChangeEvent<HTMLInputElement>) {
    if(!ev.target.files)
      return;
    

    const imagesArray = [...images, ...Array.from(ev.target.files)];

    const imagesURLsArray = imagesArray.map(image => window.URL.createObjectURL(image));

    setImagesURLs(imagesURLsArray);
    setImages(imagesArray);
  }

  return (
    <div id="page-create-orphanage">
      <SideBar/>

      <main>
        <form onSubmit={handleFormSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {(mapMarkerLatLong.lat !== 0) && 
                <Marker interactive={false} icon={happyMapIcon} position={[mapMarkerLatLong.lat, mapMarkerLatLong.lng]} />
              }              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input value={name} onChange={ev => setName(ev.target.value)} id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea value={description} onChange={ev => setDescription(ev.target.value)} id="about" maxLength={300} />
            </div>

            <div className="input-block">
              <label>Fotos</label>

              <div className="images-container">

                {imagesURLs.map(url => <img key={url} src={url} alt="Imagem do orfanato" />)}

                <label htmlFor="images" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input onChange={handleImagesSelect} type="file" multiple id="images" style={{display: 'none'}} />
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea value={instructions} onChange={ev => setInstructions(ev.target.value)} id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário disponível</label>
              <input value={open_hours} onChange={ev => setOpenHours(ev.target.value)} id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button onClick={() => setOpenOnWeekends(true)} type="button" className={open_on_weekends ? "active" : ''}>Sim</button>
                <button onClick={() => setOpenOnWeekends(false)} type="button" className={!open_on_weekends ? "error-active" : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}