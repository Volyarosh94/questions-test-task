import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services';
import { TokenPair } from '../../../interfaces';
import { Router } from '@angular/router';
import { AuthComponent } from '../component/auth.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./styles/_import.scss']
})
export class RegisterComponent extends AuthComponent {
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

    this.authService.register(userData).subscribe({
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
}
