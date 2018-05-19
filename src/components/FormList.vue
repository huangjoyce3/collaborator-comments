<template>
    <div class="form-list">
        <!-- TODO: LOADING UI -->
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
            <table-column show="dateUpdated" label="Date Modified" :filterable="false" data-type="date:MM/DD/YYYY"></table-column>
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

                for(var form in tempForms){
                    // change totalEntries into a number
                    tempForms[form].totalEntries = parseInt(tempForms[form].totalEntries);
                    // format date
                    tempForms[form].dateUpdated = this.momentL(tempForms[form].dateUpdated);
                }   
                this.forms = tempForms;
            })
        },
        getEntries(formName){
            let url = "http://localhost:3000/count/" + formName;
            axios.get(url).then((response) => {
                this.entries = response.data.EntryCount
            })
        },
        getSheetIDAPI(formName){
            return new Promise(function(resolve, reject) {
                try {
                    let url = "http://localhost:3000/sheetID/" + formName;
                    axios.get(url).then((response) => {
                        console.log("return: " + formName + ", " + response.data)
                        resolve(response.data);
                    })
                } catch (e) {
                    reject(e);
                }
            })
        },
        async onClick(form){
            var sheetID = ''
            try{
                sheetID = await this.getSheetIDAPI(form.url);
                console.log('1: ' + sheetID);
            } catch(e) {
                console.log(e);
            }

            // Calls cleaning algorithm based on form type
            var url = ''
            if (form.type === ''){ // topic paper
                url = 'http://localhost:3000/topicForm/' + form.url + '/' + sheetID;
            } else if (form.type === 'capstone'){
                url = 'http://localhost:3000/capstoneForm/' + form.url + '/' + sheetID;
            } else if (form.type === 'capstone2'){   
                // TODO: same sheetid for page 2             
                url = 'http://localhost:3000/capstoneForm2/' + form.url + '/' + sheetID;   
            }
            
            console.log('2: ' + url);
            axios.get(url).then((response) => {
                window.open('https://docs.google.com/spreadsheets/d/'+sheetID, '_blank');
                console.log('Success');
            }).catch((error) => {
                alert('Error: Failed to export to Google Sheets');
                console.log(error);
            })
        },
        refresh(){
            this.getForms();
            localStorage.setItem('lastUpdated', this.momentLLL());
            this.lastUpdated = localStorage.getItem('lastUpdated');
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
        if (localStorage.getItem('lastUpdated')) {
            this.lastUpdated = localStorage.getItem('lastUpdated');
        }

        // get form data on page refresh
        this.refresh();
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
