import { Route } from "@angular/router";
import { HomeComponent } from "./home.component";

export default [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'subhome', loadComponent: () => import("./subhome/subhome.component").then(mod => mod.SubhomeComponent) }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
] satisfies Route[];