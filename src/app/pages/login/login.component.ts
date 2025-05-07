import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage = signal('');

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value || '';
      const password = this.loginForm.get('password')?.value || '';
  
      this.authService.login({ email, password }).subscribe({
        next: (res) => {
          this.authService.setToken(res.token);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('role', res.role);
  
          // אם הניווט לא מתבצע בתוך setToken:
          const role = res.role || this.authService.role();
          if (role === 'teacher') {
            this.router.navigate(['/manage-courses']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: () => {
          this.errorMessage.set('אימייל או סיסמה לא נכונים');
        }
      });
    } else {
      this.errorMessage.set('נא למלא את כל השדות');
    }
  }
}
  


