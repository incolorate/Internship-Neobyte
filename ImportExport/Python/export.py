from pymongo import MongoClient

mongo_uri = "mongodb+srv://incolorate:zWlXI0rS9iGVyT55@neobyteday1.zsgcc2w.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)

db = client["neobyteday4"]
collection = db["Import"]

# Retrieve data from MongoDB
mongo_data = collection.find()
mongo_headers = collection.find_one()
headers = list(mongo_headers.keys())
headers.remove("_id")
print(headers)
