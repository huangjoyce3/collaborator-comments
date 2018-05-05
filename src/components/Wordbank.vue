<template>
    <div class="wordbank">
        <h1>Smart Triage Word Bank</h1>
        <form @submit.prevent="addTableRow()">
            <div class="input-field">
                <input class="notransition" placeholder="category" type="text" id="category" v-model="newItem.category" required />
            </div>
            <div class="input-field">
                <input class="notransition" placeholder="word1, word2, etc" type="text" id="word" v-model="newItem.word" required />
            </div>
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
            <tr v-for="(item, key, index) in map" :class="{editing: item == editedRow}" v-cloak :key="item.id">
                <td>
                    <div class="view">
                        {{ key }}
                    </div>
                    <div class="edit">
                        {{ key }}
                    </div>
                </td>
                <td>
                    <div class="view">
                        {{ map[key] }}
                    </div>
                    <div class="edit">
                        <input class="input-wordbank" type="text" v-model="map[key]"/>
                    </div>
                </td>
                <td>
                    <div class="view">
                        <div class="icon-edit fa fa-edit" id="icon" @click="editData(item)"></div>
                    </div>
                    <div class="edit">
                        <div class="save fa fa-save" id="icon" @click="saveData(key)"></div>
                    </div>
                </td>
                <td>
                    <div class="trash fa fa-trash-o" id="icon" @click="deleteData(key)"></div>
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
            map: {
                'Manuscript': 'wording, language, replace',
                'Priority': 'model, modell',
                'No response needed': 'great, awesome, perfect, amazing'
            },
            editMode: false,
            editedRow: null,
            lastEditWordbank: localStorage.getItem('lastEditWordbank'),
            newItem: {
                category: '',
                word: ''
            }
        };
    },
    methods: {
        saveData () {
            this.editMode = false;
            localStorage.setItem('wordbank', JSON.stringify(this.map));
            localStorage.setItem('lastEditWordbank', this.momentLLL());
        },
        editData(row) {
            this.editMode = true;
            this.editedRow = row;
        },
        deleteData(index){
            this.wordbank.splice(index, 1);
            this.saveData();
        },
        addTableRow() { 
            alert('click');
            // Parse string to array

            // this.wordbank.push(
            //     {category: this.newItem.category, word: this.newItem.word.split('')}
            // );
            this.map[this.newItem.category] = this.newItem.word.split(',');
            console.log(this.map);

            this.saveData();
        },
        toString(wordbank){
            var str = '';
            for(var word in wordbank){
                str += wordbank[word]+', ';
            }
            return str;
        },
        momentLLL(){
            return moment().format('LLL');
        },
        momentL(date){
            return moment(date).format('L');
        }
    },
    mounted(){
        // if (localStorage.getItem('assignments')) {
        //     this.map = JSON.parse(localStorage.getItem('wordbank'));
        // }else{
        //     this.map = {}
        // }

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
    position: absolute;
    margin-left: 25%;
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
    margin-bottom: 0px;
    margin-left: inherit;
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
    margin-right: -130px;
    width: max-content;
}
input[id="category"]{
    margin-right: 20px;
    margin-left: 0px;
    width: max-content;
}
input[id="category"]:focus, input[id="word"]:focus{
    width: max-content;
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
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
#icon:hover, #icon:focus, #icon:active {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
