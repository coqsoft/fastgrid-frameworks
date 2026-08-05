import { writable } from "svelte/store";

const initialPath = typeof window !== "undefined" ? window.location.pathname : "/";
export const currentPath = writable(initialPath);

export function navigate(path) {
   if(typeof window === "undefined") return;
   if(window.location.pathname === path) {
      currentPath.set(path);
      return;
      }
   history.pushState({}, "", path);
   currentPath.set(path);
   }

if(typeof window !== "undefined") {
   window.addEventListener("popstate", function() {
      currentPath.set(window.location.pathname);
      });
   }
