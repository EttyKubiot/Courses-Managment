import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  allCourses: any[] = [];
  enrolledCourseIds: number[] = [];
  userId: number = 0;

  constructor(
    private courseService: CourseService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    
  if (!token) {
    this.router.navigate(['/login']); // 👈 הפניה אם אין טוקן
    return;
  }
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.userId;
      this.fetchAllCourses();
      this.fetchEnrolledCourses();
    }
  }

  fetchAllCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => this.allCourses = data,
      error: (err) => console.error('שגיאה בקבלת כל הקורסים', err)
    });
  }

  fetchEnrolledCourses() {
    this.courseService.getStudentCourses(this.userId).subscribe({
      next: (data) => {
        this.enrolledCourseIds = data.map((course: any) => course.id);
      },
      error: (err) => console.error('שגיאה בקבלת קורסים של התלמיד', err)
    });
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  joinCourse(courseId: number) {
    this.courseService.enrollStudent(courseId, this.userId).subscribe({
      next: () => this.enrolledCourseIds.push(courseId),
      error: (err) => console.error('שגיאה בהצטרפות לקורס', err)
    });
  }
  

  leaveCourse(courseId: number) {
    this.courseService.unenrollStudent(courseId, this.userId).subscribe({
      next: () => {
        this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
      },
      error: (err) => console.error('שגיאה בעזיבת קורס', err)
    });
  }

  goToCourse(courseId: number) {
    this.router.navigate(['/courses', courseId]);
  }

  get enrolledCourses(): any[] {
    return this.allCourses.filter(c => this.isEnrolled(c.id));
  }
  
  get availableCourses(): any[] {
    return this.allCourses.filter(c => !this.isEnrolled(c.id));
  }
}
