import { Component, Input, OnInit } from "@angular/core";
import { APPEARD } from "src/animations/appeard.animation";
import { IHeader } from "./header.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [APPEARD],
})
export class HeaderComponent implements OnInit {
  public headerRoutes: IHeader[];
  public state = "ready";
  @Input() img: string;

  constructor() { }

  ngOnInit() {
    this.getHeaderRoutes();
    this.menuToggler();
  }

  menuToggler() {
    const navbarMenu = document.querySelector(".navbar ul");
    const navbarLinks = document.querySelectorAll(".navbar a");
    const navbarToggler: HTMLElement = document.querySelector(
      ".navbar-toggler"
    ) as HTMLElement;

    navbarToggler.addEventListener("click", () => {
      navbarToggler.classList.toggle("open-navbar-toggler");
      navbarMenu.classList.toggle("open");
    });

    navbarLinks.forEach((elem) =>
      elem.addEventListener("click", () => {
        if (navbarMenu.classList.contains("open")) {
          navbarToggler.click();
        }
      })
    );
  }

  closeMenuMobile() {
    const navbarMenu = document.querySelector(".navbar ul");
    const navbarToggler: HTMLElement = document.querySelector(
      ".navbar-toggler"
    ) as HTMLElement;
    navbarMenu.classList.toggle("open");
    navbarToggler.classList.toggle("open-navbar-toggler");
  }

  getHeaderRoutes() {
    this.headerRoutes = [
      {
        name: "Início",
        route: "/home",
      },
      {
        name: "Sair",
        route: "/login",
      },
    ];
  }
}
