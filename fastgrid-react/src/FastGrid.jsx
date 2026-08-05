import React, { forwardRef, useLayoutEffect, useRef } from "react";
function assignRef(ref, value){ if(typeof(ref)=="function") ref(value); else if(ref) ref.current = value; }
export const FastGrid = forwardRef(function FastGrid({ src, id, component, ...rest }, ref){
   if(typeof(window)=="undefined") throw new Error("FastGrid engine works only on client side");
   const divRef = useRef(null), gridRef = useRef(null), eventsRef = useRef({}), regEventsRef = useRef({});
   const tagIdRef = useRef(null); if(tagIdRef.current==null) { 
      if(id) tagIdRef.current = id;
      else if(!window.FGrid){ if(!window.FGridReactId) window.FGridReactId = 10000; tagIdRef.current = "FG_Tag" + (window.FGridReactId++); }
      else { if(!window.FGrid.ReactId) window.FGrid.ReactId = 0; tagIdRef.current = "FG_Tag" + (window.FGrid.ReactId++); }
      }
   const tagId = id || tagIdRef.current;
   const dom = {}, ev = { id:tagId };
   const activeGridRef = useRef(null);
   const componentRef = useRef(component);
   componentRef.current = component;
   eventsRef.current = ev;
   for(var n in rest) if(n[1]=="n"&&(n[0]=="o"||n[0]=="O")&&typeof(rest[n])=="function"){ ev["O"+n.slice(1)] = rest[n]; } else dom[n] = rest[n];

   function setActiveGrid(grid){
      if(activeGridRef.current!==grid) regEventsRef.current = {};
      if(grid) grid.Component = componentRef.current || null;
      activeGridRef.current = grid;
      gridRef.current = grid;
      assignRef(ref,grid);
      }

   function assignEvents(){ //. In React, opposite to Vue / Angular, the events can be changed dynamically on every read, so they are not added to Events, but are updated dynamically
      const grid = gridRef.current, N = eventsRef.current, A = regEventsRef.current; if(!grid) return;
      for(var n in N) if(n!="id"&&A[n]!=N[n]){ grid.AddEvent(n,N[n],tagId,1); A[n] = N[n]; } 
      for(var n in A) if(!N[n]){ grid.DelEvent(n,tagId,1); delete A[n]; }                    
      }

   function assignGrid(){
      if(!divRef.current) return;
      if(!window.FGrid||typeof(window.FGrid.FastGrid)!="function") throw new Error(
         "FastGrid engine is not loaded. " +
         "Use import { FastGrid } from 'fastgrid-react' for the trial version, " +
         "or load your registered FGridE.js and import { FastGrid } from 'fastgrid-react/registered'.");

      const E = { Sheet:".", Events:{ OnTag_AA: function(grid,tag){ setActiveGrid(grid); assignEvents(); } } };
      if(id) E.Cfg = { id:id };

      const grid = window.FGrid.FastGrid(window.FGrid.MergeSources(window.FGrid.RunSources(src),E),tagId);
      setActiveGrid(grid);
      assignEvents();

      return function(){
         const current = activeGridRef.current || grid;
         assignRef(ref,null);
         regEventsRef.current = {};
         if(current) current.Dispose(1);
         if(gridRef.current===current) gridRef.current = null;
         if(activeGridRef.current===current) activeGridRef.current = null;
         };
      }
   useLayoutEffect(assignGrid,[src, tagId, ref]);
   useLayoutEffect(function(){ if(gridRef.current) gridRef.current.Component = componentRef.current || null; },[component]);
   useLayoutEffect(assignEvents);
   return (<div id={tagId} ref={divRef} {...dom}/>);
   });
