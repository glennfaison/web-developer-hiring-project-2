import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  showMenu = false;
  isAuthLayout = this.router.url.startsWith('/login') || this.router.url.startsWith('/register');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

}
