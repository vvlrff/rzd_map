import datetime
import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, delete, desc, insert, or_,  select,  func, update 
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
        stmt = select(disl_hackaton.id, disl_hackaton.TRAIN_INDEX).limit(50)
        res = await self.connect.execute(stmt)
        res = res.fetchall()
        list_train_index = []
        data = []
        for i in res:
            list_train_index.append(i[1])
        data.append({
                'TRAIN_INDEXS':list_train_index
        })

        # # print(data)
        return data



    
    