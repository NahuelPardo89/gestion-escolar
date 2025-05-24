import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error: string | null = null;
  showModal = false;
  studentToDelete: Student | null = null;

  // Pagination and sorting properties
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 15;
  totalPages = 1;
  paginatedStudents: Student[] = [];

  constructor(private supabase: SupabaseService) {}

  ngOnInit() {
    setTimeout(() => this.getStudents(), 500); // Espera por si la inserción es asíncrona
  }

  async getStudents() {
    this.loading = true;
    this.error = null;
    try {
      const response = await this.supabase.getStudents();
      // Debug: mostrar la respuesta de supabase
      console.log('Supabase getStudents response:', response);
      const { data, error } = response;
      if (error) {
        this.error = error.message || 'Error al obtener estudiantes';
      } else {
        this.students = Array.isArray(data)
          ? data.map(student => ({
              id: student.id,
              name: student.name,
              lastName: student.last_name, // Map database field to interface field
              dni: student.dni,
              birthDate: student.birth_date, // Map database field to interface field
              phone: student.phone,
              address: student.address,
            }))
          : [];
        if (!this.students.length) {
          this.error = 'No hay estudiantes registrados.';
        }
        this.updatePagination(); // Actualiza la paginación al obtener estudiantes
      }
    } catch (err: any) {
      this.error = err.message || 'Error inesperado';
    } finally {
      this.loading = false;
    }
  }

  // Filter, pagination, and sorting methods
  filterStudents() {
    const filtered = this.students.filter(student =>
      Object.values(student).some(value =>
        value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.updatePagination(filtered);
  }

  updatePagination(filteredStudents: Student[] = this.students) {
    this.totalPages = Math.ceil(filteredStudents.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedStudents = filteredStudents.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Adjusted column order to display 'Apellido' before 'Nombre' and added sorting functionality for 'Apellido'.
  sortTable(column: keyof Student) {
    this.students.sort((a, b) => {
      const valueA = a[column]?.toString().toLowerCase() || '';
      const valueB = b[column]?.toString().toLowerCase() || '';
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    this.updatePagination();
  }

  confirmDelete(student: Student) {
    this.studentToDelete = student;
    this.showModal = true;
  }

  cancelDelete() {
    this.showModal = false;
    this.studentToDelete = null;
  }

  async deleteStudent() {
    if (!this.studentToDelete) return;
    this.loading = true;
    try {
      const { error } = await this.supabase.deleteStudent(this.studentToDelete.id?.toString() || '');
      if (error) {
        this.error = error.message || 'Error al borrar estudiante';
      } else {
        await this.getStudents();
        this.cancelDelete();
      }
    } catch (err: any) {
      this.error = err.message || 'Error inesperado';
    } finally {
      this.loading = false;
    }
  }

  editStudent(student: Student) {
    console.log('Edit student:', student);
  }
}
