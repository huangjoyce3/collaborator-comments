<template>
    <div class="assign">
        <h1>Project Officer Assignments</h1>
        <form>
            <div class="input-field">
                <input class="notransition" placeholder="grouping" type="text" id="grouping" v-model="grouping" required />
            </div>
            <div class="input-field">
                <input class="notransition" placeholder="assignee" type="text" id="assignee" v-model="assignee" required />
            </div>
            <button type="submit" @click.prevent="addTableRow(grouping, assignee)">Add</button>
        </form>
        <table>
            <thead>
                <th>Cause/Cause Grouping</th>
                <th>Project Officer to be Assigned</th>
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
            <tr v-for="assign in assignments" :class="{editing: editMode}" v-cloak :key="assign.id">
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
                    <div class="fa fa-trash-o" style="font-size:25px" @click="deleteData(assign.id)"></div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'Assign',
    data(){
        return{
            assignments: JSON.parse(localStorage.getItem('assignments')),
            editMode: false,
            editedRow: null
        };
    },
    methods: {
        saveData () {
            this.editMode = false;
            localStorage.setItem('assignments', JSON.stringify(this.assignments));
        },
        editData() {
            this.editMode = true;
        },
        deleteData(row){
            this.assignments.splice(row, 1);
        },
        addTableRow(gr, assignee) { 
            this.assignments.push(
                {grouping: gr, officer: assignee}
            );
            this.saveData();
        }
    },
    mounted(){
        if (localStorage.getItem('assignments')) {
            this.assignments = JSON.parse(localStorage.getItem('assignments'));
        }else{
            this.assignments = []
        }
    },
}
</script>

<style scoped>
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
}
input, input[type=text]:focus  {
  width: 20%;
  border: 0;
  outline: 0;
  padding: 0;
  border-bottom: 2px solid #d3d3d3;
  border-radius: 0;
}
.notransition {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
.trash:hover{
    cursor: pointer;
}
</style>
