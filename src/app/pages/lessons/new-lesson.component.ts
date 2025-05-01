import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/courses.service';

@Component({
  selector: 'app-new-lesson',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {
  lessonForm: FormGroup;
  courseId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    console.log('NewLessonComponent loaded for courseId:', this.courseId);
  }

  onSubmit(): void {
    if (this.lessonForm.invalid) return;

    const { title, content } = this.lessonForm.value;

    this.courseService.createLesson(this.courseId, { title, content }).subscribe({
      next: () => {
        this.router.navigate([`/manage-courses/${this.courseId}/lessons`]);
      },
      error: err => console.error('שגיאה ביצירת שיעור', err)
    });
  }
}
