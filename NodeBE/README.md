# Day 1&2 Neobyte

## Day 1. Basic REST API
### Requests:
* Create a simple API which returns products in json format 	
* Implement in 1-3 languages, like: nodejs, php, python, go 
* Use docker for languages. 
Product Object: 
* ID (unique) 
* Name ( text )
* Price ( decimal 10,2 )
* Stock ( integer )

## Day 2. 
* Requests:
* Identify best way to secure the API	
* Log all the API calls
* Log all possible issues. 

## Installation

Provide step-by-step instructions on how to install your project. Include any prerequisites, dependencies, and setup requirements.


** Note: when using git clone be mindfull of the branch **
```bash
$ git clone gh repo clone incolorate/Internship-Neobyte 
$ cd NodeBE
$ npm install
$ npm i bcrypt
```
Rename  .env.example to .env and provide a MONGODB connection URI

```
MONGODB = "mongodb uri"
SECRET = "express session secret code"
```

```bash
$ npm run dev
```