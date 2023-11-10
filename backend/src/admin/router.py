from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from ..datebase import get_async_session
from fastapi import UploadFile, File
from .schemas import *
import os

from .support import Support

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
    # support = Support(session)
    # data = await support.info_db()
    # return JSONResponse(content=data)


@router.get('/PEREGON_HACKATON')
async def get_info_page(session: AsyncSession = Depends(get_async_session)):
    ...
    return JSONResponse([
        {'START_CODE': {0: 2, 1: 6, 2: 8, 3: 12, 4: 15, 5: 16, 6: 24, 7: 29, 8: 30, 9: 31, 10: 33, 11: 33, 12: 34, 13: 40, 14: 44, 15: 48, 16: 49, 17: 56, 18: 65, 19: 68}, 'END_CODE': {0: 805, 1: 2, 2: 6, 3: 8, 4: 12, 5: 15, 6: 16, 7: 24, 8: 29, 9: 24,
                                                                                                                                                                                         10: 1373, 11: 31, 12: 1350, 13: 34, 14: 40, 15: 44, 16: 44, 17: 53, 18: 56, 19: 10288}, 'LEN': {0: 32, 1: 27, 2: 27, 3: 29, 4: 19, 5: 10, 6: 33, 7: 28, 8: 0, 9: 6, 10: 21, 11: 12, 12: 32, 13: 48, 14: 46, 15: 39, 16: 3, 17: 5, 18: 26, 19: 0}}
    ])


@router.get('/disl_hackaton')
async def get_info_page(session: AsyncSession = Depends(get_async_session)):
    ...
    return JSONResponse(
        [
            {'WAGNUM': {0: 5266, 1: 5266, 2: 5266, 3: 5266, 4: 5266, 5: 5266, 6: 5266, 7: 5266, 8: 5266, 9: 5266, 10: 5266, 11: 5266, 12: 5266, 13: 5266, 14: 5266, 15: 5266, 16: 5266, 17: 5266, 18: 5266, 19: 5266}, 'OPERDATE': {0:
                                                                                                                                                                                                                                    '2023-08-30 01:02:00', 1: '2023-08-30 05:26:00', 2: '2023-08-30 05:05:00', 3: '2023-08-28 23:45:00', 4: '2023-08-28 22:29:00', 5: '2023-08-28 23:06:00',
                                                                                                                                                                                                                                    6: '2023-08-27 16:02:00', 7: '2023-08-27 13:15:00', 8: '2023-08-27 07:27:00', 9: '2023-08-26 15:25:01', 10: '2023-08-26 15:25:00', 11: '2023-08-26 14:54:00', 12: '2023-08-26 10:05:00', 13: '2023-08-26 12:53:00', 14: '2023-08-26 11:31:00', 15: '2023-08-26 10:26:00', 16: '2023-08-26 02:37:00', 17: '2023-08-26 01:16:00', 18: '2023-08-26 00:33:00', 19: '2023-08-26 18:29:00'}, 'ST_ID_DISL': {0: 7475, 1: 63, 2: 7475, 3: 7475, 4: 7469, 5: 7475, 6: 20714, 7: 5598, 8: 5631, 9: 6169, 10: 6169, 11: 6169, 12:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          6628, 13: 6598, 14: 6614, 15: 6625, 16: 6663, 17: 7045, 18: 7052, 19: 6169}, 'ST_ID_DEST': {0: 61, 1: 61, 2: 61, 3: 61, 4: 61, 5: 61, 6: 61, 7: 61, 8: 61, 9: 61, 10: 61, 11: 61, 12: 61, 13: 61, 14: 61, 15: 61, 16: 61, 17: 61, 18: 61, 19: 61}, 'TRAIN_INDEX': {0: '7475-335-62', 1: '7475-335-62', 2: '7475-335-62', 3: '6999-471-7475', 4: '6999-471-7475', 5: '6999-471-7475', 6: '20792-360-6999', 7: '20792-360-6999', 8: '20792-360-6999', 9: '20792-360-6999', 10: '20792-360-6999', 11: '20792-360-6999', 12: '20792-360-6999', 13: '20792-360-6999', 14: '20792-360-6999', 15: '20792-360-6999', 16: '20792-360-6999', 17: '20792-360-6999', 18: '20792-360-6999', 19: '20792-360-6999'}
             }]
    )
