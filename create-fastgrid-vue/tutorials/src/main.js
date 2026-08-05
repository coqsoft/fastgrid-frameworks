import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Layout from "./Layout.vue";
import { tutorials } from "./List.js";
import "./index.css";

const routes = [
   {
      path: "/",
      component: Layout,
      children: [
         { path: "", redirect: "/start/01-quick-start-grid" },
         ...tutorials.map((tutorial) => ({
            path: tutorial.fullPath,
            component: tutorial.Component
         }))
      ]
   },
   { path: "/:pathMatch(.*)*", redirect: "/start/01-quick-start-grid" } //. Last one
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

createApp(App).use(router).mount("#app");
