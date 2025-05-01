import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/courses.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-existing-course',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './add-existing-course.component.html',
  styleUrls: ['./add-existing-course.component.css']
})
export class AddExistingCourseComponent implements OnInit {
  allCourses: any[] = [];
  message = '';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
      },
      error: (err) => {
        console.error('שגיאה בטעינת קורסים', err);
      }
    });
  }

  addToMyCourses(courseId: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'לא מחובר';
      return;
    }
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId;
  
    this.courseService.joinCourse(courseId, userId).subscribe({
      next: () => {
        this.message = 'הקורס נוסף בהצלחה!';
      },
      error: (err) => {
        console.error('שגיאה בהוספה לקורס', err);
        this.message = 'שגיאה בהוספה לקורס';
      }
    });
 
  }
}
