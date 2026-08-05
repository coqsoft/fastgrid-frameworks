<script>
import { onMount } from "svelte";
import { tutorialGroups, tutorials } from "./List.js";
import "./Layout.css";

let CurrentComponent = null;
let currentPath = "";

function normalizePath(path) { return path.replace(/^\/+|\/+$/g,""); }

async function loadRoute(path = window.location.pathname){
   var normalized = normalizePath(path) || "start/01-quick-start-grid";
   var tutorial = tutorials.find((item) => item.fullPath===normalized);
   if(!tutorial) {
      history.replaceState(null,"","/start/01-quick-start-grid");
      tutorial = tutorials[0];
      normalized = tutorial.fullPath;
      }
   currentPath = normalized;
   var module = await tutorial.component();
   CurrentComponent = module.default;
   }

function navigate(event,path){
   event.preventDefault();
   if(normalizePath(window.location.pathname)===path) return;
   history.pushState(null,"","/"+path);
   loadRoute();
   }

onMount(function(){
   loadRoute();
   var popstate = () => loadRoute();
   window.addEventListener("popstate",popstate);
   return () => window.removeEventListener("popstate",popstate);
   });
</script>

<div class="tutorial-layout">
   <aside class="tutorial-sidebar">
      <h2>FastGrid tutorials<br />Svelte + Vite</h2>
      <nav class="tutorial-menu">
         {#each tutorialGroups as group}
            <section class="tutorial-group">
               <h3 class="tutorial-group-title">{group.title}</h3>
               <div class="tutorial-group-links">
                  {#each group.items as item}
                     <a href={"/"+group.path+"/"+item.path} onclick={(event) => navigate(event,group.path+"/"+item.path)} class:active={currentPath===group.path+"/"+item.path} class="tutorial-link">
                        {item.title}
                     </a>
                  {/each}
               </div>
            </section>
         {/each}
      </nav>
   </aside>

   <main class="tutorial-content Tutorial">
      {#if CurrentComponent}
         <CurrentComponent />
      {:else}
         <h2>Loading tutorial...</h2>
      {/if}
   </main>
</div>
