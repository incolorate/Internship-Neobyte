from pymongo import MongoClient
import csv
import time

# Connect mongo db / define collection path
mongo_uri = "mongodb+srv://incolorate:zWlXI0rS9iGVyT55@neobyteday1.zsgcc2w.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client["neobyteday4"]
collection = db["Import"]

# Start timer
start = time.time()

# Fetch data
mongo_data = collection.find()
mongo_headers = collection.find_one()

# Define headers
headers = list(mongo_headers.keys())
headers.remove("_id")

# Define file
export_file = "exported.csv"

# Write to csv file
with open(export_file, 'w', newline='') as csvfile:
    writer = csv.DictWriter(
        csvfile, fieldnames=headers, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(mongo_data)

# End timer
end = time.time()
print(end-start)
