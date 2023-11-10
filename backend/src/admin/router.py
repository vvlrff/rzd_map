from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from ..datebase import get_async_session
from fastapi import UploadFile, File
from .schemas import * 
import os

from .support import Support

router = APIRouter (
    prefix='/admin',
    tags= ['admin']
)


@router.get('/info-db')
async def get_info_db(session: AsyncSession = Depends(get_async_session)):
    ...
    # support = Support(session)
    # data = await support.info_db()
    # return JSONResponse(content=data)



@router.get('info_page')
async def get_info_page(session: AsyncSession = Depends(get_async_session)):
    ...