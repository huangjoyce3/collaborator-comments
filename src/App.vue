<template>
  <div id="app">
    <img src="./assets/ihme-logo.png">
    <p id="name">IHME Collaborator</p>
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
  margin: 0px 10px 0px 20px;
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
