import { AuthService } from 'shared/services/auth.service';
import { Component, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email;
  password;
  loginFlag = true;
  reset = false;
  resetSent = false;

  constructor(private auth: AuthService) { }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  loginWithFB() {
    this.auth.loginWithFB();
  }

  signUpWithEmail() {
    this.auth.signUpWithEmail(this.email, this.password);
  }

  signInWithEmail() {
    this.auth.signInWithEmail(this.email, this.password);
  }

  resetPass() {
    this.auth.resetPassword(this.email);
    this.resetSent = true;
  }

}
