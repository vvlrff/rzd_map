from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from ..datebase import get_async_session
from fastapi import UploadFile, File
from .schemas import *
import os

from .support import Support
from .support2 import Support2

router = APIRouter(
    prefix='/admin',
    tags=['admin']
)


def transform_data(input_data):
    result = []
    
    for item in input_data:
        st_ids = item["ST_ID"]
        latitudes = item["LATITUDE"]
        longitudes = item["LONGITUDE"]
        
        transformed_data = []
        
        for key in st_ids:
            transformed_item = {
                "ST_ID": st_ids[key],
                "LATITUDE": float(latitudes[key]),
                "LONGITUDE": float(longitudes[key])
            }
            transformed_data.append(transformed_item)
        
        result.extend(transformed_data)
    
    return result


@router.get('/stantioncoord')
async def get_info_db(session: AsyncSession = Depends(get_async_session)):
    input_data =[
        {'ST_ID': {0: 2, 1: 3, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8, 7: 9, 8: 10, 9: 11, 10: 12, 11: 13, 12: 14, 13: 15, 14: 16, 15: 17, 16: 18, 17: 19, 18: 20, 19: 21}, 'LATITUDE': {0: 48.4272, 1: 48.491, 2: 48.3981, 3: 48.3857, 4: 48.5423, 5: 48.6064, 6: 48.6062, 7: 48.5454, 8: 48.5232, 9: 48.6, 10: 48.4829, 11: 48.4678, 12: 48.4595, 13: 48.44, 14: 48.4937, 15: 48.5982, 16: 48.6338, 17: 48.6595, 18: 48.6163, 19: 48.6099}, 'LONGITUDE': {0: 42.2162,
                                                                                                                                                                                                                                                                                                                                                                                                                                                  1: 42.361, 2: 42.0699, 3: 41.9546, 4: 42.5028, 5: 42.6612, 6: 42.8445, 7: 42.9857, 8: 43.035, 9: 42.8937, 10: 43.1614, 11: 43.2739, 12: 43.3276, 13: 43.3798, 14: 43.4977, 15: 43.6106, 16: 43.7189, 17: 43.7828, 18: 43.6524, 19: 43.6325}}
    ]

    output_data = transform_data(input_data)

    return JSONResponse(content=output_data)



@router.get('/PEREGON_HACKATON')

async def all_peregons(session: AsyncSession = Depends(get_async_session)):
    support = Support(coonection=session)
    data = await support.all_peregons()
    return JSONResponse(data)



@router.get('/trains_index')
async def trains_index(session: AsyncSession = Depends(get_async_session)):
    support = Support(coonection=session)
    data = await support.trains_index()
    return JSONResponse(data)


@router.post('/Support_2')
async def all_peregons(request_data: TrainIndexRequest, session: AsyncSession = Depends(get_async_session)):
    support = Support2(coonection=session)
    data = await support.all_peregons(train_index=request_data.train_index)
    return JSONResponse(data)


@router.post('/one_train_with_time')
async def one_train_with_time(request_data: TrainIndexRequestCurrentData, session: AsyncSession = Depends(get_async_session)):
    support = Support2(coonection=session)
    data = await support.one_train_with_time(train_index=request_data.train_index, current_time=request_data.current_data)
    return JSONResponse(data)

