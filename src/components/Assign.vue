<template>
    <div class="assign">
        <h1>Project Officer Assignments</h1>
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
</style>
