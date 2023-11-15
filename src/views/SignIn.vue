<template >
    <div class="container mt-5 border" style="height: 400px; width: 400px;">
        <div class="mx-auto text-center mt-5">
            <h5 class=" ">Sign In To an Account</h5>
            <p><input type="text" class="form-control" placeholder="Email" v-model="email"></p>
            <p><input type="text" class="form-control" placeholder="Password" v-model="password"></p>
            <p v-if="errMsg">{{ errMsg }}</p>
            <p><button @click="signIn" class="btn btn-primary">Submit</button></p>
            <p><button @click="singInWithGoogle" class="btn btn-danger">Sign In With Google</button></p>
            <p><a href=""><router-link
                    to="/register">Don't have account</router-link></a></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("")
const password = ref("")
const errMsg = ref("")
const router = useRouter()

const signIn = () => {

    // need . value because it ref ()
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value,)
        .then((data) => {
            console.log(data, "Successfully signed in");
            console.log(auth.currentUser, "auth")
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password";
                    break;
                default:
                    errMsg.value = "Email or password was incorrect";
                    break;
            }
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
.small-input {
    width: 300px;
    /* ปรับขนาดของ input ให้เล็กลง และความกว้างเป็น 150px */
}
</style>