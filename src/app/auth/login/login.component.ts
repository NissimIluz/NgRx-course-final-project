import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { Action } from 'rxjs/internal/scheduler/Action';
import { login } from '../auth.actions';
import { AppState } from '../..';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    this.auth.login(this.form.controls['email'].value,this.form.controls['password'].value )
    .pipe(
      tap(user => { // Used to perform side-effects for notifications from the source observable
        console.log(Action);
        this.store.dispatch(login({user:user}));
        this.router.navigateByUrl("/courses")
      })
    )
    .subscribe(
      noop, 
      ()=> alert("login failed"));
  }

}

