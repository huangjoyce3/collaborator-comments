<template>
    <div class="form-list">
        <div class="header">
            <p>Form Name</p>
            <p v-bind:click="reverse">Date Created</p>
            <p>Total Entries</p>
            <p>Entries Today</p>
            <p>Date Edited</p>
        </div>
        <form-item v-for="form in forms" :form.sync="form"></form-item>
    </div>
</template>

<script type="text/javascript">
import FormItem from './FormItem';

export default {
    name: 'form-list',
    props: ['forms'],
    components: {
        FormItem,
    },
    methods: { 
        reverse () {
            this.forms.reverse();
        }
    },
    forms: [{
        title: "GBD Paper 1",
        dateCreated: "12/13/18",
        entries: 200,
        entriesToday: 1,
        dateEdited: "12/15/18"
    }, {
        title: "GBD Paper 2",
        dateCreated: "10/10/18",
        entries: 120,
        entriesToday: 13,
        dateEdited: "10/30/18"
    }, {
        title: "GBD Paper 1",
        dateCreated: "4/13/18",
        entries: 18,
        entriesToday: 0,
        dateEdited: "4/13/18"
    }]
};
</script>

<style scoped>
.form-list{
    margin-left: 50px;
    margin-right: 50px;
    border-bottom: 1px solid #DDDDDD;
}

.filter{
    text-align: left;
}

.header{
    display: flex;
}

.header p{
    margin-right: 20px;
}
</style>