import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';
import { StudyPlan } from 'src/app/interfaces/studyplan';

@Component({
  selector: 'app-list-study-plans',
  templateUrl: './list-study-plans.component.html',
  styleUrls: ['./list-study-plans.component.scss']
})
export class ListStudyPlansComponent implements OnInit {
  studyPlans: StudyPlan[] = [
    { id: '1', name: 'Plan A', resolution: 'Res-001', national_validity: 'Sí', orientation: 'Científica', is_active: true, created_at: '2025-01-01' },
    { id: '2', name: 'Plan B', resolution: 'Res-002', national_validity: 'No', orientation: 'Técnica', is_active: true, created_at: '2025-01-02' }
  ];
  paginatedStudyPlans = this.studyPlans;
  loading = false;
  error: string | null = null;
  showModal = false;
  studyPlanToDelete: StudyPlan | null = null;

  constructor(private supabase: SupabaseService) {}

  ngOnInit() {
    this.loading = true;
    this.error = null;

    this.supabase.getStudyPlans().then(response => {
      if (response.error) {
        this.error = response.error.message;
      } else {
        this.studyPlans = response.data || [];
        this.paginatedStudyPlans = [...this.studyPlans];
      }
    }).catch(err => {
      this.error = 'Error inesperado al obtener planes de estudio';
    }).finally(() => {
      this.loading = false;
    });
  }

  sortTable(column: keyof typeof this.studyPlans[0]) {
    this.studyPlans.sort((a, b) => {
      const valueA = a[column]?.toString().toLowerCase() || '';
      const valueB = b[column]?.toString().toLowerCase() || '';
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    this.paginatedStudyPlans = [...this.studyPlans];
  }

  editStudyPlan(plan: any) {
    console.log('Edit study plan:', plan);
  }

  confirmDelete(plan: any) {
    this.studyPlanToDelete = plan;
    this.showModal = true;
  }

  cancelDelete() {
    this.showModal = false;
    this.studyPlanToDelete = null;
  }

  async deleteStudyPlan() {
    if (!this.studyPlanToDelete) return;
    this.loading = true;
    try {
      const { error } = await this.supabase.deleteStudyPlan(this.studyPlanToDelete.id);
      if (error) {
        this.error = error.message || 'Error al desactivar el plan de estudio';
      } else {
        this.studyPlans = this.studyPlans.filter(plan => plan.id !== this.studyPlanToDelete?.id);
        this.paginatedStudyPlans = [...this.studyPlans];
        this.cancelDelete();
      }
    } catch (err: any) {
      this.error = err.message || 'Error inesperado';
    } finally {
      this.loading = false;
    }
  }
}
