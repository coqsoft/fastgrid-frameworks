<script setup>
import { RouterLink, RouterView } from "vue-router";
import { tutorialGroups } from "./List";
import "./Layout.css";
</script>

<template>
   <div class="tutorial-layout">
      <aside class="tutorial-sidebar">
         <h2>FastGrid examples<br />Vue + Vite</h2>
         <nav class="tutorial-menu">
            <section v-for="group in tutorialGroups" :key="group.path" class="tutorial-group">
               <h3 class="tutorial-group-title">{{ group.title }}</h3>
               <div class="tutorial-group-links">
                  <RouterLink v-for="item in group.items" :key="`${group.path}/${item.path}`" :to="`/${group.path}/${item.path}`" class="tutorial-link" active-class="active">
                     {{ item.title }}
                  </RouterLink>
               </div>
            </section>
         </nav>
      </aside>

      <main class="tutorial-content Tutorial">
         <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
         </RouterView>
      </main>
   </div>
</template>
