# Laravel Sail

**Make sure you have docker instaled**

Note: when using git clone be mindfull of the branch
**Make sure you have docker installed and opened**

```
gh repo clone incolorate/Internship-Neobyte
cd Laravel
composer install
./vendor/bin/sail up
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

Rename .env.example to .env and add the necessary keys

Update the database to match the latest version defined in the migrations.

```
./vendor/bin/sail artisan migrate
```
