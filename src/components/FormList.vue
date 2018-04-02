<template>
    <div class="form-list">
        <div class="header">
            <p>Form Name</p>
            <p v-bind:click="reverse">Date Created</p>
        </div>
        <item v-for="form in forms" v-bind:key="form.id" :form.sync="form"></item>
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
                console.log(response.data);
                this.forms = response.data
            })
        }
    },
    data(){
        return {
            forms: [{
                title: "GBD Paper 1",
                dateCreated: "12/13/18",
                entries: 200,
                entriesToday: 1,
            }, {
                title: "GBD Paper 2",
                dateCreated: "10/10/18",
                entries: 120,
                entriesToday: 13,
            }, {
                title: "Really long long long name here 2018",
                dateCreated: "4/13/18",
                entries: 18,
                entriesToday: 0,
            }],
        };
    },
    mounted(){
        // call method
        this.getForms();
    },
};
</script>

<style scoped>
.form-list{
    margin-left: 50px;
    margin-right: 50px;
    border-bottom: 1px solid #DDDDDD;
    width: 80%;
    margin: auto;
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
</style>
