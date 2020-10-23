import React from 'react';

import './Stroke.css';

interface StrokeProps {
    width: number,
    color: string,
    height: number,
    gradientColor?: string,
    styles?: object
}

export default function Stroke({height, width, color, styles, gradientColor} : StrokeProps) {
    return (
        <span style={{ height, borderRadius: height, width, backgroundColor: color, display: 'block', ...styles, backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0), ${gradientColor ? gradientColor : 'rgb(200, 200, 200)'}, rgba(0, 0, 0, 0))` }}  className="stroke" />
    );
}