import datetime, time
import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, delete, desc, insert, or_,  select,  func, update 
from .models import *
from .schemas import * 

class Support2:

    def __init__(self, coonection):
        self.connect: AsyncSession = coonection

    async def info_db(self):
       ...
    
    async def info_all_admin(self):
        ...

    async def all_peregons(self, train_index = '8810-413-8811'):

        total_data = [{'train_index': train_index, 'station_data': []}]

        stmt = select(disl_hackaton.ST_ID_DISL).where(disl_hackaton.TRAIN_INDEX == train_index)
        result = await self.connect.execute(stmt)
        result = result.fetchall()
        result = sorted(set(result), key=lambda x: result.index(x))

        for station_index in range(len(result)):
            stmt2 = select(disl_hackaton.id,
                           disl_hackaton.WAGNUM,
                           disl_hackaton.OPERDATE,
                           disl_hackaton.ST_ID_DISL,
                           disl_hackaton.ST_ID_DEST,
                           disl_hackaton.TRAIN_INDEX).where(and_
                                                            (disl_hackaton.TRAIN_INDEX == train_index,
                                                            disl_hackaton.ST_ID_DISL == result[station_index][0]
                                                            )
                                                            )

            result2 = await self.connect.execute(stmt2)
            result2 = result2.fetchall()

            stmt_coord = select(StantionCoord.LATITUDE, StantionCoord.LONGITUDE).where(StantionCoord.ST_ID == result2[0][3])
            result_coord = await self.connect.execute(stmt_coord)
            result_coord = result_coord.fetchone()

            total_data[0]['station_data'].append({'ST_ID_DISL': result[station_index][0],
                                                  'LATITUDE': result_coord[0] if result_coord else None,
                                                  'LONGITUDE': result_coord[1] if result_coord else None,
                                                  'OPERDATE': result2[0][2],
                                                  'ST_ID_DISL_WAGNUM': []})

            for element in result2:
                if element[1] not in total_data[0]['station_data'][station_index]['ST_ID_DISL_WAGNUM']:
                    total_data[0]['station_data'][station_index]['ST_ID_DISL_WAGNUM'].append(element[1])

            total_data[0]['station_data'][station_index]['WAGON_AMOUNT'] = len(total_data[0]['station_data'][station_index]['ST_ID_DISL_WAGNUM'])

        return total_data
    
    async def one_train_without_time(self, train_index = '8810-413-8811'):
        stmt_one_train = select(TrainData.station_data).where(TrainData.train_index == train_index)
        stmt_one_train = await self.connect.execute(stmt_one_train)
        one_train_data = stmt_one_train.fetchone()
        one_train_data = one_train_data[0]
        one_train_data = sorted(one_train_data, key=lambda x: x['OPERDATE'])
        total_data_one_train = [{'train_index': train_index, 'station_data': one_train_data}]

        return total_data_one_train

    
    async def one_train_with_time(self, train_index = '8810-413-8811', current_time = '2023-06-06 05:30:00'):
        current_time_timestamp = int(time.mktime(datetime.strptime(current_time, "%Y-%m-%d %H:%M:%S").timetuple()))

        stmt_one_train = select(TrainData.station_data).where(TrainData.train_index == train_index)
        stmt_one_train = await self.connect.execute(stmt_one_train)
        one_train_data = stmt_one_train.fetchone()

        for current_station in one_train_data[0]:
            if current_station['OPERDATE'] <= current_time_timestamp:
                current_station['IS_GONE'] = True
            else:
                current_station['IS_GONE'] = False

        total_data_one_train = [{'train_index': train_index, 'station_data': one_train_data[0]}]

        return total_data_one_train
        



    
    