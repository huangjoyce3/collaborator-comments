"use strict";

class MemStore {
  constructor(map1, map2) {
    this.commentMap = map1;
    this.causeGroupMap = map2;
    this.formArray = [];
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
  insertCauseGroup(cause, assignee) {
    let collection = this.causeGroupMap.get(cause);
    if (!collection) {
      this.causeGroupMap.set(cause, assignee);
    }
    return cause;
  }
  insertForm(form) {
    this.formArray.push(form);
  }
  getAllForm() {
    return this.formArray;
  }
  getAssignee(cause) {
    return this.causeGroupMap.get(cause);
  }
  getAllCauseGroup() {
    return this.causeGroupMap;
  }
  deleteAllForm() {
    this.formArray = [];
  }
  insertCommentValue(comment, name) {
    let collection = this.commentMap.get(name);
    if (!collection) {
      this.commentMap.set(name, []);
      collection = this.commentMap.get(name);
    }
    collection.push(comment);
    return comment;
  }
  getAllComment(form) {
    return this.commentMap.get(form);
  }
}

module.exports = MemStore;
