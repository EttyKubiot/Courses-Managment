import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../services/courses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);

  form!: FormGroup;
  courseId!: number;
  errorMessage = '';

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => this.form.setValue({
        title: course.title,
        description: course.description
      }),
      error: () => this.errorMessage = 'שגיאה בטעינת הקורס'
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.courseService.updateCourse(this.courseId, this.form.value).subscribe({
        next: () => this.router.navigate(['/manage-courses']),
        error: () => this.errorMessage = 'שגיאה בעדכון הקורס'
      });
    }
  }
}
