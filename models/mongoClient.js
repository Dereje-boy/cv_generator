const { MongoClient } = require("mongodb")
const dbName = 'cvGenerator';
const url = 'mongodb://localhost:27017';

async function getClientConnection(collectionName) {
    const client = new MongoClient(url);
    const connection = await client.connect();
    const cvGeneratorDB = connection.db(dbName);
    const collection = cvGeneratorDB.collection(collectionName);
    return collection;
}

async function insertOneUser(user) {
    const client = new MongoClient(url);
    const connection = await client.connect();
    const cvGeneratorDB = connection.db(dbName);
    const collection = cvGeneratorDB.collection('users');
    return await collection.insertOne(user);

}
async function insertEducation(education) {
    const client = new MongoClient(url);
    const connection = await client.connect();
    const cvGeneratorDB = connection.db(dbName);
    const collection = cvGeneratorDB.collection('education');
    return await collection.insertOne(user);

}
async function insertExperience(experience) {
    const client = new MongoClient(url);
    const connection = await client.connect();
    const cvGeneratorDB = connection.db(dbName);
    const collection = cvGeneratorDB.collection('experience');
    return await collection.insertOne(user);

}
async function insertLanguage(language) {
    const client = new MongoClient(url);
    const connection = await client.connect();
    const cvGeneratorDB = connection.db(dbName);
    const collection = cvGeneratorDB.collection('langauge');
    return await collection.insertOne(user);

}
async function insertReference(reference) {
    const client = new MongoClient(url);
    const connection = await client.connect();
    const cvGeneratorDB = connection.db(dbName);
    const collection = cvGeneratorDB.collection('reference');
    return await collection.insertOne(user);

}
async function insertHobbies(hobbies) {
    const client = new MongoClient(url);
    const connection = await client.connect();
    const cvGeneratorDB = connection.db(dbName);
    const collection = cvGeneratorDB.collection('hobbies');
    return await collection.insertOne(user);

}

module.exports = {
    insertOneUser,
}