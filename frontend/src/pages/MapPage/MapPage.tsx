import React from "react";
import RussiaRailwayMap from "../../components/Map/RussiaRailwayMap";
import s from "./MapPage.module.scss";
import { mapApi } from "../../services/mapApi";
import { Box } from "@mui/material";

const MapPage: React.FC = () => {
    const { data: trainIdexesData } = mapApi.useGetTrainIndexesQuery("");
    const [asdasd, { data, isLoading }] =
        mapApi.usePostTrainWagonDataMutation();

    return (
        <div className={s.container}>
            {isLoading ? (
                <>Идет загрузка</>
            ) : (
                <>
                    <Box>
                        <div className={s.sidebar}>
                            {trainIdexesData &&
                                trainIdexesData[0]["TRAIN_INDEXS"]?.map(
                                    (item: any, key: number) => {
                                        return (
                                            <div
                                                key={key}
                                                className={s.item}
                                                onClick={() => asdasd(item)}
                                            >
                                                Маршрут №{item}
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </Box>

                    <div className={s.map}>
                        <RussiaRailwayMap data={data} />
                    </div>
                </>
            )}
        </div>
    );
};

export default MapPage;
