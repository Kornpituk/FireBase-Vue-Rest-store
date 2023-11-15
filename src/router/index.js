import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Feed from "../views/Feed.vue";
import Register from "../views/Register.vue";
import SignIn from "../views/SignIn.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // เพิ่มการนำเข้า Firebase Authentication SDK

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    // เพิ่มเส้นทางนี้เพื่อแสดงรายละเอียดของ item
    {
      path: "/product/:id",
      name: "productDetails",
      component: () => import("../views/Feed.vue"), // แทนด้วยชื่อของคอมโพเนนต์ที่คุณใช้สำหรับรายละเอียดของ item
      props: true, // ทำให้พารามิเตอร์ที่ส่งมาเป็น prop
    },
    // {
    //   path: '/feed',
    //   name: 'feed',
    //   component: () => import('../views/Feed.vue'),
    // },
  ],
});

const getCcurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const auth = getAuth(); // ดึงอ็อบเจ็กต์ Auth

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCcurrentUser()) {
      next();
    } else {
      alert("you dont have access!");
      next("/sign-in");
    }
  } else {
    next();
  }
});

export default router;
