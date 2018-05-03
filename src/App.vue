<template>
  <div id="app">
    
    <router-link :to="{name: 'home'}">
      <img src="./assets/ihme-logo.png">
    </router-link>
    <p id="name">IHME Collaborator</p>
    <div class="tab-wrapper">
      <router-link :to="{name: 'home'}">
          <button class="tab" :class="{highlight: highlighted}" @click="toggleHighlight">Form Manager</button>
      </router-link>
      <router-link :to="{name: 'assign'}">
          <button class="tab" :class="{highlight: highlighted}" @click="toggleHighlight">Assign</button>
      </router-link>
      <router-link :to="{name: 'wordbank'}">
          <button class="tab" :class="{highlight: highlighted}" @click="toggleHighlight">Word Bank</button>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      highlighted: true
    };
  },
  methods:{
    toggleHighlight(){
      this.hightlighted = !this.highlighted
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.tab{
  border: none;
  outline: none;
  font-size: 1.6vw;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-right: 20px;
  cursor: pointer;
}
.tab-wrapper{
  margin-bottom: 30px;
}
.highlight{
  border-bottom:2px solid #8AB76B;
}
.header-wrapper{
  display: flex;
}
img{
  float: left;
  margin: 0px 10px 0px 40px;
}
#name{
  margin-top: 40px;
  padding-top: 5px;
  margin-left: 50px;
  font-size: 30px;
  font-weight: 500;
  display: flex;
}
</style>
