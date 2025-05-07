import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RedirectIfLoggedInGuard } from './guards/RedirectIfLoggedInGuard.guard';
import { RoleRedirectGuard } from './guards/role-redirect.guard';
 // צריך להכין אם אין

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RoleRedirectGuard] },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [RedirectIfLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RedirectIfLoggedInGuard] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: CourseDetailComponent, canActivate: [AuthGuard] },

  {
    path: 'manage-courses',
    canActivate: [AuthGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/manage-courses/manage-courses.component').then(m => m.ManageCoursesComponent) },
      { path: 'new', loadComponent: () => import('./pages/courses/new-course.component').then(m => m.NewCourseComponent) },
      { path: 'add-existing', loadComponent: () => import('./pages/manage-courses/add-existing-course.component').then(m => m.AddExistingCourseComponent) },
      { path: ':courseId/lessons', loadComponent: () => import('./pages/manage-courses/manage-lessons.component').then(m => m.ManageLessonsComponent) },
      { path: ':courseId/lessons/new', loadComponent: () => import('./pages/lessons/new-lesson.component').then(m => m.NewLessonComponent) }
    ]
  },

  // עמוד 404 או הפניה לדף בית
  { path: '**', redirectTo: 'home' }
];
