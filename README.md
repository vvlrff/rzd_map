# ЖД карта желаний - cоздание карты движения поездов   
## Сервис для визуализации движения поезда в режиме реального времени   

Сервис предназначен для отображения на карте маршрутов следования поездов. Поезд включает в себя информацию куда он движется, по какому маршруту поедет и из каких вагонов он состоит.   
Диспетчеру будет удобно пользоваться нашим сервисом!    
   
![image](https://github.com/vvlrff/rzd_map/assets/125179070/f6a25a94-7663-492e-bb4c-56d7cf165bf3)    

# Инструкция по запуску
1) Скачиваем репозиторий проекта 
1) Собираем проект в докере : docker compose --profile deploy up
2) Переходим по адресу http://localhost:8000/docs
3) Нажимаем  на  GET admin/add_data_train_data (заполняем базу данных)
4) Переходим по адресу http://localhost:3000

# Цели, задачи и особенности
## Цель:
Создать WEB-сервис для мониторинга движения поезда в режиме реального времени

## Задачи:
1) Получение данных о перемещении вагонов;
2) Хранение данных, их валидация и поиск зависимостей;
3) Привидение данных к подходящему для отображения виду;
4) Создание сервиса и инновационных способов  визуализации данных.
![image](https://github.com/vvlrff/rzd_map/assets/125179070/27c35791-5f2b-4275-ad85-56a912a07a7a)

   
# Используемые технологии
1) FAST-API;
2) React.ts;
3) Leaflet;
4) PostgreSQL.
![image](https://github.com/vvlrff/rzd_map/assets/125179070/93889323-cca5-4bdd-8de3-f508866d8c30)


# Описание решения
## Создание современного WEB-интерфейса:
1) Клиентская часть на React с управлением состояния приложения redux/toolkit;
2) Применение TypeScript для типизации данных;
3) Асинхронные запросы RTK Query;
4) Масштабируемая архитектура клиентского приложения;
5) Более эффективный способ создания стилей при помощи Sass.
![image](https://github.com/vvlrff/rzd_map/assets/125179070/0e9615ff-438f-47cf-8e56-a2f783221368)    
![image](https://github.com/vvlrff/rzd_map/assets/125179070/2108dc74-b457-4d20-9fc2-0c5605f88a98)

## Особенности решения:
1) Возможность поиска по названию и по дате;
2) Расширенная информация о поездах;
3) Расширенная информация о станциях;
4) Высокая скорость работы;
5) Идентификация и удаление выбросов;
6) State-of-art technology;
7) Open-source libraires.

  
## Ссылка на Google диск (презентация и демонстрация):    
[https://drive.google.com/drive/folders/1TJqko7mr5ff_qnEXyAI8P-yqEbtJ5W75?usp=sharing   ](https://drive.google.com/drive/folders/1Jzueh7TgzRCgzhxhMZzPLiXvd-Lfjak6?usp=sharing) 
   


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[FastApi.py]: https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png
[FastApi-url]: https://fastapi.tiangolo.com/
