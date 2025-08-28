AutoRia clone
         Ця Postman-колекція документує API для керування оголошеннями з продажу автомобілів з урахуванням різних ролей користувачів (Buyer, Seller, Manager, Admin).
          Вона містить приклади запитів для реєстрації, авторизації, управління користувачами та оголошеннями про продаж автомобілів.

Змінні Колекції

1. Клонуй репозиторій:
              git clone  https://github.com/LavrekhaLucy/control_node.js
              cd control_node

2.  Завантаж LTS-версію Node.js, версія 22,
             Перейди на офіційний сайт:
              https://nodejs.org/en

3. Встанови production залежності:
              npm install @aws-sdk/client-s3 axios bcrypt cron dayjs dotenv express express-fileupload franc joi jsonwebtoken mongoose natural node-cron nodemailer nodemailer-express-handlebars swagger-ui-express
          
4. Встанови dev залежності:
              npm install -D @eslint/js @types/bcrypt @types/express @types/express-fileupload @types/joi @types/jsonwebtoken @types/node @types/nodemailer-express-handlebars @types/swagger-ui-express @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-simple-import-sort globals husky lint-staged nodemon prettier rimraf ts-node tsc-watch typescript-eslint
          
 5.  Створи .env файл на основі .env.example та заповни змінні середовища.

  Usage Example:
          Запуск у режимі розробки:
          npm run start:dev
          Запуск продакшн збірки:
          npm run start
          Запуск лінтингу:
          npm run lint
          Запуск seed скриптів (заповнення бази тестовими даними):
          npm run seed

Postman-колекція
         
Щоб швидко протестувати API, можна імпортувати Postman-колекцію:
    Файл:  [cars-api.postman_collection.json](postman/cars-api.postman_collection.json)
Як імпортувати в Postman:
    1.Відкрий Postman.
    2.Натисни Import (у верхньому меню).
    3.Обери файл cars-api.postman_collection.json з папки postman.
    4.Колекція з’явиться у списку, і ти зможеш запускати запити.
Змінні середовища у Postman:
- `{{API_HOST}}` — URL сервера, наприклад http://localhost:3000
- `{{buyerToken}}` — токен покупця
- `{{sellerToken}}` — токен продавця
- `{{managerToken}}` — токен менеджера
- `{{adminToken}}` — токен адміністратора
- `{{id}}` — ID користувача або авто для GET/PUT/DELETE
- `{{carId}}` — ID авто для верифікації


Використовуй запити з колекції. Після реєстрації або логіну Postman автоматично встановить токени у змінні середовища (через скрипти у вкладці Tests).

Для запуску тестів та локальної розробки:
          npm test
          
Для отримання додаткової інформації:
          https://github.com/LavrekhaLucy/control_node.js

