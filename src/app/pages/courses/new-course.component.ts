import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { CourseService } from "../../services/courses.service";

@Component({
    selector: 'app-new-course',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './new-course.component.html',
    styleUrls: ['./new-course.component.css']
  })
  export class NewCourseComponent {
    courseForm = this.fb.group({
      title: [''],
      description: ['']
    });
  
    constructor(private fb: FormBuilder, private courseService: CourseService, private router: Router) {}
  
    onSubmit() {
      if (this.courseForm.valid) {
        this.courseService.createCourse({
          title: this.courseForm.value.title || '',
          description: this.courseForm.value.description || ''
        }).subscribe({
          next: (res) => {
            console.log('Course created', res);
            this.router.navigate(['/manage-courses']);
          },
          error: (err) => {
            console.error('Failed to create course', err);
          }
        });
      }
    }
  }
  