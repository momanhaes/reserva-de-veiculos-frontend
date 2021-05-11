import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const ROUTES: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "**", component: NotFoundComponent },
];