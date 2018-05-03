<template>
  <div id="app">
    
    <router-link :to="{name: 'home'}">
      <img src="./assets/ihme-logo.png">
    </router-link>
    <p id="name">IHME Collaborator</p>
    <router-link :to="{name: 'home'}">
        <button class="button">Form Manager</button>
    </router-link>
    <router-link :to="{name: 'assign'}">
        <button class="button">Assign</button>
    </router-link>
    <router-link :to="{name: 'wordbank'}">
        <button class="button">Wordbank</button>
    </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
