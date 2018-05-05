<template>
	<div id="app">
		<div class="header-wrapper">
			<div class="logo-wrapper">
				<router-link :to="{name: 'home'}">
					<img src="./assets/ihme-logo.png">
				</router-link>
				<p id="name">IHME Collaborator</p>
			</div>
			<div class="tab-wrapper">
				<router-link class="tab" active-class="is-active" :to="{name: 'home'}">Form Manager</router-link>
				<router-link class="tab" active-class="is-active" :to="{name: 'assign'}">Assign</router-link>
				<router-link class="tab" active-class="is-active" :to="{name: 'wordbank'}">Word Bank</router-link>
			</div> 
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
	font-weight: lighter;
	cursor: pointer;
	text-decoration: none;
	color: gray;
}
.tab-wrapper{
  margin-bottom: 0px;
  margin-top: auto;
}
router-link-exact-active {
   background-color: indianred;
   cursor: pointer;
 }
.logo-wrapper{
	width: 50%;
}
.is-active, .is-active:hover{
	border-bottom: 2px solid #8AB76B !important;
	color: #2c3e50 !important;
	font-weight: bold;
}
.tab:hover{
	color: #8AB76B;
}
.header-wrapper{
  display: flow-root;
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-around;
}
img{
	float: left;
    left: 20px;
    margin-right: 25px;
    position: -webkit-sticky;
    position: sticky;
}
#name{
	margin-left: 50px;
	font-size: 30px;
	font-weight: 500;
	display: flex;
	margin: auto;
    margin-top: 29px;
}
</style>
