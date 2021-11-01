# Тестовое задание i7

## Краткое описание функций

1. На главной странице открвается форма регистрации нового домена.
2. По умолчанию, домен регистрируется с указанием данных нового клиента.
3. Из выпадающего списка можно выбрать данные ранее зарегистрированного клиента.
4. Из выпадающего списка доменов можно выбрать ранее зарегистрированный домен, в этом случае можно изнить DNS-запись домена

## Краткое описание работы

1. При нажатии кнопки регистрации домена:
    1) происходит валидация полей формы
    2) IDN-имя домена конвертируется в ACE-имя
    3) если выбрана регистрация нового клиента - отправляется api-запрос с данными для регистрации клиента на локальный сервер
    4) локальный сервер выполняет авторизацию на сервере регистратора и отправляет запрос на регистрацию клиента, возвращая идентификатор операции
    5) аналогично производится проверка статуса операции (браузер -> локальный сервер -> сервер регистратора)
    6) если клиента зарегистрирован или произошла ошибка - выводится запись в журнал операций

2. ТАким же образом происходит изменение DNS-записей домена

## Структура файлов

    core                                            файлы логики приложения
        \api                                        логика api-вызовов (api-интерфейс)
            \api.php                                общий api-котроллер
            \client-create.api.php                  контроллер регистрации нового клиента
            \domain-create.api.php                  контроллер регистрации нового домена
            \domain-update.api.php                  контроллер обновления данных домена
            \get-domains.api.php                    контроллер для получения списка ранее зарегистрованных доменов
            \get-users.api.php                      контроллер для получения списка ранее зарегистрованных клиентов            
            \task-status.api.php                    контроллер для получения статуса операции
        \pub                                        логика публичных страниц
            \main.php                               логика главной страницы
        \registrator                                логика взаимодейтсвия с сервером регистратора
            \clients.php                            контроллер api-запросов к серверу регистратора для регистрации клиента
            \domains.php                            контроллер api-запросов к серверу регистратора для регистрации домена
            \registrator.php                        общий контроллер для выполнения api-запросов к серверу регистратора
            \tasks.php                              контроллер api-запросов к серверу регистратора для получения статуса операции
        \core.php                                   вспомогательные функции: загрузка конфигурации и обработка ошибок
    data                                            хранилище базы данных
        \domains.json                               локальная копия данных о зарегистрированных доменах
        \users.json                                 локальная копия данных о зарегистрированных клиентах
    db                                              функции для работы с БД
        \db.php                                     функции для работы с БД
    gui                                             публичный графический интерфейс
        \img                                        картинки
        \pub                                        контент публичных страниц
            \main.gui.php                           контент главной страницы
        \scripts                                    транслированные JS-скрипты (см. описание в папке \src)
            \api.js
            \client.js
            \domain.js
            \interface.js
            \main.js
            \types.js
        \styles                                     CSS стили
        \gui.php                                    общие функции для построения интерфейса
        \page.gui.php                               структура HTML-страницы
    logs                                            журналы ошибок
    src                                             исходные TS-скритпы
        \api.ts                                     api-вызовы локального сервера
        \client.ts                                  валидация клиентской формы, управление списком и регистрацией клиентов
        \domain.ts                                  валидация формы регистрации домена, управление списком и регистрацией доменов
        \interface.ts                               интерактивный интерфейс
        \main.ts                                    контроллер нажатия кнопок регистрации и обновления
        \tsconfig.json                              настройки транслятора
        \types.ts                                   описание типов данных
    .gitignore                                      файл исключений
    config.example.php                              пример файла конгурации    
    i7.nginx.conf                                   конфигурация веб-сервера nginx
    index.php                                       общий контроллер (точка входа в приложение)
    readme.md                                       этот файл с описанием