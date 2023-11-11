import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import blackStation from "../../assets/images/blackStation.png";
import greenStation from "../../assets/images/greenStation.png";

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
    IS_GONE?: boolean;
}

const RussiaRailwayMap: React.FC<RussiaRailwayMapProps> = ({ data }) => {
    const greenStationIcon = new L.Icon({
        iconUrl: greenStation, // Replace with your green icon path
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });

    const greyStationIcon = new L.Icon({
        iconUrl: blackStation, // Replace with your grey icon path
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });

    const mapStyle = {
        height: "calc(93vh)",
        display: "flex",
        alignItems: "stretch",
    };

    const center = [53.7558, 53.6176]; // Координаты центра России
    const zoom = 4.5; // Начальный уровень масштабирования

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

            {data &&
                data.map((train: TrainData) => {
                    const trainMarkers = train.station_data
                        .filter(
                            (station) =>
                                station.LATITUDE !== null &&
                                station.LONGITUDE !== null
                        )
                        .map((station) => {
                            const date = new Date(station.OPERDATE * 1000);
                            const hours = ("0" + date.getHours()).slice(-2);
                            const minutes = ("0" + date.getMinutes()).slice(-2);
                            const day = ("0" + date.getDate()).slice(-2);
                            const month = ("0" + (date.getMonth() + 1)).slice(
                                -2
                            );

                            const isGone =
                                station.IS_GONE !== undefined
                                    ? station.IS_GONE
                                    : false;
                            const stationIcon = isGone
                                ? greenStationIcon
                                : greyStationIcon;

                            return (
                                <Marker
                                    key={station.ST_ID_DISL}
                                    position={[
                                        station.LATITUDE,
                                        station.LONGITUDE,
                                    ]}
                                    icon={stationIcon}
                                >
                                    <Popup>
                                        <>
                                            <p>
                                                ID Станции:
                                                <span
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {station.ST_ID_DISL}
                                                </span>
                                            </p>
                                            <p>
                                                Кол-во вагонов:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {station.WAGON_AMOUNT}
                                                </span>
                                            </p>
                                            <p>
                                                Время прибытия
                                                <span
                                                    style={{
                                                        display: "block",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {`${day}.${month} - ${hours}:${minutes}`}
                                                </span>
                                            </p>
                                            <p>
                                                {station?.IS_GONE ? (
                                                    <span
                                                        style={{
                                                            color: "green",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Станция пройдена
                                                    </span>
                                                ) : (
                                                    <span
                                                        style={{
                                                            color: "red",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        Станция не пройдена
                                                    </span>
                                                )}
                                            </p>
                                        </>
                                    </Popup>
                                </Marker>
                            );
                        });

                    const trainPath = (
                        <>
                            {train.station_data &&
                                train.station_data.map((station, index) => (
                                    <Polyline
                                        key={index}
                                        positions={[
                                            [
                                                station?.LATITUDE || 0,
                                                station?.LONGITUDE || 0,
                                            ],
                                            [
                                                train.station_data[index + 1]
                                                    ?.LATITUDE || 0,
                                                train.station_data[index + 1]
                                                    ?.LONGITUDE || 0,
                                            ],
                                        ]}
                                        color={
                                            station?.IS_GONE ? "green" : "black"
                                        }
                                    />
                                ))}
                        </>
                    );

                    return [...trainMarkers, trainPath];
                })}
        </MapContainer>
    );
};

export default RussiaRailwayMap;
