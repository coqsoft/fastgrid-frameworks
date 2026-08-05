import { Routes } from "@angular/router";
import { TutorialLayoutComponent } from "./tutorial-layout.component";
import { tutorialRoutes } from "./tutorial-list";
export const appRoutes:Routes = [
   {
      path:"",
      component:TutorialLayoutComponent,
      children:[ { path:"", pathMatch:"full", redirectTo:"start/01-quick-start-grid" }, ...tutorialRoutes ]
      },
   { path:"**", redirectTo:"start/01-quick-start-grid" }
   ];
