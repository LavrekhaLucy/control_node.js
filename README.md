AutoRia clone
Ця Postman-колекція документує API для керування оголошеннями з продажу автомобілями з урахуванням різних ролей користувачів (Buyer, Seller, Manager, Admin).
 Вона містить приклади запитів для реєстрації, авторизації, управління користувачами та оголошеннями про продаж автомобілів.

Змінні Колекції
1. Клонуй репозиторій:
```bash
    git clone  https://github.com/LavrekhaLucy/control_node.js
    cd control_node
   2. Встанови production залежності:
   bash
    npm install @aws-sdk/client-s3 axios bcrypt cron dayjs dotenv express express-fileupload franc joi jsonwebtoken mongoose natural node-cron nodemailer nodemailer-express-handlebars swagger-ui-express

   3. Встанови dev залежності:
    bash
    npm install -D @eslint/js @types/bcrypt @types/express @types/express-fileupload @types/joi @types/jsonwebtoken @types/node @types/nodemailer-express-handlebars @types/swagger-ui-express @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-simple-import-sort globals husky lint-staged nodemon prettier rimraf ts-node tsc-watch typescript-eslint

4.  Створи .env файл на основі .env.example та заповни змінні середовища.
Usage Example:
Запуск у режимі розробки:
npm run start:dev
Запуск продакшн збірки:
npm run start
Запуск лінтингу:
npm run lint
Запуск seed скриптів (заповнення бази тестовими даними):
npm run seed

Postman Collection
Щоб швидко тестувати API, можна імпортувати Postman Collection:
1.	Скачай або скопіюй колекцію JSON за посиланням:
https://crimson-moon-678971.postman.co/workspace/247bee29-bc92-4052-be1f-894e1dcfb977/documentation/44420116-40499745-f512-4581-b0a1-e5289b5cdd90

2.	Відкрий Postman → Import → вибери файл JSON.
3.	Створи змінні середовища (Environment) у Postman:
o	{{API_HOST}} — URL сервера, наприклад http://localhost:3000
o	{{buyerToken}} — токен покупця
o	{{sellerToken}} — токен продавця
o	{{managerToken}} — токен менеджера
o	{{adminToken}} — токен адміністратора
o	{{id}} — ID авто для GET/PUT/DELETE
o	{{carId}} — ID авто для верифікації

або скачай їх за цим посиланням:
 https://crimson-moon-678971.postman.co/workspace/247bee29-bc92-4052-be1f-894e1dcfb977/environment/44420116-fd297b42-4a73-49cf-af3a-148d518190f0?action=share&source=copy-link&creator=44420116

4.	Використовуй запити з колекції. Після реєстрації або логіну Postman автоматично встановить токени у змінні середовища (через скрипти у вкладці Tests).

Для запуску тестів та локальної розробки:
make install
npm test

Для отримання додаткової інформації:
https://github.com/LavrekhaLucy/control_node.js

