import { mount } from "svelte";
import App from "./App.svelte";
import "./index.css";

const target = document.getElementById("app");
if(!target) throw new Error("Application host element #app was not found");

mount(App,{ target });
