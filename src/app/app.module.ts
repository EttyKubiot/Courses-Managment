import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';



import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { ManageCoursesComponent } from './pages/manage-courses/manage-courses.component';
import { AuthInterceptor } from './pages/courses/auth.interceptor';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    CourseDetailComponent,
    ManageCoursesComponent,
  
  ],
  imports: [
    BrowserModule,
    BaseChartDirective,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
