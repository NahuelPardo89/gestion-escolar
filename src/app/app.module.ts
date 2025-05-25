import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentsComponent } from './pages/dashboard/students/students.component';
import { GradesComponent } from './pages/dashboard/grades/grades.component';
import { StudyPlansComponent } from './pages/dashboard/study-plans/study-plans.component';
import { AddStudentComponent } from './pages/dashboard/students/add-student/add-student.component';
import { ListStudentsComponent } from './pages/dashboard/students/list-students/list-students.component';
import { AddStudyPlanComponent } from './pages/dashboard/study-plans/add-study-plan/add-study-plan.component';
import { ListStudyPlansComponent } from './pages/dashboard/study-plans/list-study-plans/list-study-plans.component';
import { AddSubjectComponent } from './pages/dashboard/study-plans/add-subject/add-subject.component';
import { ListSubjectsComponent } from './pages/dashboard/study-plans/list-subjects/list-subjects.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    StudentsComponent,
    GradesComponent,
    StudyPlansComponent,
    AddStudentComponent,
    ListStudentsComponent,
    AddStudyPlanComponent,
    ListStudyPlansComponent,
    AddSubjectComponent,
    ListSubjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
