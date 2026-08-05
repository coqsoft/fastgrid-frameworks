import { Routes } from "@angular/router";
import { ExampleLayoutComponent } from "./example-layout.component";
import { exampleRoutes } from "./example-list";

export const appRoutes:Routes = [
   {
      path:"",
      component:ExampleLayoutComponent,
      children:[
         {
            path:"",
            pathMatch:"full",
            redirectTo:"grid/02-sets"
            },
         ...exampleRoutes
         ]
      },
   {
      path:"**",
      redirectTo:"grid/02-sets"
      }
   ];
