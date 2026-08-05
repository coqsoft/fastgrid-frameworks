<script>
import { onMount } from "svelte";
import { currentPath, navigate } from "./router.js";
import { tutorialGroups, tutorials } from "./List.js";
import "./App.css";
import "./Layout.css";

let pathname = "/";
let component = null;
let componentKey = "";
let unsubscribe;

function findTutorial(path) {
   return tutorials.find(function(tutorial) {
      return tutorial.fullPath === path;
      });
   }

async function loadTutorial(path) {
   const tutorial = findTutorial(path);
   component = null;
   componentKey = path;

   if(!tutorial || typeof(tutorial.loader)!=="function") return;

   try {
      const module = await tutorial.loader();
      if(pathname !== path) return;
      component = module.default;
      }
   catch(error) {
      console.error("Cannot load tutorial:",path,error);
      }
   }

function openTutorial(event,path) {
   event.preventDefault();
   navigate(path);
   }

onMount(function() {
   unsubscribe = currentPath.subscribe(function(path) {
      pathname = path;
      loadTutorial(path);
      });

   if(pathname === "/" || !findTutorial(pathname)) {
      if(tutorials.length) navigate(tutorials[0].fullPath);
      }
   else {
      loadTutorial(pathname);
      }

   return function() {
      if(unsubscribe) unsubscribe();
      };
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
                     {@const path = "/" + group.path + "/" + item.path}
                     <a href={path} class:active={pathname === path} class="tutorial-link" onclick={(event) => openTutorial(event,path)}>
                        {item.title}
                     </a>
                  {/each}
               </div>
            </section>
         {/each}
      </nav>
   </aside>

   <main class="tutorial-content Tutorial">
      {#if component}
         {#key componentKey}
            <svelte:component this={component} />
         {/key}
      {:else}
         <h2>Loading tutorial...</h2>
      {/if}
   </main>
</div>
