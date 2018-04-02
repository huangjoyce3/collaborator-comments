/*eslint-disable*/
<template>
<div>
    <div class="form-item">
        <p class="title">{{form.Name}}</p>
        <p class="date-created"> {{form.DateCreated.split(" ")[0]}}</p>
        <p class="entries"> 
            <span class="bold"> 
                {{form.entries}}
            </span>
            entries
        </p>
        <div class="line"></div>
        <p class="entries-today"> 
            <span class="bold">{{form.entriesToday}}</span> 
            Today
        </p>
        <div class="buttons">
            <!-- <div id="metrics" class="button">View Metrics</div> -->
            <div id="export" class="button">Export</div>
        </div>
    </div>
    
</div>
</template>
 
<script type="text/javascript">
export default {
    props: ['form'],
};
</script>

<style scoped>
.form-item{
    display: flex;
    margin-left: 20px;
    justify-content: space-between;
    border-top: 1px solid #DDDDDD;
}

.buttons{
    display: flex;
    justify-content: flex-end;
}
.bold{
    font-weight: bold;
}

.line{
    border-left: 1px solid green;
    height: 30px;
    margin: 10px 0px;
}
/* .title{
    position: absolute;
    left: 90px;
}
.date-created{
    position: absolute;
    left: 300px;
}
.entries{
    position: absolute;
    left: 400px;
}
.entries-today{
    position: absolute;
    left: 500px;
} */
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
    /* display: inline-block; */
    right: 10px;
    /* position: absolute; */
}

#export{
    background: linear-gradient(to right,#DBF68E, #D3E49F);
    width: 90px;
}
</style>


