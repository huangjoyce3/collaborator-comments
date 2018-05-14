<template>
    <div class="form-list">
        <div class="flex">
            <p class="refresh-info">Last updated: {{ lastUpdated }} </p>
            <div class="refresh fa fa-refresh" id="icon" v-on:click="refresh"></div>
        </div>
        <table-component
            :data="forms"
            sort-by="totalEntries"
            sort-order="asc"
            :show-filter=true
            >
            <table-column show="name" label="Name"></table-column>
            <table-column show="unexportedEntries" label="Unexported Entries" data-type="numeric"></table-column>
            <table-column show="totalEntries" label="Total Entries" data-type="numeric"></table-column>
            <table-column show="dateCreate" label="Date Created" :filterable="false" data-type="date:MM/DD/YYYY"></table-column>
            <table-column label="" :sortable="false" :filterable="false">
                <template slot-scope="row">
                    <div v-on:click="onClick(row)" id="export" class="button">Export</div>
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
                var tempForms = response.data

                // change totalEntries into a number
                // format date
                for(var form in tempForms){
                    tempForms[form].totalEntries = parseInt(tempForms[form].totalEntries);
                    tempForms[form].dateCreate = this.momentL(tempForms[form].dateCreate);
                    console.log(tempForms[form].url);
                    if (localStorage.getItem(tempForms[form].url)){
                        tempForms[form].unexportedEntries = tempForms[form].totalEntries - JSON.parse(localStorage.getItem(tempForms[form].url))[1];
                    }else {
                        tempForms[form].unexportedEntries = tempForms[form].totalEntries;
                    }
                }   
                this.forms = tempForms;
                localStorage.setItem('forms', JSON.stringify(this.forms));
            })
        },
        getEntries(formName){
            let url = "http://localhost:3000/count/" + formName;
            axios.get(url).then((response) => {
                this.entries = response.data.EntryCount
            })
        },
        async onClick(form){
            // Step 1: call createSheetAPI if no SheetID is stored
            var formInfo = [];
            let sheetID = '';
            let createSheetAPI = 'http://localhost:3000/sheet/' + form.url;
            if(localStorage.getItem(form.url)){ // if sheetID of formURL exists
                sheetID = JSON.parse(localStorage.getItem(form.url))[0];
                console.log('stored');
            } else{
                try{
                    const response = await axios.post(createSheetAPI);
                    sheetID = response.data;
                    formInfo.push(sheetID);
                    console.log('1: ' + sheetID);
                } catch(e){
                    alert('Failed to create a new Google Sheets');
                    console.log(e);
                }
            }

            // Calls cleaning algorithm based on form type
            var url = ''
            if (form.type === ''){ // topic paper
                url = 'http://localhost:3000/topicForm/' + form.url + '/' + sheetID;
            } else if (form.type === 'capstone'){
                url = 'http://localhost:3000/capstoneForm/' + form.url + '/' + sheetID;
            } else if (form.type === 'capstone2'){                
                url = 'http://localhost:3000/capstoneForm2/' + form.url + '/' + sheetID;   
            }
            
            console.log('2: ' + url);
            axios.get(url).then((response) => {
                window.open('https://docs.google.com/spreadsheets/d/'+sheetID, '_blank');
                console.log('Success');
                // Save exported entry count locally
                let currentIndex = form.vueTableComponentInternalRowId;

                // save total entries
                formInfo.push(this.forms[currentIndex].totalEntries);

                // display unexported
                // this.forms[currentIndex].unexportedEntries = 
                //     this.forms[currentIndex].totalEntries - JSON.parse(localStorage.getItem(this.forms[currentIndex].url))[1];
                console.log(JSON.parse(localStorage.getItem(form.url))[0]);
                localStorage.setItem(form.url, JSON.stringify(formInfo));
                localStorage.setItem('forms', JSON.stringify(this.forms));
            }).catch((error) => {
                alert('Error: Failed to export to Google Sheets');
                console.log(error);
            })
        },
        refresh(){
            this.getForms();
            localStorage.setItem('lastUpdated', this.momentLLL());
            this.lastUpdated = localStorage.getItem('lastUpdated');
            // console.log(JSON.parse(localStorage.getItem('comment-form-alcohol-use-and-burden-paper'))[1]);
        },
        momentLLL(){
            return moment().format('LLL');
        },
        momentL(date){
            return moment(date).format('L');
        }
    },
    data(){
        return {
            forms: JSON.parse(localStorage.getItem('forms')),
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
.form-list{
    margin: 130px 5% 100px 5%;
}
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
    margin-top: 5%;
}

.flex{
    display: inline-flex;
    float: right;
    margin-right: 10%;
}

.refresh-info{
    margin-right: 30px;
    font-style: italic;
    color: #bdbdbd;
}

.refresh:hover{
    cursor: pointer;
    color: green;
}

#icon{
    display: inline-block;
    vertical-align: middle;
}
#icon:hover, #icon:focus, #icon:active {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    transition-duration: 0.3s;
}
.table-component__th--sort-asc:after {
  content: '↑';
  background-color: darkgreen;
}

.table-component__th--sort-desc:after {
  content: '↓';
}
</style>
