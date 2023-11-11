import datetime
import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, delete, desc, distinct, insert, or_,  select,  func, update 
from .models import *
from .schemas import * 

class Support:

    def __init__(self, coonection):
        self.connect: AsyncSession = coonection

    async def info_db(self):
       ...
    
    async def info_all_admin(self):
        ...

    async def all_peregons(self):
        stmt = select(PEREGON.START_CODE, PEREGON.END_CODE, PEREGON.LEN)
        res = await self.connect.execute(stmt)
        res = res.fetchall()
        data = []
        for i in res:
            data.append({
                'START_CODE':i[0],
                'END_CODE':i[1],
                'LEN':i[2],
            })
        return data
    
    async def trains_index(self):
        stmt = select(TrainData.train_index, TrainData.station_data).limit(50)
        res = await self.connect.execute(stmt)
        res = res.fetchall()
        sorted_res = sorted(res, key=lambda x: len(x[1]), reverse=True)

        list_train_index = []
        list_path_len = []
        first_station_list = []
        last_station_list = []
        data = []

        for index in range(len(sorted_res)):
            list_train_index.append(sorted_res[index][0])
            list_path_len.append(len(sorted_res[index][1]))
            first_station_list.append(sorted_res[index][1][0]['ST_ID_DISL'])
            last_station_list.append(sorted_res[index][1][-1]['ST_ID_DISL'])

        data.append({'TRAIN_INDEXS':list_train_index,
                     'PATH_LEN': list_path_len,
                     'FIRST_STATIONS': first_station_list,
                     'LAST_STATIONS': last_station_list
                     })
    
        return data





    
    