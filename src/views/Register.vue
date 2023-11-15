<template >
    <div class="container mt-5 border" style="height: 400px; width: 400px;">
        <div class="mx-auto text-center mt-5">
            <h5 class=" ">Register An To an Account</h5>
            <p><input type="text" class="form-control" placeholder="Email" v-model="email"></p>
            <p><input type="text" class="form-control" placeholder="Password" v-model="password"></p>
            <p v-if="errMsg">{{ errMsg }}</p>
            <p><button @click="register" class="btn btn-primary">Submit</button></p>
            <p><button @click="singInWithGoogle" class="btn btn-danger">Sign In With Google</button></p>
            <p><router-link to="/sign-in">Have Account</router-link></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("")
const password = ref("")
const router = useRouter()

const register = () => {
    //need .value because ref()
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value,)
        .then((data) => {
            console.log(data, "Successfully registered");

            console.log(auth.currentUser)

            router.push('/')
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
};

const singInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/");
        })
        .catch((error) => {

        })
}
</script>
<style scoped="">
.container{
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
}

</style>