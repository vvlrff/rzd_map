
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import  select
from .models import *
from .schemas import * 

class Support:

    def __init__(self, coonection):
        self.connect: AsyncSession = coonection

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

        data = []

        for index in range(len(sorted_res)):

            data.append({'TRAIN_INDEXS':sorted_res[index][0],
                        'PATH_LEN': len(sorted_res[index][1]),
                        'FIRST_STATIONS': sorted_res[index][1][0]['ST_ID_DISL'],
                        'LAST_STATIONS': sorted_res[index][1][-1]['ST_ID_DISL']
                        })
    
        return data





    
    