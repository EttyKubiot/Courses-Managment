import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  allCourses: any[] = [];
  enrolledCourses: any[] = [];
  availableCourses: any[] = [];
  userId: number = 0;

  constructor(
    private courseService: CourseService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    this.userId = payload.userId;
    this.fetchAllCourses();
  }

  fetchAllCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
        this.courseService.getStudentCourses(this.userId).subscribe({
          next: (enrolled) => {
            const enrolledIds = enrolled.map((c: any) => c.id);
            this.enrolledCourses = data.filter(c => enrolledIds.includes(c.id));
            this.availableCourses = data.filter(c => !enrolledIds.includes(c.id));
          }
        });
      },
      error: (err) => console.error('שגיאה בקבלת קורסים', err)
    });
  }

  joinCourse(courseId: number, event: Event) {
    event.stopPropagation(); // מונע ניווט כשנלחץ כפתור
    this.courseService.enrollStudent(courseId, this.userId).subscribe({
      next: () => this.fetchAllCourses(),
      error: (err) => console.error('שגיאה בהצטרפות לקורס', err)
    });
  }

  leaveCourse(courseId: number, event: Event) {
    event.stopPropagation(); // מונע ניווט כשנלחץ כפתור
    this.courseService.unenrollStudent(courseId, this.userId).subscribe({
      next: () => this.fetchAllCourses(),
      error: (err) => console.error('שגיאה בעזיבת קורס', err)
    });
  }

  goToCourse(courseId: number) {
    this.router.navigate(['/courses', courseId]);
  }
}
