<template>
    <div class="wordbank">
        <h1>Smart Triage Word Bank</h1>
        <form>
            <div class="input-field">
                <input class="notransition" placeholder="category" type="text" id="grouping" v-model="grouping" required />
            </div>
            <div class="input-field">
                <input class="notransition" placeholder="word bank" type="text" id="assignee" v-model="assignee" required />
            </div>
            <button class="add fa fa-plus-circle" type="submit" @click.prevent="addTableRow(grouping, assignee)"></button>
        </form>
        <table>
            <thead>
                <th>Triage Category</th>
                <th>Word Bank</th>
                <th>
                    <div class="view">
                        <button @click="editData()">edit</button>
                    </div>
                    <div class="edit">
                        <button @click="saveData()">save</button>
                    </div>
                </th>
            </thead>
            <tbody>
            <tr v-for="(assign,index) in assignments" :class="{editing: editMode}" v-cloak :key="assign.id">
                <td>
                    <div class="view">
                        {{assign.grouping}}
                    </div>
                    <div class="edit">
                        <input type="text" v-model="assign.grouping"/>
                    </div>
                </td>
                <td>
                    <div class="view">
                        {{assign.officer}}
                    </div>
                    <div class="edit">
                        <input type="text" v-model="assign.officer"/>
                    </div>
                </td>
                <td>
                    <div class="view">
                        <button @click="editData(assign)">edit</button>
                    </div>
                    <div class="edit">
                        <button @click="saveData(assign)">save</button>
                    </div>
                </td>
                <td>
                    <div class="trash fa fa-trash-o" @click="deleteData(index)"></div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'Wordbank',
    data(){
        return{
            wordbank: JSON.parse(localStorage.getItem('wordbank')),
            editMode: false,
            editedRow: null
        };
    },
    methods: {
        saveData () {
            this.editMode = false;
            localStorage.setItem('wordbank', JSON.stringify(this.wordbank));
        },
        editData() {
            this.editMode = true;
        },
        deleteData(index){
            this.wordbank.splice(index, 1);
            this.saveData();
        },
        addTableRow(gr, assignee) { 
            this.wordbank.push(
                {grouping: gr, officer: assignee}
            );
            this.saveData();
        }
    },
    mounted(){
        if (localStorage.getItem('assignments')) {
            this.assignments = JSON.parse(localStorage.getItem('wordbank'));
        }else{
            this.assignments = []
        }
    },
}
</script>

<style scoped>
.assign{
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
    margin-bottom: 30px;
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
input[id="assignee"]{
    margin-right: 30px;
}
.notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
.trash, .add{
    font-size: 25px;
}
.add{
    color: dodgerblue;
    border: none;
    display: block;
}
.trash{
    color: indianred;
}
.fa:hover{
    cursor: pointer;
}
</style>
