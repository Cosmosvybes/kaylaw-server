const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
config();
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const activities = client.db("kaylaw").collection("events");
const admin = client.db("kaylaw").collection("admin");
module.exports = { activities, admin };
