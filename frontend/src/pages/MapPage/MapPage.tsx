import React, { useEffect, useState } from "react";
import RussiaRailwayMap from "../../components/Map/RussiaRailwayMap";
import { mapApi } from "../../services/mapApi";
import { Box } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import s from "./MapPage.module.scss";

interface TrainIndexData {
    TRAIN_INDEXS: string;
    PATH_LEN: number;
    FIRST_STATIONS: number;
    LAST_STATIONS: number;
}

const MapPage: React.FC = () => {
    const { data: trainIdexesData } = mapApi.useGetTrainIndexesQuery("");
    const [clickItem, setClickItem] = useState<string[]>([]);
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [filterValue, setFilterValue] = useState("");
    const [filterTrainIdexesData, setFilterTrainIdexesData] = useState<
        TrainIndexData[]
    >([]);

    const [
        listSupport2,
        { data: datalistSupport2, isLoading: isLoadingListSupport2 },
    ] = mapApi.usePostListSupport2Mutation();
    const [
        listTrainWagon,
        { data: datalistTrainWagon, isLoading: isLoadingListTrainWagon },
    ] = mapApi.usePostListTrainWagonDataMutation();

    const filterCards = (value: string, data: TrainIndexData[] | undefined) => {
        return data
            ? data.filter(
                  (item) =>
                      item.TRAIN_INDEXS && item.TRAIN_INDEXS.includes(value)
              )
            : [];
    };

    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredCards = filterCards(filterValue, trainIdexesData);
            setFilterTrainIdexesData(filteredCards);
        }, 300);

        return () => clearTimeout(Debounce);
    }, [trainIdexesData, filterValue]);

    useEffect(() => {
        const fetchDataIfNeeded = async () => {
            if (clickItem && selectedDateTime) {
                const trainData = {
                    train_index: clickItem,
                    current_data: dayjs(selectedDateTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                    ),
                };
                await listTrainWagon(trainData);
            } else if (clickItem) {
                const trainData = {
                    train_index: clickItem,
                };
                await listSupport2(trainData);
            }
        };

        fetchDataIfNeeded();
    }, [clickItem, selectedDateTime, listTrainWagon, listSupport2]);

    const containerV = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.3,
            },
        },
    };

    const itemV = {
        hidden: { x: "-120", opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
        },
    };

    return (
        <div className={s.container}>
            {isLoadingListSupport2 || isLoadingListTrainWagon ? (
                <>
                    <Loader></Loader>
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            overflowY: "scroll",
                            overflowX: "hidden",
                        }}
                    >
                        <div className={s.sidebar}>
                            <motion.div
                                className={s.itemContainer}
                                variants={containerV}
                                initial="hidden"
                                animate="visible"
                            >
                                <Box
                                    display={"flex"}
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={1}
                                >
                                    <input
                                        type="text"
                                        className={s.inputFilter}
                                        placeholder="Номер поезда"
                                        value={filterValue}
                                        onChange={(e) =>
                                            setFilterValue(e.target.value)
                                        }
                                    />
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DateTimePicker
                                            sx={{
                                                "& button": {
                                                    color: "#121212",
                                                },
                                            }}
                                            label="Выберите дату"
                                            className={s.datetime}
                                            selectedSections={undefined}
                                            onSelectedSectionsChange={undefined}
                                            value={selectedDateTime}
                                            onChange={(newDateTime) =>
                                                setSelectedDateTime(newDateTime)
                                            }
                                        />
                                    </LocalizationProvider>
                                </Box>

                                {filterTrainIdexesData &&
                                    filterTrainIdexesData?.map(
                                        (item: any, key: number) => {
                                            const isItemSelected =
                                                clickItem.includes(
                                                    item["TRAIN_INDEXS"]
                                                );

                                            return (
                                                <Box
                                                    component={motion.div}
                                                    className={s.item}
                                                    sx={
                                                        isItemSelected
                                                            ? {
                                                                  backgroundColor:
                                                                      "#eb5525 !important",
                                                                  color: "#fff !important",

                                                                  "&:hover": {
                                                                      boxShadow:
                                                                          "0 0 4px 4px #7036bd !important",
                                                                  },

                                                                  "&:active": {
                                                                      backgroundColor:
                                                                          "black !important",
                                                                  },

                                                                  "& .svg": {
                                                                      path: {
                                                                          fill: "#fff !important",
                                                                      },
                                                                  },
                                                              }
                                                            : {}
                                                    }
                                                    onClick={() => {
                                                        setClickItem(
                                                            (prevClickItem) => {
                                                                if (
                                                                    isItemSelected
                                                                ) {
                                                                    // Если элемент уже выбран, уберите его из массива
                                                                    return prevClickItem.filter(
                                                                        (
                                                                            selectedItem
                                                                        ) =>
                                                                            selectedItem !==
                                                                            item[
                                                                                "TRAIN_INDEXS"
                                                                            ]
                                                                    );
                                                                } else {
                                                                    // В противном случае добавьте его в массив
                                                                    return [
                                                                        ...prevClickItem,
                                                                        item[
                                                                            "TRAIN_INDEXS"
                                                                        ],
                                                                    ];
                                                                }
                                                            }
                                                        );
                                                    }}
                                                    key={key}
                                                    variants={itemV}
                                                >
                                                    <div className={s.content}>
                                                        <p className={s.title}>
                                                            Номер поезда: №
                                                            <span>
                                                                {
                                                                    item.TRAIN_INDEXS
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className={s.title}>
                                                            Станций в маршруте:{" "}
                                                            <span>
                                                                {item.PATH_LEN}
                                                            </span>
                                                        </p>
                                                        <p className={s.title}>
                                                            Начальная станция:{" "}
                                                            <span>
                                                                {
                                                                    item.FIRST_STATIONS
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className={s.title}>
                                                            Конечная станция:{" "}
                                                            <span>
                                                                {
                                                                    item.LAST_STATIONS
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className={s.svg}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            version="1.1"
                                                            x="0px"
                                                            y="0px"
                                                            viewBox="0 0 100 125"
                                                            enable-background="new 0 0 100 100"
                                                        >
                                                            <path d="M15.619,12.907c-1.144-0.969-1.006-1.693,0.412-2.172c4.292-0.01,8.585-0.012,12.877-0.011  c2.035,0,19.455-0.772,18.575,1.513c-0.63,1.635-5.177,0.709-6.414,0.797c-3.76,0.798-6.868,3.865-7.843,7.563  c4.076,0.075,9.188-0.853,13.047,0.764c5.673,2.378,7.081,9.926,10.022,14.72c5.394,8.788,13.215,16.066,22.364,20.82  c4.873,2.531,10.107,4.35,15.497,5.4c7.412,1.447,5.667,2.535,5.656,10.227c-0.009,6.264-0.206,6.045-6.496,6.045  c-7.532,0-15.063,0-22.596,0.002c-13.558,0-27.115,0-40.672,0c-9.098,0-25.642,3.52-28.821-8.5  c-2.354-8.902-1.126-24.271,1.995-32.919c1.577-3.96,3.425-13.423,7.074-15.865c3.959-2.648,14.206-0.665,18.854-0.675  C27.363,13.371,21.494,13.619,15.619,12.907C14.362,12.597,17.488,13.133,15.619,12.907z M31.135,19.445  c1.845-2.078,2.326-4.56,4.705-6.45c-3.065-0.05-6.131-0.05-9.197,0C27.188,13.598,30.21,16.649,31.135,19.445z M11.574,25.24  C8.79,26.056,7.083,33.84,6.102,36.199c-1.916,4.775,2.644,4.287,6.007,4.29c11.164,0.008,22.327-0.008,33.491,0.005  c6.543,0.022-0.77-15.425-3.801-15.337C32.54,25.149,20.562,23.1,11.574,25.24C10.843,25.454,12.176,25.097,11.574,25.24z   M61.771,62.174c0.014-4.234-0.003-8.471,0.007-12.707c0.258-1.374-5.929-6.573-6.916-7.676  C55.008,47.526,52.68,60.109,61.771,62.174z M71.306,66.199c0.028-8.131,0.563-9.598-6.152-14.381  C65.094,55.572,62.973,63.891,71.306,66.199z M9.207,55.801c-4.396,1.119-3.208,8.111,1.347,7.559  C15.917,63.146,14.518,54.205,9.207,55.801C7.335,56.277,11.167,55.211,9.207,55.801z M39.727,55.801  c-4.709,1.174-2.91,8.615,1.815,7.498C46.492,62.41,44.725,54.307,39.727,55.801C37.757,56.291,41.696,55.211,39.727,55.801z   M79.678,68.789c0.085-7.221,0.777-7.938-5.425-11.154C74.253,60.846,72.619,67.096,79.678,68.789z M86.918,70.32  c-0.068-6.062,1.074-7.137-4.603-9.125C82.301,63.945,80.701,69.611,86.918,70.32z M93.032,71.213  c-0.021-4.889,1.889-7.154-3.928-7.891C89.123,65.766,87.066,70.791,93.032,71.213z M98.014,71.639  c-0.023-3.586,1.959-7.621-3.201-7.104C94.861,66.811,92.878,71.65,98.014,71.639z" />
                                                            <path d="M8.415,82.195c3.737,0.006,7.474,0.01,11.21,0c0.712,5.783,2.349,3.803,8.157,3.818c5.587,0.016,8.772,2.355,9.24-3.812  c4.48,0,8.96,0,13.44,0c8.959,0,17.92,0,26.88,0c4.479,0,8.96-0.002,13.439-0.002c5.121,0,9.055-2.467,8.995,3.754  c-20.64-0.074-40.313,5.732-60.593,5.729c-9.963-0.002-19.926,0.006-29.889,0c-4.087-0.002-8.546,2.189-8.557-2.84  C0.723,81.471,7.845,90.809,8.415,82.195C12.152,82.201,8.332,83.457,8.415,82.195z" />
                                                        </svg>
                                                    </div>
                                                </Box>
                                            );
                                        }
                                    )}
                            </motion.div>
                        </div>
                    </Box>

                    <div className={s.map}>
                        <RussiaRailwayMap
                            data={datalistTrainWagon || datalistSupport2}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default MapPage;
