import React from 'react';

interface StrokeProps {
    width: number,
    color: string,
    height: number,
    styles?: object
}

export default function Stroke({height, width, color, styles} : StrokeProps) {
    return (
        <span style={{ height, borderRadius: height, width, backgroundColor: color, display: 'block', ...styles }} />
    );
}