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
            </thead>
            <tbody>
            <tr v-for="assign in assignments" :class="{editing: assign == editedRow}" v-cloak :key="assign.id">
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
                <td><button>delete</button></td>
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
            assignments: [
                {grouping: 'Cardiovasular Diseases & Neoplasms', officer: 'Tahiya'},
                {grouping: 'Congenital disorders', officer: 'Helen'},
                {grouping: 'Disbetes', officer: 'Mari'},
            ],
            editMode: false,
            editedRow: null
        };
    },
    methods: {
        saveData () {
        
        },
        editData(row) {
            this.beforEditCache = row
            this.editedRow = row
        },
        addTableRow(gr, assignee) { 
            this.assignments.push(
                {grouping: gr, officer: assignee}
            );
        }
    }
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
</style>
