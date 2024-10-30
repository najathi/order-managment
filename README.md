# order-managment

### How to setup and run the server

```
composer install
cp .env.example .env.local
php artisan migrate
php artisan db:seed
php artisan serve
```

#### user auth credentials:

`email: najathi@example.com`
`password: abcd1234`

### How to run the web

`npm i`

`cp .env.example .env`

`npm run dev`

#### See the Auth Routes
```
http://localhost:3000/api/auth/providers
http://localhost:3000/api/auth/signin
```

#### create secrete using below the command

`openssl rand -base64 32`
