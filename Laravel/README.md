# Laravel Sail

**Make sure you have docker instaled**

Note: when using git clone be mindfull of the branch

```
gh repo clone incolorate/Internship-Neobyte
cd Laravel
npm install
composer install
```

Rename .env.example to .env and add the necessary keys

If you deplay on local machine:

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=example_app
DB_USERNAME=sail
DB_PASSWORD=password
```

Run using docker

```
./vendor/bin/sail up
```

Update the database to match the latest version defined in the migrations.

```
./vendor/bin/sail artisan migrate
```

To access go to:

```
http://localhost
```
