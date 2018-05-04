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
    //let collection = this.wordBank.get(cat);
    /*if (!collection) {
      this.wordBank.set(cat, []);
      collection = this.wordBank.get(cat);
    }
    collection.push(word);
    return word;*/
    this.wordBank.set(cat, words);
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
    console.log(this.causeGroupMap);
    return this.causeGroupMap;
  }
  getAllWords(cat) {
    return this.wordBank.get(cat);
  }
  getKeys() {
    return this.wordBank.keys();
  }
  getWordBank() {
    return this.wordBank;
  }
  deleteWord(cat, word) {
    let collection = this.wordBank.get(cat);
    if (collection) {
      var index = collection.indexOf(word);
      if (index > -1) {
        collection.splice(index, 1);
        return true;
      }
    }
    return false;
  }
  deleteCauseGroup(cause) {
    if (this.causeGroupMap.get(cause)) {
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
}

module.exports = MemStore;
