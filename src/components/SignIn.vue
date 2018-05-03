<template>
    <div class="sign-in">
        <h2>Sign in to your account</h2>
        <form>
            <router-link :to="{name: 'assign'}">
                <button class="button">Sign in</button>
            </router-link>
            
        </form>
        <div class="other">
            <p id="create">Create and account</p>
            <p id="recover">Recover account</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'SignIn'
}
</script>

<style scoped>
h2{
    color: rgb(95, 95, 95);
    font-weight: 400;
}
input {
    border: none;
    border-bottom: 1px solid #dddddd;
    outline: none;
    text-align: center;
    font-size: 110%;
    width: 300px;
    color: rgb(143, 201, 145);
}
#username{
    padding-bottom: 10px;
    background: url('../assets/user.png') no-repeat scroll 10%;
}
#password{
    border: none;
    margin-top: 10px;
    background: url('../assets/locked.png') no-repeat scroll 10%;

}
.button {
    margin-top: 30px;
    padding: 10px 15px;
    background-color: white;
    border-radius: 20px;
    font-size: 100%;
    outline: none;
    color: #8DBE6C;
    border-color: #8DC26F;
}
.button:hover {
    /* background-color: rgb(143, 201, 145); Green */
    color: white;
    border-color: #8DC26F;
    background: linear-gradient(to right,#8DC26F, #76b852);
}
img {
    height: 30px;
}
.other {
    display: inline-block;
    overflow: hidden;
    margin-top: 100px;
    font-size: 90%;
}
#create:hover, #recover:hover{
    color: rgb(143, 201, 145);
}
#create{
    float: left;
    border: none;
    border-right: 2px solid #dddddd;
    padding-right: 50px;
}
#recover{
    display: block;
    overflow: hidden;
    padding-left: 50px;
}
</style>
