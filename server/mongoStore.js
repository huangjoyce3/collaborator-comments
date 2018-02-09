"use strict";

// mongo db store here
// what functions we need for the db?

const mongodb = require("mongodb");

class MongoStore {
    constructor(db, colName) {
        this.collection = db.collection(colName);
    }

    insertForm(form) {}

    insertComment(form, comment) {}
    getComment(id) {}

    getAllForm() {
        return this.collection;
    }
}

module.exports = MongoStore;
