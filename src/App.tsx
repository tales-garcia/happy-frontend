import React from 'react';
import './styles/global.css';
import Routes from './routes';


export interface OrphanageProps {
  id: number,
  name: string,
  longitude: number,
  latitude: number,
  description: string,
  instructions: string,
  open_hours: string,
  open_on_weekends: boolean,
  images: {
      url: string,
      id: number
  }[]
}

function App() {
  return (
    <div>
      <Routes/>
    </div>
  );
}

export default App;