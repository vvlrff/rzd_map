from pydantic import BaseModel
from typing import Any, Dict
from fastapi import UploadFile, File


class TrainIndexRequest(BaseModel):
    train_index: str

class TrainIndexRequestCurrentData(BaseModel):
    train_index: str
    current_data: str

class PutPost(BaseModel):
    id_post: int
    title: str
    info_vvst: Dict={
        'танки': 0, 
        'бмп': 0, 
        'грузовики': 0
    }
    Latitude: float | None
    Longitude: float | None 


class SuggestPost(BaseModel):
    title: str
    sorce: str
    Latitude: float | None
    Longitude: float | None
    info_vvst: dict
    photo: str | None

class DelPost(BaseModel):
    id: int
