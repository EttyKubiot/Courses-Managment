import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private auth = inject(AuthService);

  // שימוש ב־signal ישירות מתוך השירות
  isLoggedIn = this.auth.isLoggedIn;
  role = this.auth.role;
  userName = this.auth.userName;

  // חישוב מבוסס תפקיד
  isTeacher = computed(() => this.role() === 'teacher');
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/']); // מעביר לעמוד הבית אחרי התנתקות
  }
}
