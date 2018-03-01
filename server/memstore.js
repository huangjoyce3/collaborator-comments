"use strict";

class MemStore {
    constructor(map1) {
        this.commentMap = map1;
        this.insertComment = this.insertComment.bind(this);
    }
    insertComment(comment) {
        let collection = this.commentMap.get(comment.formName);
        if (!collection) {
            this.commentMap.set(comment.formName, []);
            collection = this.commentMap.get(comment.formName);
        }
        collection.push(comment);
        return comment;
    }
    getAllComment(form) {
        return this.commentMap.get(form);
    }
}

module.exports = MemStore;
