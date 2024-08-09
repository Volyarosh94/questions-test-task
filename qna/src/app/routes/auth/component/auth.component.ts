import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services';
import { Router } from '@angular/router';
import { TokenPair } from '../../../interfaces';

@Component({
  selector: 'app-questions',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected authService: AuthService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
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
        this.router.navigate(['questions']);
      },
      error: (e) => {
        alert(e.error.message);
      }
    });
  }

  get emailInvalid(): boolean {
    return this.authForm['submitted'] && this.authForm.controls['email'].invalid;
  }

  get passwordInvalid(): boolean {
    return this.authForm['submitted'] && this.authForm.controls['password'].invalid;
  }
}
