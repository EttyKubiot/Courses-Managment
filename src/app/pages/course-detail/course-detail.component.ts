import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/courses.service';
// נייבא את השירות

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: any;
  lessons: any[] = [];
  isLoaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.params['id'];
    
    this.courseService.getCourseById(courseId).subscribe({
      next: (courseData) => {
        
        this.course = courseData;
        this.checkIfLoaded();
      },
      error: (err) => {
        console.error('Error loading course', err);
      }
    });
  
    this.courseService.getLessonsByCourseId(courseId).subscribe({
      next: (lessonsData) => {
        console.log('Lessons data:', lessonsData);
        this.lessons = lessonsData;
        this.checkIfLoaded();
      },
      error: (err) => {
        console.error('Error loading lessons', err);
      }
    });
  }
  
  checkIfLoaded() {
    if (this.course && this.lessons.length > 0) {
      this.isLoaded = true;
    }
  }
}  



