import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/dashboard/students/students.component';
import { GradesComponent } from './pages/dashboard/grades/grades.component';
import { StudyPlansComponent } from './pages/dashboard/study-plans/study-plans.component';
import { AuthGuard } from './guards/auth.guard';
import { AddStudentComponent } from './pages/dashboard/students/add-student/add-student.component';
import { ListStudentsComponent } from './pages/dashboard/students/list-students/list-students.component';
import { AddStudyPlanComponent } from './pages/dashboard/study-plans/add-study-plan/add-study-plan.component';
import { ListStudyPlansComponent } from './pages/dashboard/study-plans/list-study-plans/list-study-plans.component';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'students', component: StudentsComponent, children: [
      { path: 'add', component: AddStudentComponent },
      { path: 'list', component: ListStudentsComponent }
    ]},
    { path: 'grades', component: GradesComponent },
    { path: 'study-plans', component: StudyPlansComponent, children: [
      { path: 'add-study-plan', component: AddStudyPlanComponent },
      { path: 'list-study-plans', component: ListStudyPlansComponent },
    ]},
    { path: '', redirectTo: 'students', pathMatch: 'full' }
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
