import { createRouter, createWebHistory } from "vue-router";
import Layout from "./Layout.vue";
import { tutorials } from "./List";

const routes = [
   {
      path: "/",
      component: Layout,
      children: [
         { path:"", redirect:"/grid/02-sets" },
         ...tutorials.map((tutorial) => ({
            path:tutorial.fullPath,
            component:tutorial.component,
            }))
         ],
      },
   { path: "/:pathMatch(.*)*", redirect: "/grid/02-sets" } //. Last one
   ];

export default createRouter({
   history:createWebHistory(),
   routes,
   });
