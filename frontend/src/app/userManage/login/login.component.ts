import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { fbLoginUserData, LoginError, LoginUserData } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { loginFbRequest, loginUsersRequest } from '../../store/users/users.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit, OnDestroy{
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  fbLoading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;
  userData!: fbLoginUserData;

  constructor(private store: Store<AppState>, private auth: SocialAuthService) {
    this.loading = store.select(state => state.users.loginLoading);
    this.fbLoading = store.select(state => state.users.fbLoading);
    this.error = store.select(state => state.users.loginError);
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      this.userData = {
        authToken: user.authToken,
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUsersRequest({userData}));
  }

  fbLogin(){
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);

    this.store.dispatch(loginFbRequest({userData: this.userData}));
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }
}
