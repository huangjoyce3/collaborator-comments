<template>
    <div class="sign-in">
        <h2>Log into IHME Collaborator Comments</h2>
        <form>
            <!-- <img src="https://png.icons8.com/windows/100/000000/guest-male.png">             -->
            <input type="text" name="username" placeholder="username" id="username"><br>
            <input type="text" name="password" placeholder="password" id="password"><br>
            <button class="button">Login in</button>
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
input[type=text] {
    border: none;
    border-bottom: 1px solid #dddddd;
    outline: none;
    text-align: center;
    font-size: 110%;
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
}
.button:hover {
    background-color: rgb(143, 201, 145); /* Green */
    color: white;
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

