import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../services/courses.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent {
  private courseService = inject(CourseService);
  private router = inject(Router);

  private teacherId = Number(localStorage.getItem('userId'));
  courses = signal<any[]>([]);

  constructor() {
   effect(() => {
  const myId = Number(localStorage.getItem('userId'));
  this.courseService.getCourses().subscribe({
    next: (data) => {
      const filtered = data.filter(c => c.teacherId === myId);
      this.courses.set(filtered);
    },
    error: (err) => console.error('שגיאה בטעינת קורסים', err)
  });
});

  }

  editCourse(courseId: number) {
    this.router.navigate(['/manage-courses/edit-course', courseId]);
  }

  deleteCourse(courseId: number) {
    if (confirm('האם אתה בטוח שברצונך למחוק את הקורס?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => this.courses.update(courses => courses.filter(c => c.id !== courseId)),
        error: (err) => console.error('מחיקת קורס נכשלה', err)
      });
    }
  }

  addCourse() {
    this.router.navigate(['/manage-courses/add-existing']);
  }

  createCourse() {
    this.router.navigate(['/manage-courses/new']);
  }

  addLesson(courseId: number) {
    this.router.navigate([`/manage-courses/${courseId}/lessons/new`]);
  }

  manageLessons(courseId: number) {
    this.router.navigate([`/manage-courses/${courseId}/lessons`]);
  }
}
