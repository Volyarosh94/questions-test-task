import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services';
import { Router } from '@angular/router';
import { TokenPair } from '../../../interfaces';
import { AuthComponent } from '../component/auth.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./styles/_import.scss']
})
export class LoginComponent extends AuthComponent implements OnDestroy {
  subscription: Subscription;
  constructor(
    fb: FormBuilder,
    router: Router,
    authService: AuthService,
  ) {
    super(fb, authService, router);
  }

  onSubmit() {
    this.authForm['submitted'] = true;

    if (this.authForm.invalid) {
      return;
    }
    const userData = this.authForm.value;

    this.subscription = this.authService.login(userData).subscribe({
      next: (data: TokenPair) => {
        this.authService.saveToken(data);
        this.authService.updateAuthStatus(true);
        this.router.navigate(['questions']);
      },
      error: (e) => {
        alert(e.error.message);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
