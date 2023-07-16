from pymongo import MongoClient
import csv
import time

mongo_uri = "mongodb+srv://incolorate:zWlXI0rS9iGVyT55@neobyteday1.zsgcc2w.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)

db = client["neobyteday4"]
collection = db["Import"]

start = time.time()

file = "./file.csv"
headers = ["Customer Id", "First Name", "Last Name",
           "Company", "City", "Country", "Phone 1"]
documents = []


with open(file, "r") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        filtered_row = {column: row[column] for column in headers}
        documents.append(filtered_row)

# Use of insert many / 10x compared to inserting each row
if documents:
    collection.insert_many(documents)

end = time.time()
print(end - start)
