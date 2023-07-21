from pymongo import MongoClient
import csv
import time

# Connect to db/define collection name
mongo_uri = ""
client = MongoClient(mongo_uri)
db = client["neobyteday4"]
collection = db["Import"]

# Measure performance
start = time.time()

# Define the file and the headers
file = "./file.csv"
headers = ["Customer Id", "First Name", "Last Name",
           "Company", "City", "Country", "Phone 1"]
documents = []

# Open file in read mode and "push" each row to documents
with open(file, "r") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        filtered_row = {column: row[column] for column in headers}
        documents.append(filtered_row)

# Use of insert many / 10x compared to inserting each row
if documents:
    collection.insert_many(documents)

# End timer print time
end = time.time()
print(end - start)
