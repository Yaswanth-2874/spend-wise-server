const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://phantomphreak96:A!^*(zd1@cluster0.kgiyyj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
const connect = async () => {
  try {
    await client.connect();
    console.log("Connected to mongoDb Successfully");
  } catch (e) {
    console.log("Unable to connect to the database due to ", e);
  }
};

module.exports = {client, connect, ObjectId};