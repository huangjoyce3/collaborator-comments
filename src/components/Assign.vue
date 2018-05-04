<template>
    <div class="assign">
        <h1>Project Officer Assignments</h1>
        <form @submit.prevent="addTableRow()">
            <div class="input-field">
                <input class="notransition" placeholder="cause" type="text" id="cause" v-model="newItem.cause" required />
            </div>
            <div class="input-field">
                <input class="notransition" placeholder="assignee" type="text" id="assignee" v-model="newItem.assignee" required />
            </div>
            <button class="add fa fa-plus-circle" id="icon" type="submit"></button>
        </form>
        <p class="edit-info">Last edited: {{ lastEditAssign }} </p>
        <table>
            <thead>
                <th>Cause/Cause Grouping</th>
                <th>Project Officer to be Assigned</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
            <tr v-for="(row,index) in assignments" :class="{editing: row == editedRow}" v-cloak :key="row.id">
                <td>
                    <div class="view">
                        {{row.cause}}
                    </div>
                    <div class="edit">
                        <!-- <input class="input-assign" type="text" v-model="row.cause"/> -->
                        {{row.cause}}
                    </div>
                </td>
                <td>
                    <div class="view">
                        {{row.assignee}}
                    </div>
                    <div class="edit">
                        <input class="input-assign" type="text" v-model="row.assignee"/>
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
import axios from 'axios';

export default {
    name: 'Assign',
    data(){
        return{
            assignments: JSON.parse(localStorage.getItem('assignments')),
            editMode: false,
            editedRow: null,
            lastEditAssign: localStorage.getItem('lastEditAssign'),
            newItem: {
                cause: '',
                assignee: ''
            }
        };
    },
    methods: {
        saveData(row) {
            this.editMode = false;
            localStorage.setItem('assignments', JSON.stringify(this.assignments));
            this.updateLastEdited();
            this.postAssignmentAPI(row.cause, row.assignee);
        },
        editData(row) {
            this.editMode = true;
            this.editedRow = row;
        },
        deleteData(index){
            this.deleteAssignmentAPI(this.assignments[index].cause);
            this.assignments.splice(index, 1);
            localStorage.setItem('assignments', JSON.stringify(this.assignments));
            this.updateLastEdited();
        },
        addTableRow() { 
            this.assignments.push(
                {cause: this.newItem.cause, assignee: this.newItem.assignee}
            );
            
            let url = 'http://localhost:3000/causeGroup';
            axios.post(url,{
                cause: this.newItem.cause,
                assignee: this.newItem.assignee
            }).then(function (response) {
                console.log(response.request.response);
            })
            .catch(function (error) {
                console.log(error);
            });
            localStorage.setItem('assignments', JSON.stringify(this.assignments));
            this.updateLastEdited();
            this.resetForm();
        },
        postAssignmentAPI(c, officer){
            let url = 'http://localhost:3000/causeGroup';
            axios.post(url,{
                cause: c,
                assignee: officer
            }).then(function (response) {
                console.log(response.request.response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteAssignmentAPI(c){
            let url = 'http://localhost:3000/causeGroup';
            console.log('deleting: ' + typeof c);
            axios.delete(url,{
                data: { cause: c }
            }).then(function (response) {
                console.log(response.request);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        resetForm(){
            this.newItem.cause = '';
            this.newItem.assignee = '';
        },
        updateLastEdited(){
            localStorage.setItem('lastEditAssign', this.momentLLL());
            this.lastEditAssign = localStorage.getItem('lastEditAssign');
        },
        momentLLL(){
            return moment().format('LLL');
        }
    },
    mounted(){
        if (localStorage.getItem('assignments')) {
            this.assignments = JSON.parse(localStorage.getItem('assignments'));
        }

        if (localStorage.getItem('lastEditAssign')) {
            this.lastEditAssign = localStorage.getItem('lastEditAssign');
        }
    },
    watch: {
        lastEditAssign(val){
            this.lastEditAssign = val;
        }
    }
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
    margin-bottom: 0px;
    margin-left: inherit;
}
input, input[type=text]:focus{
  width: 20%;
  border: 0;
  outline: 0;
  padding: 0;
  border-bottom: 2px solid #d3d3d3;
  border-radius: 0;
}
input[id="assignee"]{
    margin-right: -140px;
    width: max-content;
}
input[id="cause"]{
    width: max-content;
    margin-left: -10px;
    margin-right: 20px;
}
.notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
.input-assign{
    width: 100%;
    margin: auto;
}
.input-assign:focus{
    width: 100% !important;
}
input[id="cause"]:focus, input[id="assignee"]:focus{
    width: max-content;
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
.edit-info{
    font-style: italic;
    color: #bdbdbd;
    margin: 0px 0px 30px;
}
</style>
