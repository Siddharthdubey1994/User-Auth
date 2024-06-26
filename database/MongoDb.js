'use strict';
const mongoose = require('mongoose');

async function mongoConnection() {
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    // [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.
    // Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);`
    // to suppress this warning.
    mongoose.set('strictQuery', false);
/*
    const USERNAME = encodeURIComponent(process.env.MongoDBUser);
    const PASSWORD = encodeURIComponent(process.env.MongoDBPassword);
    const LOGINCRED = (process.env.NODE_ENV != "localhost") ? `${USERNAME}:${PASSWORD}@` : "";
    const DATABASE_URL = `mongodb+srv://${LOGINCRED}${process.env.MongoDBHost}/${process.env.MongoDBDatabaseName}?appName=mongosh+1.6.1`;
    uncommnet above lines if you have a server of mongo 
*/
    const DATABASE_URL =  process.env.MONGODB_URL
    
    return await new Promise(async (resolve, reject) => {
        try {
            const connection = await mongoose.connect(DATABASE_URL, options);
            console.log('Mongo Initialized!');
            return resolve(connection.connection.db);
        } catch (err) {
            console.log("MongoDB Connection error", err);
            return reject(err);
        }  
    })
}

module.exports = { mongoConnection }