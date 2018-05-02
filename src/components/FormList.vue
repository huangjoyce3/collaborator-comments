<template>
    <div class="form-list">
        <div class="flex">
            <p class="refresh-info">Last updated: {{ lastUpdated }} </p>
            <div class="refresh fa fa-refresh" v-on:click="refresh"></div>
        </div>
        <table-component
            :data="forms"
            sort-by="totalEntries"
            sort-order="asc"
            >
            <table-column show="name" label="Name"></table-column>
            <table-column show="totalEntries" label="Total Entries" data-type="numeric"></table-column>
            <table-column show="dateCreate" label="Date Created" :filterable="false" data-type="date:YYYY/MM/DD"></table-column>
            <table-column label="" :sortable="false" :filterable="false">
                <template slot-scope="row">
                    <div v-on:click="onClick(row.url)" id="export" class="button">Export</div>
                </template>
            </table-column>
        </table-component>
    </div>
</template>

<script type="text/javascript">

import Item from './Item';
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'form-list',
    components: {Item,},
    methods: { 
        getForms(){
            let url = "http://localhost:3000/allForms";
            axios.get(url).then((response) => {
                this.forms = response.data
                localStorage.setItem('forms', JSON.stringify(response.data));
            })
        },
        getEntries(formName){
            let url = "http://localhost:3000/count/" + formName;
            axios.get(url).then((response) => {
                this.entries = response.data.EntryCount
            })
        },
        async onClick(formURL){
            alert(formURL);
            // Step 1: call createSheetAPI if no SheetID is stored
            let createSheetAPI = 'http://localhost:3000/sheet/' + formURL;
            let sheetID = '';
            if(formURL != undefined){
                try{
                    const response = await axios.post(createSheetAPI);
                    sheetID = response.data;
                    console.log('1: ' + sheetID);
                } catch(e){
                    alert('Failed to create a new Google Sheets');
                    console.log(e);
                }
                
                let url = "http://localhost:3000/form/" + formURL + '/' + sheetID;
                console.log('2: ' + url);
                axios.get(url).then((response) => {
                    window.open('https://docs.google.com/spreadsheets/d/'+sheetID, '_blank');
                    console.log('Success');
                }).catch((error) => {
                    alert('Error: Failed to export to Google Sheets');
                    console.log(error);
                })
            } else {
                alert('Error: form URL undefined');
            }
            // TODO: Save entry count locally
        },
        updateLocalStorage(key, value){
            localStorage.setItem(key, storage);
        },
        refresh(){
            this.getForms();
            localStorage.setItem('lastUpdated', this.moment());
            this.lastUpdated = localStorage.getItem('lastUpdated');
        },
        moment(){
            return moment().format('LLL');
        }
    },
    data(){
        return {
            forms: localStorage.getItem('forms'),
            searchQuery: '',
            lastUpdated: localStorage.getItem('lastUpdated')
        };
    },
    mounted(){
        if (localStorage.getItem('forms')) {
            this.forms = JSON.parse(localStorage.getItem('forms'));
        }

        if (localStorage.getItem('lastUpdated')) {
            this.lastUpdated = localStorage.getItem('lastUpdated');
        }
    },
    watch: {
        forms(val){
            this.forms = val;
        },
        lastUpdated(val){
            this.lastUpdated = val;
        }
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

.refresh{
    display: flex;
    float: right;
    margin-right: 10%;
    margin-top: 25%;
}

.flex{
    display: inline-flex;
    float: right;
    margin-right: 10%;
}

.refresh-info{
    margin-right: 10px;
}

.refresh:hover{
    cursor: pointer;
    color: green;
}
</style>
