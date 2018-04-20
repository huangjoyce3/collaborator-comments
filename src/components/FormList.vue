<template>
    <!-- <div class="form-list">
        <table>
            <thead>
            <tr>
                <th class="column1">Form Name</th>
                <th>Date Created</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="form in forms" v-bind:key="form.id">
                <td class="column1">
                    {{form.Name}}
                </td>
                <td>
                    {{form.DateCreated.split(" ")[0]}}
                </td>
                <td>
                {{getEntries(form.Url)}}
                </td>
                <td>
                    <div v-on:click="onClick(form.Url)" id="export" class="button">Export</div>
                </td>
            </tr>
            </tbody>
        </table>:data="[
     { name: 'Authorship form: GBD 2016 Firearms Paper', dateCreate: '2016-09-23', totalEntries: 337 },
     { name: 'Authorship form: GBD 2016 HAQ paper', dateCreate: '2018-02-28', totalEntries: 68 },
     { name: 'Collaborator Comments: GBD 2015 Updated', dateCreate: '2018-03-23', totalEntries: 922 },
     { name: 'Comment Form: Alcohol use and burden paper', dateCreate: '2016-10-28', totalEntries: 270 },
     { name: 'Injuries, and Risk Factors Study 2016', dateCreate: '2017-7-21', totalEntries: 270 },
     { name: 'Funding Universal Health Coverage and the Unfinished HIV/AIDS Agenda', dateCreate: '2019-1-13', totalEntries: 47 },
     { name: 'Spending on health and HIV/AIDS: domestic health spending and development assistance', dateCreate: '2018-03-28', totalEntries: 543 },
     { name: 'Trends in future health financing and coverage', dateCreate: '2014-02-03', totalEntries: 232 },
     ]"
    </div> -->
    <div class="form-list">
        <table-component
     :data="[
     { name: 'Authorship form: GBD 2016 Firearms Paper', dateCreate: '2016-09-23', totalEntries: 337 },
     { name: 'Authorship form: GBD 2016 HAQ paper', dateCreate: '2018-02-28', totalEntries: 68 },
     { name: 'Collaborator Comments: GBD 2015 Updated', dateCreate: '2018-03-23', totalEntries: 922 },
     { name: 'Comment Form: Alcohol use and burden paper', dateCreate: '2016-10-28', totalEntries: 270 },
     { name: 'Injuries, and Risk Factors Study 2016', dateCreate: '2017-7-21', totalEntries: 270 },
     { name: 'Funding Universal Health Coverage and the Unfinished HIV/AIDS Agenda', dateCreate: '2019-1-13', totalEntries: 47 },
     { name: 'Spending on health and HIV/AIDS: domestic health spending and development assistance', dateCreate: '2018-03-28', totalEntries: 543 },
     { name: 'Trends in future health financing and coverage', dateCreate: '2014-02-03', totalEntries: 232 },
     ]"
     sort-by="totalEntries"
     sort-order="asc"
     >
     <table-column show="name" label="Name"></table-column>
     <table-column show="totalEntries" label="Total Entries" data-type="numeric"></table-column>
     <table-column show="dateCreate" label="Date Created" :filterable="false" data-type="date:YYYY/MM/DD"></table-column>
     <table-column label="" :sortable="false" :filterable="false">
         <template slot-scope="row">
            <div v-on:click="onClick('comment-form-gbd-2016-cancer-paper')" id="export" class="button">Export</div>
         </template>
     </table-column>
 </table-component>
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
        async fetchData({ page, filter, sort }) {
            let url = "http://localhost:3000/allForms";
            var response = await axios.get(url, { page });
            // response.data=response.data.replace(/"(\w+)"\s*:/g, '$1:');
            console.log(response.data)
            // An object that has a `data` and an optional `pagination` property
            return response;
        },

        onClick(formURL){
            alert(formURL);
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

            // TODO: Save entry count locally
        }
    },
    data(){
        return {
            forms: [],
            // formHeaders: ['Name', 'Date'],
            // testForms: [
            //     { Name: 'Collaborator Comments: GBD 2015 Updated', DateCreated: '1/2/2018' , url: 'form-name', totalEntries: 122},
            //     { Name: 'Comment Form: Cause of death preliminary estimates', DateCreated: '1/22/2017' , url: 'form-name', totalEntries: 78},
            //     { Name: 'Comment Form: EMR Obesity Paper', DateCreated: '10/8/2016' , url: 'form-name', totalEntries: 0},
            //     { Name: 'Comment Form: EMR HIV', DateCreated: '12/14/2018' , url: 'form-name', totalEntries: 53},
            // ],
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
     text-align: left;
}
tbody{
    text-align: left;
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
    margin-right: 20spx;
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
