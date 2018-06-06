"use strict";

class MemStore {
  constructor(map1, map2, map3) {
    this.commentMap = map1;
    this.causeGroupMap = map2;
    this.wordBank = map3;
    this.formArray = [];
    this.insertComment = this.insertComment.bind(this);
    this.insertWordBank = this.insertWordBank.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.getFormSize = this.getFormSize.bind(this);
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
    this.causeGroupMap.set(cause, assignee);
    return cause;
  }
  insertWordBank(cat, words) {
    this.wordBank.set(cat, words);
  }
  insertForm(form) {
    this.formArray.push(form);
  }
  getFormSize(form) {
    return this.formArray.filter(f => f.url == form)[0].totalEntries;
  }
  getNumberofUnexported(form) {
    return this.formArray.filter(f => f.url == form)[0].unexportedEntries;
  }
  getAllForm() {
    return this.formArray;
  }
  getAssignee(cause) {
    return this.causeGroupMap.get(cause);
  }
  getAllCauseGroup() {
    let obj = {}
    this.causeGroupMap.forEach(function(value, key) {
      console.log(key)
      console.log(value)
      obj[key] = value
    })
    return obj
  }
  getAllWords(cat) {
    return this.wordBank.get(cat);
  }
  getKeys() {
    return this.wordBank.keys();
  }
  getWordBank() {
    let obj = {}
    this.wordBank.forEach(function(value, key) {
      console.log(key)
      console.log(value)
      obj[key] = value
    })
    return obj;
  }
  deleteWord(cat) {
    if (this.wordBank.has(cat)) {
      this.wordBank.delete(cat);
      return true;
    }
    return false;
  }
  deleteCauseGroup(cause) {
    if (this.causeGroupMap.has(cause)) {
      this.causeGroupMap.delete(cause);
      return true;
    }
    return false;
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
  deleteAllComment(form) {
    if (this.commentMap.get(form)) {
      this.commentMap.set(form, []);
    }
  }
}

module.exports = MemStore;
