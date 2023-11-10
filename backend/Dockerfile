FROM python:3.11

WORKDIR /backend

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN chmod a+x docker/*.sh
# sh", "-c", "alembic revision --autogenerate && alembic upgrade head && 
CMD ["uvicorn src.main:app --host 0.0.0.0 --port 8000"]