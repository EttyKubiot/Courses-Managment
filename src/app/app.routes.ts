import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent },

  {
    path: 'manage-courses',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/manage-courses/manage-courses.component').then(m => m.ManageCoursesComponent)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./pages/courses/new-course.component').then(m => m.NewCourseComponent)
      },
      {
        path: 'add-existing',
        loadComponent: () =>
          import('./pages/manage-courses/add-existing-course.component').then(m => m.AddExistingCourseComponent)
      },
      {
        path: ':courseId/lessons',
        loadComponent: () =>
          import('./pages/manage-courses/manage-lessons.component').then(m => m.ManageLessonsComponent)
      },
      {
        path: ':courseId/lessons/new',
        loadComponent: () =>
          import('./pages/lessons/new-lesson.component').then(m => m.NewLessonComponent)
      }
    ]
  
  },
  { path: '**', redirectTo: '/courses' }
];

