<template>
    <div class="assign">
        <h1>Project Officer Assignments</h1>
        <form @submit.prevent="addTableRow()">
            <div class="input-field">
                <input class="notransition" placeholder="grouping" type="text" id="cause" v-model="newItem.cause" required />
            </div>
            <div class="input-field">
                <input class="notransition" placeholder="assignee" type="text" id="assignee" v-model="newItem.assignee" required />
            </div>
            <button class="add fa fa-plus-circle" type="submit"></button>
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
                        <input type="text" v-model="row.cause"/>
                    </div>
                </td>
                <td>
                    <div class="view">
                        {{row.assignee}}
                    </div>
                    <div class="edit">
                        <input type="text" v-model="row.assignee"/>
                    </div>
                </td>
                <td>
                    <div class="view">
                        <button @click="editData(row)">edit</button>
                    </div>
                    <div class="edit">
                        <button @click="saveData(row)">save</button>
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
            localStorage.setItem('lastEditAssign', this.momentLLL());
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
            localStorage.setItem('lastEditAssign', this.momentLLL());
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
            localStorage.setItem('lastEditAssign', this.momentLLL());
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
            console.log(c);
            axios.delete(url,{
                cause: c
            }).then(function (response) {
                console.log(response.request.response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        resetForm(){
            this.newItem.cause = '';
            this.newItem.assignee = '';
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
            alert(val);
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
.edit-info{
    font-style: italic;
    color: #bdbdbd;
    margin: 0px 0px 30px;
}
</style>
