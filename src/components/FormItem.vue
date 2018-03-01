<template>
<div class="form-item">
    <p class="title">{{form.title}}</p>
    <p class="date-created"> {{form.dateCreated}}</p>
    <p class="entries"> 
        <span class="bold"> 
            {{form.entries}}
        </span>
        entries
    </p>
    <p class="entries-today"> 
        <span class="bold">{{form.entriesToday}}</span> 
        Today
    </p>
    <p class="date-edited"> {{form.dateEdited}}</p>
    <div id="metrics" class="button">View Metrics</div>
    <div id="export" class="button">Export</div>
</div>
</template>

<script type="text/javascript">
export default {
    name: 'form-item',
    props: ['form'],
};
</script>

<style scoped>
.form-item{
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #DDDDDD;
}

.bold{
    font-weight: bold;
}

#metrics{
    box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid #828282;
    width: 110px;
}

.button{
    padding-top: 3px;
    margin-top: 10px;
    box-sizing: border-box;
    border-radius: 24px;
    height: 30px;
}

#export{
    background: linear-gradient(to right,#DBF68E, #D3E49F);
    width: 90px;
}
</style>


