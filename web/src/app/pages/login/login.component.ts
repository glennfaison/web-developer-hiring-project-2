import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  @ViewChild('form', { static: false }) form: NgForm;
  errorMessage: string;

  constructor() {}

  ngOnInit() {}

}
