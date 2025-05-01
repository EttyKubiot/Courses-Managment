import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-manage-lessons',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './manage-lessons.component.html',
  styleUrls: ['./manage-lessons.component.css']
})
export class ManageLessonsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  courseId = Number(this.route.snapshot.paramMap.get('courseId'));

  course = signal<any>(null);
  lessons = signal<any[]>([]);

  constructor() {
    this.loadData();
  }

  loadData() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: data => this.course.set(data),
      error: err => console.error('שגיאה בפרטי קורס', err)
    });

    this.courseService.getLessonsByCourseId(this.courseId).subscribe({
      next: data => this.lessons.set(data),
      error: err => console.error('שגיאה בקבלת שיעורים', err)
    });
  }

  goToAddLesson() {
    this.router.navigate([`/manage-courses/${this.courseId}/lessons/new`]);
  }

  editLesson(id: number) {
    alert(`עריכת שיעור ${id} - טרם מיושם`);
  }

  deleteLesson(id: number) {
    if (confirm('האם אתה בטוח שברצונך למחוק את השיעור?')) {
      alert(`מחיקת שיעור ${id} - טרם מיושם`);
    }
  }
}
