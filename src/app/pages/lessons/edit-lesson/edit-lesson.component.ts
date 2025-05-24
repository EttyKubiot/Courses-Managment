import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../services/courses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
      RouterModule
  ],
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);

  courseId!: number;
  lessonId!: number;
  form!: FormGroup;
  errorMessage = '';

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));

    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.courseService.getLessonById(this.lessonId).subscribe({
      next: (lesson) => this.form.setValue({
        title: lesson.title,
        content: lesson.content
      }),
      error: () => this.errorMessage = 'שגיאה בטעינת פרטי השיעור'
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.courseService.updateLesson(this.lessonId, this.form.value).subscribe({
        next: () => this.router.navigate([`/manage-courses/${this.courseId}/lessons`]),
        error: () => this.errorMessage = 'שגיאה בשמירת השיעור'
      });
    }
  }
}
