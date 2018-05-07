<template>
    <div class="wordbank">
        <h1>Smart Triage Word Bank</h1>
        <form @submit.prevent="addTableRow()">
            <input class="notransition" placeholder="category" type="text" id="category" v-model="newItem.category" required />
            <input class="notransition" placeholder="word1, word2, etc" type="text" id="word" v-model="newItem.word" required />
            <button class="add fa fa-plus-circle" id="icon" type="submit"></button>
        </form>
        <p class="edit-info">Last edited: {{ lastEditWordbank }} </p>
        <table>
            <thead>
                <th>Triage Category</th>
                <th>Word Bank</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
            <tr v-for="(row, index) in wordbank" :class="{editing: row == editedRow}" v-cloak :key="row.id">
                <td>
                    <div class="view">
                        {{ row.category }}
                    </div>
                    <div class="edit">
                        {{ row.category }}
                    </div>
                </td>
                <td>
                    <div class="view">
                        {{ row.word }}
                    </div>
                    <div class="edit">
                        <textarea class="input-wordbank" type="text" v-model="row.word"/> 
                    </div>
                </td>
                <td>
                    <div class="view">
                        <div class="icon-edit fa fa-edit" id="icon" @click="editData(row)"></div>
                    </div>
                    <div class="edit">
                        <div class="save fa fa-save" id="icon" @click="saveData(row)"></div>
                    </div>
                </td>
                <td>
                    <div class="trash fa fa-trash-o" id="icon" @click="deleteData(index)"></div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    name: 'Wordbank',
    data(){
        return{
            wordbank: [],
            editedRow: null,
            lastEditWordbank: localStorage.getItem('lastEditWordbank'),
            newItem: {
                category: '',
                word: ''
            }
        };
    },
    methods: {
        saveData(row) {
            this.editedRow = null;
            localStorage.setItem('wordbank', JSON.stringify(this.wordbank));
            this.updateLastEdited();
            this.postWordbankAPI(row.category, row.word);
        },
        editData(row) {
            this.editedRow = row;
        },
        deleteData(index){
            this.deleteWordbankAPI(this.wordbank[index].category, this.wordbank[index].word);
            this.wordbank.splice(index, 1);
            localStorage.setItem('wordbank', JSON.stringify(this.wordbank));
            this.updateLastEdited();
        },
        postWordbankAPI(category, word){
            let url = 'http://localhost:3000/wordBank';
            axios.post(url,{
                category: category.toLowerCase(),
                word: word.toLowerCase()
            }).then(function (response) {
                console.log(response.request.response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteWordbankAPI(c, w){
            let url = 'http://localhost:3000/wordBank';
            axios.delete(url,{
                data: { 
                    category: c.toLowerCase(),  
                    word: w.toLowerCase()
                }
            }).then(function (response) {
                console.log(response.request.response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addTableRow() { 
            this.wordbank.push(
                {category: this.newItem.category, word: this.newItem.word}
            );
            this.postWordbankAPI(this.newItem.category,this.newItem.word);
            localStorage.setItem('wordbank', JSON.stringify(this.wordbank));
            this.updateLastEdited();
            this.resetForm();
        },
        resetForm(){
            this.newItem.category = '';
            this.newItem.word = '';
        },
        momentLLL(){
            return moment().format('LLL');
        },
        updateLastEdited(){
            localStorage.setItem('lastEditWordbank', this.momentLLL());
            this.lastEditWordbank = localStorage.getItem('lastEditWordbank');
        },
    },
    mounted(){
        if (localStorage.getItem('assignments')) {
            this.wordbank = JSON.parse(localStorage.getItem('wordbank'));
        }

        if (localStorage.getItem('lastEditWordbank')) {
            this.lastEditWordbank = localStorage.getItem('lastEditWordbank');
        }
    },
    watch: {
        lastEditWordbank(val){
            this.lastEditWordbank = val;
        }
    }
}
</script>

<style scoped>
.wordbank{
    margin: auto;
    margin-top: 130px; 
    width: 50%;
    padding: 10px;
}
[v-cloak] {
    display: none;
}
.edit {
    display: none;
}
.editing .edit {
    display: block
}
.editing .view {
    display: none;
}
form{
    display: flex;
    justify-content: center;
    align-items: center;
}
input, input[type=text]:focus  {
    width: 20%;
    border: 0;
    outline: 0;
    padding: 0;
    border-bottom: 2px solid #d3d3d3;
    border-radius: 0;
}
input[id="word"]{
    width: 200px;
}
input[id="category"]{
    margin-left: 0px;
    width: 200px;
}
input[id="category"]:focus, input[id="word"]:focus{
    width: 200px;
}
.notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
.input-wordbank{
    width: 100%;
    margin: auto;
    text-align: center;
}
.input-wordbank:focus{
    width: 100% !important;
}
.trash, .add, .icon-edit, .save{
    font-size: 25px;
}
.add{
    color: dodgerblue;
    border: none;
    display: block;
    margin-left: 20px;
}
.icon-edit{
    color: dodgerblue;
}
.save{
    color: limegreen;
}
.trash{
    color: indianred;
}
.fa:hover{
    cursor: pointer;
}
#icon{
    display: inline-block;
    vertical-align: middle;
}
#icon:hover, #icon:focus, #icon:active {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    transition-duration: 0.3s;
}
textarea {
    width: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #bdbdbd;
    border-radius: 4px;
    outline: none;
}
th:hover{
    cursor: default;
    color: #2c3e50;
}
.edit-info{
    font-style: italic;
    color: #bdbdbd;
    margin: 0px 0px 30px;
}
table{
    margin: auto;
}
</style>
