import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { mapApi } from "../../services/mapApi";
import L from "leaflet";

interface RussiaRailwayMapProps {
    data?: TrainData[];
}

interface TrainData {
    train_index: string;
    station_data: stationTrainData[];
}

interface stationTrainData {
    ST_ID_DISL: number;
    LATITUDE: number;
    LONGITUDE: number;
    OPERDATE: number;
    ST_ID_DISL_WAGNUM: number[];
    WAGON_AMOUNT: number;
    IS_GONE: boolean;
}

interface StationData {
    ST_ID: number;
    LATITUDE: number;
    LONGITUDE: number;
}

const RussiaRailwayMap: React.FC<RussiaRailwayMapProps> = ({ data }) => {
    const { data: stationCoordData } = mapApi.useGetStationCoordQuery("");

    const trailSignIcon = new L.Icon({
        iconUrl:
            "https://c0.klipartz.com/pngpicture/450/381/gratis-png-estacion-de-tren-ferrocarril-transporte-iconos-de-la-computadora-pista-icono-de-la-tiroides.png",
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

            {/* ЖД тайлы openrailwaymap */}
            <TileLayer
                url="https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openrailwaymap.org/">OpenRailwayMap</a> contributors'
            />

            {stationCoordData &&
                stationCoordData.map((station: stationTrainData) => {
                    const date = new Date(station.OPERDATE);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    return (
                        <Marker
                            key={station.ST_ID_DISL}
                            position={[station.LATITUDE, station.LONGITUDE]}
                            icon={trailSignIcon}
                        >
                            {/* Можно добавить Popup, если необходимо */}
                            <Popup>
                                {
                                    <>
                                        <p>ID Станции: {station.ST_ID_DISL}</p>
                                        <p>
                                            Кол-во вагонов:{" "}
                                            {station.WAGON_AMOUNT}
                                        </p>
                                        <p>
                                            Время прибытия
                                            <span style={{ display: "block" }}>
                                                {`${hours}:${minutes} --- ${day}.${month}`}
                                            </span>
                                        </p>
                                        <p>
                                            {station.IS_GONE
                                                ? "Посещено"
                                                : "Не посещено"}
                                        </p>
                                    </>
                                }
                            </Popup>
                        </Marker>
                    );
                })}

            {data ? (
                data.map((train: TrainData) => (
                    <Polyline
                        key={train.train_index}
                        positions={train.station_data
                            .filter(
                                (station) =>
                                    station.LATITUDE !== null &&
                                    station.LONGITUDE !== null
                            )
                            .map((station) => [
                                station.LATITUDE,
                                station.LONGITUDE,
                            ])}
                        color="blue"
                    />
                ))
            ) : (
                <TileLayer
                    url="https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openrailwaymap.org/">OpenRailwayMap</a> contributors'
                />
            )}
        </MapContainer>
    );
};

export default RussiaRailwayMap;
