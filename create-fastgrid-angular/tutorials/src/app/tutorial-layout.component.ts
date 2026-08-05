import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { tutorialGroups } from "./tutorial-list";

@Component({
   selector:"app-tutorial-layout",
   standalone:true,
   imports:[ RouterLink,RouterLinkActive,RouterOutlet ],
   templateUrl:"./tutorial-layout.component.html"
   })
export class TutorialLayoutComponent {
   readonly tutorialGroups = tutorialGroups;
   }
