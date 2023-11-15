
<template>
  <header>
    <div class="container-md">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="shouldShowNavbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link :to="{ name: 'home' }" :key="Date.now()" class="btn btn-primary me-lg-2" aria-current="page"
                  style="text-decoration: none; color: inherit; color: white;">Home</router-link>

              </li>
              <!-- <li class="nav-item">
                <button class="btn btn-outline-success me-lg-2"><router-link to="/product/:id">Feed</router-link></button>
              </li> -->
              <!-- <li class="nav-item">
                <button class="btn btn-outline-success me-lg-2"><router-link
                    to="/register">Register</router-link></button>
              </li> -->
              <!-- <li class="nav-item">
                <button class="btn btn-outline-success me-lg-2"><router-link to="/sign-in">Login</router-link></button>
              </li> -->
            </ul>
            <form class="d-flex">
              <button class="btn btn-outline-warning me-lg-2" type="submit" @click="handleSignOut" v-if="isLoggedIn">Sign
                out</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <body>
    <RouterView />
  </body>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from "vue-router";
import { computed } from 'vue'; // เพิ่มการนำเข้า computed

const router = useRouter();
const isLoggedIn = ref(false);

let auth;

// กำหนดตัวแปร shouldShowNavbar ให้เป็น computed
const shouldShowNavbar = computed(() => {
  if (isLoggedIn.value) {
    return true;
  } else {
    return router.currentRoute.value.name !== 'register' && router.currentRoute.value.name !== 'sign-in';
  }
});

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      
    } else {
      isLoggedIn.value = false;
    }
  })

});



const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });

}


</script>


<style scoped>
#app {
  font-family: Avenire, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -mox-osx-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: aquamarine;

}

.navbar{
  border-radius: 3px;
}

.body {
  background-color: aquamarine;
}
.router-link {
  display: none;
}
</style>


