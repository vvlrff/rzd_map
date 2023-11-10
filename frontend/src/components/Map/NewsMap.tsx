import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RussiaMap = () => {
  const mapStyle = {
    height: "calc(90vh + 30px)",
    display: "flex",
    alignItems: "stretch",
  };

  const center = [55.7558, 37.6176]; // Координаты центра России
  const zoom = 6; // Начальный уровень масштабирования

  return (
    <MapContainer
      style={mapStyle}
      center={center as [number, number]}
      zoom={zoom}
      maxZoom={10}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default RussiaMap;
