import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  student = {
    name: '',
    last_name: '',
    dni: '',
    birth_date: '',
    phone: '',
    address: ''
  };
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private supabase: SupabaseService) {}

  async addStudent(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    this.error = null;
    this.success = null;
    try {
      const { error } = await this.supabase.addStudent({
        ...this.student,
        birth_date: this.student.birth_date ? new Date(this.student.birth_date) : null
      });
      if (error) {
        this.error = error.message || 'Error al guardar el estudiante';
      } else {
        this.success = 'Estudiante agregado correctamente';
        form.resetForm();
      }
    } catch (err: any) {
      this.error = err.message || 'Error inesperado';
    } finally {
      this.loading = false;
    }
  }
}
