import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import MapMarker from '../../../images/logo2.svg';
import './sidebar.css';

export default function SideBar() {
    return (
        
        <aside className="thin">
            <img src={MapMarker} alt="Happy" />

            <footer>
            <button type="button" onClick={useHistory().goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </button>
            </footer>
        </aside>
    );
}