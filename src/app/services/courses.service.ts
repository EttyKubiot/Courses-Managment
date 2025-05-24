import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(userId?: number, role?: string): Observable<any[]> {
    if (role === 'student' && userId) {
      return this.http.get<any[]>(`${this.baseUrl}/student/${userId}`);
    }
    return this.http.get<any[]>(this.baseUrl); // למורים או אדמין
  }
  

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getLessonsByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/courses/${courseId}/lessons`);
  }
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  createCourse(courseData: { title: string; description: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, courseData);
  }
  updateCourse(courseId: number, updatedData: { title: string; description: string }) {
  return this.http.put(`/api/courses/${courseId}`, updatedData);
}

  joinCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`http://localhost:3000/api/courses/${courseId}/enroll`, {
      userId
    });
  }
  getStudentCourses(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/student/${studentId}`);
  }
  
  enrollStudent(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/enroll`, { userId });
  }
  
  unenrollStudent(courseId: number, userId: number): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/${courseId}/unenroll`, { body: { userId } });
  }
  createLesson(courseId: number, lessonData: { title: string, content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/lessons`, lessonData);
  }
 getLessonById(lessonId: number): Observable<any> {
  return this.http.get<any>(`http://localhost:3000/api/lessons/${lessonId}`);
}


updateLesson(lessonId: number, data: { title: string; content: string }) {
  return this.http.put(`/api/lessons/${lessonId}`, data);
}

}
