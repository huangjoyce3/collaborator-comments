"use strict";

// mongo db store here
// what functions we need for the db?

const mongodb = require("mongodb");

class MongoStore {
    constructor(db, colName) {
        this.collection = db.collection(colName);
    }

    insertComment(index, comment) {
        return this.collection.insertOne(comment).then(() => comment);
    }
    getAllComment(formName) {
        return this.collection.find({ formName: formName }).toArray();
    }

    getAll() {
        return this.collection.find().toArray();
    }
}

module.exports = MongoStore;
