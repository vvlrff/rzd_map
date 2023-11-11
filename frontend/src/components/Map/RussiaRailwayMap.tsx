import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { RussiaRailwayMapProps, TrainData, stationTrainData } from "../../models/MapInterfaces";
import blackStation from "../../assets/images/blackStation.png";
import greenStation from "../../assets/images/greenStation.png";
import "leaflet/dist/leaflet.css";


const RussiaRailwayMap: React.FC<RussiaRailwayMapProps> = ({ data }) => {

    console.log(data)
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
    const zoom = 4; // Начальный уровень масштабирования

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
                data.flat().map((train: TrainData) => {
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
                                            <img
                                                src="/train.webp"
                                                style={{
                                                    display: "block",
                                                    margin: "0 auto",
                                                    width: "300px",
                                                }}
                                                alt=""
                                            />
                                            <p>
                                                ID Станции:{" "}
                                                <span style={{ fontWeight: 600 }}>
                                                    {station.ST_ID_DISL}
                                                </span>
                                            </p>
                                            <p>
                                                Кол-во вагонов:{" "}
                                                <span style={{ fontWeight: 600 }} >
                                                    {station.WAGON_AMOUNT}
                                                </span>
                                                <span>
                                                    {" ("}
                                                    {station.ST_ID_DISL_WAGNUM.join(
                                                        ", "
                                                    )}
                                                    {")"}
                                                </span>
                                            </p>
                                            <p>
                                                Время прибытия:
                                                <span style={{ display: "block", fontWeight: 600 }} >
                                                    {`${day}.${month} - ${hours}:${minutes}`}
                                                </span>
                                            </p>
                                            {station.IS_GONE && (
                                                <p>
                                                    {station?.IS_GONE ? (
                                                        <span
                                                            style={{ color: "green", fontWeight: 600, }} >
                                                            Станция пройдена
                                                        </span>
                                                    ) : (
                                                        <span style={{ color: "red", fontWeight: 600, }} >
                                                            Станция не пройдена
                                                        </span>
                                                    )}
                                                </p>
                                            )}
                                        </>
                                    </Popup>
                                </Marker>
                            );
                        });

                    const trainPath = (
                        <>
                            {train.station_data &&
                                train.station_data.reduce(
                                    (
                                        paths: JSX.Element[],
                                        station: stationTrainData,
                                        index: number,
                                        arr: stationTrainData[]
                                    ) => {
                                        const currentCoords: LatLngExpression =
                                            [
                                                station?.LATITUDE || 0,
                                                station?.LONGITUDE || 0,
                                            ];

                                        if (
                                            currentCoords[0] === 0 &&
                                            currentCoords[1] === 0
                                        ) {
                                            return paths;
                                        }

                                        let nextStationIndex = index + 1;
                                        let nextStation = arr[nextStationIndex];

                                        while (
                                            nextStation &&
                                            (nextStation.LATITUDE === null ||
                                                nextStation.LONGITUDE ===
                                                null ||
                                                nextStation.LATITUDE === 0 ||
                                                nextStation.LONGITUDE === 0)
                                        ) {
                                            nextStationIndex++;
                                            nextStation = arr[nextStationIndex];
                                        }

                                        const nextCoords: LatLngExpression =
                                            nextStation
                                                ? [
                                                    nextStation.LATITUDE || 0,
                                                    nextStation.LONGITUDE ||
                                                    0,
                                                ]
                                                : currentCoords;

                                        const path = (
                                            <Polyline
                                                weight = {7}
                                                key={index}
                                                positions={[
                                                    currentCoords,
                                                    nextCoords,
                                                ]}
                                                color={
                                                    station?.IS_GONE
                                                        ? "green"
                                                        : "black"
                                                }
                                            />
                                        );

                                        return [...paths, path];
                                    },
                                    []
                                )}
                        </>
                    );

                    return [...trainMarkers, trainPath];
                })}
        </MapContainer>
    );
};

export default RussiaRailwayMap;
