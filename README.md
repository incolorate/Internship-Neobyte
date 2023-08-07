# Day 14-16

### Requirements:

- Build a front end that uses the harvested data from olx (day13)
- Rewrite the frontend in vuejs

Solved in: [**LaravelReact**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/LaravelReact)

Solved in: [**LaravelVue**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/LaravelVue)

# Day 13. Create olx.ro Harvester

Example link: https://www.olx.ro/auto-masini-moto-ambarcatiuni/autoturisme/q-AUTO/?currency=EUR

### Requirements:

- Extract title and send to “Olx prototype” project
- Extract description and send to “Olx prototype” project

**Important:**
To extract description the ad link must be visited.

Solved in: [**Scrapping**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/Scrapping)

# Day12 Generate island 5x5 or n x n

Rules:

- The height difference can be equal, +- 1 ( horizontal + vertical )
- Always generate new island
- The island must contain all levels between 0-5 .

Example:
![example island](https://github.com/incolorate/Internship-Neobyte/assets/88613908/c36c768c-bf94-450a-ad18-69220efe0c10)

Solved in: [**NextT3**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/NextT3)

# Day11 Laravel Sail Crud 2

### Requests:

Refactor the code from day 10
Solved in: [**Laravel**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/Laravel)

# Day10 Laravel Sail Crud

### Requests:

Install Docker Desktop ( might activate WSL)
Sail Documentation:

- https://laravel.com/docs/10.x/sail
- Laravel Installation Documentation ( chapter with Docker and Sail )
- https://laravel.com/docs/10.x/installation#getting-started-on-linux

To implement CRUD (Products: ID, title, price):

- https://laravel.com/docs/10.x/routing
- https://laravel.com/docs/10.x/controllers
- https://laravel.com/docs/10.x/blade
- https://laravel.com/docs/10.x/migrations
- https://laravel.com/docs/10.x/eloquent

Solved in: [**Laravel**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/Laravel)

# Day 6->9 Neobyte

### Requests:

#### Day 9. Create comprehensive README files for each project

- Each README should include detailed instructions on how to install the necessary dependencies and set up the development environment.

#### Day 8. API Health Checker

Create a project to monitor if the API is up and running. The API is one of your project, example: localhost:3000/api/products  
Project requirements:

- Log downtimes in a log file
- Log uptimes in a log file

#### Pattern:

- [timestamp] + Response Status Code + API is up/down . + response time.

**Example:**
**[2023-07-21 12:08:02] 200 API is up, response time 282 ms**

Solved in: [**NextT3**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/NextT3)

![task 8 picture](https://github.com/incolorate/Internship-Neobyte/assets/88613908/45f156e3-9455-4093-a3b3-3977dcd8ae18)

#### Day 6/7. Two-factor Auth -> User Registration -> User login

Solved in: [**NextT3**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/NextT3)

!![pic of task 6 and 7](https://github.com/incolorate/Internship-Neobyte/assets/88613908/8180bd99-7f20-4942-969f-d90987d304ba)

# Day 5 Neobyte

### Requests:

#### Searchbar with data table from DB

- the data uploaded via the script from [day4](https://github.com/incolorate/Internship-Neobyte/tree/Day4)
  Solved in: [**NextT3**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/NextT3)

![image](https://github.com/incolorate/Internship-Neobyte/assets/88613908/df14881b-863c-4a98-9e49-ee6fc9bbce47)

# Day 4 Neobyte

### Requests:

#### Import/Export CSV file

- Create a script to import a CSV file into database
- Create a script which will export from database to CSV file
  Solved in: [**ImportExport**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/ImportExport)

# Day 3 Neobyte

### Requests:

- backend (now):  
  request: client -> api -> db
  response: db -> api -> client
- backend ( expected )
  check if products.json exists in RAM .. if YES -> send response from RAM, else send from DB ( load into RAM )
  proposed tech: REDIS ...
- look for other tools like REDIS
  Solved in: [**NodeBE**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/NodeBE)

# Day 1&2 Neobyte

### Requests:

## Day 2.

- Requests:
- Identify best way to secure the API
- Log all the API calls
- Log all possible issues.
  Solved in: [**NodeBE**](https://github.com/incolorate/Internship-Neobyte/tree/Day16/NodeBE)

#### Day 1. Basic REST API

- Create a simple API which returns products in json format
- Implement in 1-3 languages, like: nodejs, php, python, go
- Use docker for languages.
  Product Object:
- ID (unique)
- Name ( text )
- Price ( decimal 10,2 )
- Stock ( integer )
  Solved in: [**NodeBE** (serving data from mongodb)](https://github.com/incolorate/Internship-Neobyte/tree/Day16/NodeBE)
  Solved in [**PythonDay1BE** (serving data from local db)](https://github.com/incolorate/Internship-Neobyte/tree/Day16/PythonDay1BE)

## Installation steps in each document
