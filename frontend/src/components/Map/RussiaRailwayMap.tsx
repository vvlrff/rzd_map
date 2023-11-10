import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const RussiaRailwayMap = () => {
  const mapStyle = {
    height: "calc(93vh)",
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
      maxZoom={20}
    >

      {/* Цветные тайлы OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Черно-белые тайлы OpenStreetMap */}
      {/* <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>'
      /> */}

      {/* ЖД тайлы openrailwaymap */}
      <TileLayer
        url="https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openrailwaymap.org/">OpenRailwayMap</a> contributors'
      />
    </MapContainer>
  );
};

export default RussiaRailwayMap;


