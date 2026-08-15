<script>
import { defineComponent, getCurrentInstance, h, markRaw, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, useAttrs, watch } from "vue";
const RESERVED_LISTENERS = new Set(["onVnodeBeforeMount","onVnodeMounted","onVnodeBeforeUpdate","onVnodeUpdated","onVnodeBeforeUnmount","onVnodeUnmounted"]);
function listenerToFastGridEvent(name) { return name.startsWith("on") && !RESERVED_LISTENERS.has(name) && name!="on" ? `On${name.slice(2)}` : null; }
function isListener(name, value) { return name.startsWith("on") && typeof(value)==="function" && !RESERVED_LISTENERS.has(name); }

export default defineComponent({
   name: "FastGrid",
   inheritAttrs: false,
   props: {
      src: { type: [Object, Array, String], required: true },
      id: { type: String, default: undefined }
      },
   setup(props, { expose }) {
      const attrs = useAttrs();
      const root = ref(null);
      const grid = shallowRef(null);
      const instance = getCurrentInstance();
      let createToken = 0;
      let disposed = false;

      function getGrid() { return grid.value; }
      function disposeGrid() { if(grid.value){ grid.value.Dispose(1); grid.value = null; } }
      async function createGrid(){
         const token = ++createToken;
         await nextTick();
         if(disposed || token!==createToken || !root.value) return;

         const FG = globalThis.FGrid;
         if(!FG || typeof(FG.FastGrid)!=="function") {
            throw new Error("FastGrid script is not loaded. Import from 'fastgrid-vue' for the trial version, or load the registered FGridE.js before importing 'fastgrid-vue/registered'.");
            }
         FG.VueId = FG.VueId+1||1;
         disposeGrid();

         const setGrid = function(G){
            if(disposed || token!==createToken) { G?.Dispose?.(1); return; }
            //G.Component = instance?.proxy || null;
            G.Component = instance?.parent?.exposeProxy || instance?.parent?.proxy || null;
            grid.value = markRaw(G);
            };
         var E = { Sheet:".", Events:{} };
         E.Events.OnTag_AA = function(G,tag){ setGrid(G); };
         for(var n in attrs) if(n.slice(0,2)=="on"&&n.slice(0,7)!="onVnode"&&typeof(attrs[n])=="function") E.Events["On"+n.slice(2)+"_A"] = attrs[n];
         const G = FG.FastGrid(FGrid.MergeSources(FGrid.RunSources(props.src),E), root.value, setGrid);
         if(G && !grid.value && token===createToken) setGrid(G);
         }

      async function reload(src = props.src, type, onfinish, transparent){
         if(!grid.value) { await createGrid(); return grid.value; }
         grid.value.Reload(src, type, onfinish, transparent);
         return grid.value;
         }

      const exposedApi = new Proxy(
         { grid, getGrid, reload, dispose: disposeGrid },
         {
            has(target, name) { return name in target || !!grid.value && name in grid.value; },
            get(target, name, receiver) {
               if(name in target) return Reflect.get(target, name, receiver);
               const current = grid.value; if(!current) return undefined;
               const value = current[name];
               return typeof(value)==="function" ? value.bind(current) : value;
               },
            set(target, name, value, receiver) {
               if(name in target) return Reflect.set(target, name, value, receiver);
               const current = grid.value; if(!current) return false;
               current[name] = value;
               return true;
               }
            }
         );

      expose(exposedApi);
      watch(function(){ return props.src; }, function(){ if(!disposed){ createGrid(); } }, { deep: true });
      onMounted(createGrid);
      onBeforeUnmount(function(){ disposed = true; createToken++; disposeGrid(); });

      return function(){
         const rest = {}; for(var n in attrs) if(n.slice(0,2)!="on"||n.slice(0,7)=="onVnode"||typeof(attrs[n])!="function") rest[n] = attrs[n];
         return h("div", { ...rest, id: props.id, ref: root });
         };
      }
   });
</script>