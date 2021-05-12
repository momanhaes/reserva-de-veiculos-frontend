import { Component, Input, OnInit } from "@angular/core";
import { APPEARD } from "src/animations/appeard.animation";
import { IHeader } from "./header.interface";

interface INavbar {
  navbarMenu: any;
  navbarLinks: any;
  navbarToggler: HTMLElement;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [APPEARD],
})
export class HeaderComponent implements OnInit {
  public headerRoutes: IHeader[];
  public navbar: INavbar;
  public state = "ready";
  @Input() img: string;

  constructor() { }

  ngOnInit() {
    this.getHeaderRoutes();
    this.getHeaderSelectors();
    this.menuToggler();
  }

  menuToggler() {
    this.navbar.navbarToggler.addEventListener("click", () => {
      this.navbar.navbarToggler.classList.toggle("open-navbar-toggler");
      this.navbar.navbarMenu.classList.toggle("open");
    });

    this.navbar.navbarLinks.forEach((elem) =>
      elem.addEventListener("click", () => {
        if (this.navbar.navbarMenu.classList.contains("open"))
          this.navbar.navbarToggler.click();
      })
    );
  }

  closeMenuMobile() {
    this.navbar.navbarMenu.classList.toggle("open");
    this.navbar.navbarToggler.classList.toggle("open-navbar-toggler");
  }

  getHeaderSelectors() {
    this.navbar = {
      navbarMenu: document.querySelector(".navbar ul"),
      navbarLinks: document.querySelectorAll(".navbar a"),
      navbarToggler: document.querySelector(".navbar-toggler")
    }
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
