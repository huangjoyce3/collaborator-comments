<template>
    <div class="form-list">
        <!-- <div class="header">
            <p>Form Name</p>
            <p v-bind:click="reverse">Date Created</p>
        </div>
        <item v-for="form in forms" v-bind:key="form.id" :form.sync="form"></item> -->
        <form id="search">
            Search: <input name="query" v-model="searchQuery">
        </form>
        <table>
            <thead>
            <tr>
                <th v-for="header in formHeaders" v-bind:key="header.id">
                {{ header  }}
                <span class="arrow" >
                </span>
                </th>
                <!-- <th class="column1">Form Name</th>
                <th>Date Created</th> -->
            </tr>
            </thead>
            <tbody>
            <tr v-for="form in testForms" v-bind:key="form.id">
                <td class="column1">
                    {{form.Name}}
                </td>
                <td>
                    {{form.DateCreated.split(" ")[0]}}
                </td>
                <!-- <td>
                {{getEntries(form.Url)}}
                </td> -->
                <td>
                    <div v-on:click="onClick(form.Url)" id="export" class="button">Export</div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">

import Item from './Item';
import axios from 'axios';

export default {
    name: 'form-list',
    components: {Item,},
    methods: { 
        getForms(){
            let url = "http://localhost:3000/allForms";
            axios.get(url).then((response) => {
                this.forms = response.data
            })
        },
        getEntries(formName){
            let url = "http://localhost:3000/count/" + formName;
            axios.get(url).then((response) => {
                // return response.data.EntryCount
                this.entries = response.data.EntryCount
                // return this.entries;
            })
        },
        onClick(formURL){
            // alert(this.form.Name);
            let sheetID = '15vAkt-aI_m18rZOzz7qRfIl1fAXhsX0BGVcYUGBIjAo'
            let url = "http://localhost:3000/form/" + formURL + '/' + sheetID;
            //let url = 'http://localhost:3000/form/comment-form-gbd-2016-cancer-paper/1mKw1_QfofAOhJt-gud-5Trphct9hYtZHleit7l1eITU';
            console.log(url);
            axios.get(url).then((response) => {
                window.open('https://docs.google.com/spreadsheets/d/'+sheetID, '_blank');
                console.log('Success');
            }).catch((error) => {
                alert('Failed to export to Google Sheets');
                console.log(error);
            })
        }
    },
    data(){
        return {
            forms: [],
            formHeaders: ['Name', 'Date'],
            testForms: [
                { Name: 'Collaborator Comments: GBD 2015 Updated', DateCreated: '1/2/2018' , url: 'form-name', totalEntries: 122},
                { Name: 'Comment Form: Cause of death preliminary estimates', DateCreated: '1/22/2017' , url: 'form-name', totalEntries: 78},
                { Name: 'Comment Form: EMR Obesity Paper', DateCreated: '10/8/2016' , url: 'form-name', totalEntries: 0},
                { Name: 'Comment Form: EMR HIV', DateCreated: '12/14/2018' , url: 'form-name', totalEntries: 53},
            ],
            searchQuery: '',
        };
    },
    mounted(){
        // call method
        this.getForms();
    },
    computed: {
        // filteredData() {
        //     var sortKey = this.sortKey
        //     var filterKey = this.filterKey && this.filterKey.toLowerCase()
        //     var order = this.sortOrders[sortKey] || 1
        //     var data = this.data
        //     if (filterKey) {
        //         data = data.filter(function (row) {
        //             return Object.keys(row).some(function (key) {
        //                 return String(row[key]).toLowerCase().indexOf(filterKey) > -1
        //             })
        //         })
        //     }
        //     if (sortKey) {
        //         data = data.slice().sort(function (a, b) {
        //             a = a[sortKey]
        //             b = b[sortKey]
        //             return (a === b ? 0 : a > b ? 1 : -1) * order
        //         })
        //     }
        //     return data
        // }
    }
};
</script>

<style scoped>
table{
    width: 80%;
    margin: auto;
}
th, td{
     border-bottom: 1px solid #DDDDDD;
     padding: 10px;
}
.form-list{
    border-bottom: 1px solid #DDDDDD;
}
.column1{
    text-align: left;
}
.filter{
    text-align: left;
}

.header{
    display: flex;
    font-weight: 500;
    justify-content: flex-start;
    margin-left: 20px;
}

.header p{
    margin-right: 20px;
}

.buttons{
    display: flex;
    justify-content: flex-end;
    
}

.button{
    padding-top: 3px;
    box-sizing: border-box;
    border-radius: 24px;
    height: 30px;
    right: 10px;
    cursor: pointer;
}

#export{
    background: linear-gradient(to right,rgba(205, 250, 164, 0.753), #AEE7DD);
    width: 90px;
}

#export{
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
#export:hover, #exportfocus, #export:active {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
