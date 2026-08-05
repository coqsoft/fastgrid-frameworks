import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { exampleGroups } from "./example-list";

@Component({
   selector:"app-example-layout",
   standalone:true,
   imports:[ CommonModule,RouterLink,RouterLinkActive,RouterOutlet ],
   templateUrl:"./example-layout.component.html"
   })
export class ExampleLayoutComponent {
   readonly exampleGroups = exampleGroups;
   }
