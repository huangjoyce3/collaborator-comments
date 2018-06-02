/*eslint-disable*/
<template>
<div>
    <!-- <div class="form-item">
        <p class="title">{{form.Name}}</p>
        <div class="date-wrapper">
            <p class="date-created"> {{form.DateCreated.split(" ")[0]}}</p>
        </div>
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
            <div id="metrics" class="button">View Metrics</div>
            <div v-on:click="onClick" id="export" class="button">Export</div>
        </div>
    </div> -->
    
</div>
</template>
 
<script type="text/javascript">
import axios from 'axios';
export default {
    props: ['form'],
    methods: {
        onClick(){
            // alert(this.form.Name);
            let sheetID = '15vAkt-aI_m18rZOzz7qRfIl1fAXhsX0BGVcYUGBIjAo'
            let url = "http://localhost:3000/form/" + this.form.Url + '/' + sheetID;
            //let url = 'http://localhost:3000/form/comment-form-gbd-2016-cancer-paper/1mKw1_QfofAOhJt-gud-5Trphct9hYtZHleit7l1eITU';
            console.log(url);
            axios.get(url).then((response) => {
                console.log('Success');
            }).catch((error) => {
                console.log(error);
            })
        }
    }
};
</script>

<style scoped>
.form-item{
    display: flex;
    margin-left: 20px;
    justify-content:space-between;
    border-top: 1px solid #DDDDDD;
}

.date-wrapper{
    display: flex;
    justify-content: center;
}

.buttons{
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
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
    color: 
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


