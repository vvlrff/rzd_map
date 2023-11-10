import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { mapApi } from "../../services/mapApi";
import L from 'leaflet';


interface StationData {
  ST_ID: number;
  LATITUDE: number;
  LONGITUDE: number;
}

const RussiaRailwayMap = () => {
  const { data: stationCoordData } = mapApi.useGetStationCoordQuery('')

  const trailSignIcon = new L.Icon({
    iconUrl: "https://c0.klipartz.com/pngpicture/450/381/gratis-png-estacion-de-tren-ferrocarril-transporte-iconos-de-la-computadora-pista-icono-de-la-tiroides.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

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

      {stationCoordData && stationCoordData.map((station: StationData) => (
          <Marker
            key={station.ST_ID}
            position={[station.LATITUDE, station.LONGITUDE]}
            icon={trailSignIcon}
          >
            {/* Можно добавить Popup, если необходимо */}
            <Popup>{`Станция ID: ${station.ST_ID}`}</Popup>
          </Marker>
      ))}
    </MapContainer>
  );
};

export default RussiaRailwayMap;