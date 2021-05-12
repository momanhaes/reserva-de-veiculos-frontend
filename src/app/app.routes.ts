import { Routes } from "@angular/router";

import { HomePage } from "./pages/home/home.page";
import { LoginPage } from "./pages/login/login.page";
import { NotFoundPage } from "./pages/not-found/not-found.page";
import { RegisterPage } from "./pages/register/register.page";

export const ROUTES: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginPage },
    { path: "register", component: RegisterPage },
    { path: "home", component: HomePage },
    { path: "**", component: NotFoundPage },
];