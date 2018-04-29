"use strict";

class MemStore {
  constructor(map1, map2, map3) {
    this.commentMap = map1;
    this.causeGroupMap = map2;
    this.wordBank = map3;
    this.formArray = [];
    this.insertComment = this.insertComment.bind(this);
    this.getKeys = this.getKeys.bind(this);
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
  insertWordBank(cat, word) {
    let collection = this.causeGroupMap.get(cat);
    if (!collectin) {
      this.wordBank.set(cat, []);
      collection = this.wordBank.get(cat);
    }
    collection.push(word);
    return word;
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
  getAllWords(cat) {
    return this.wordBank.get(cat);
  }
  getKeys() {
    return this.wordBank.keys();
  }
  deleteWord(cat, word) {
    let collection = this.causeGroupMap.get(cat);
    if (collection) {
      var index = collection.indexOf(word);
      if (index > -1) {
        collection.splice(index, 1);
        return word;
      }
    }
    return null;
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
