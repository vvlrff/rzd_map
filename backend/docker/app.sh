#!/bin/bash

sleep 3

alembic upgrade head

uvicorn src.main:app --host 0.0.0.0 --port 8000