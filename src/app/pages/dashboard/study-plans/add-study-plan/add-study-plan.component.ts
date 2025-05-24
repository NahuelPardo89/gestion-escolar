import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-add-study-plan',
  templateUrl: './add-study-plan.component.html',
  styleUrls: ['./add-study-plan.component.scss']
})
export class AddStudyPlanComponent {
  studyPlan = {
    name: '',
    resolution: '',
    national_validity: '',
    orientation: ''
  };
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private supabase: SupabaseService) {}

  addStudyPlan(form: any) {
    if (form.valid) {
      this.loading = true;
      this.error = null;
      this.success = null;

      this.supabase.addStudyPlan(this.studyPlan).then(response => {
        if (response.error) {
          this.error = response.error.message;
        } else {
          this.success = 'Plan de estudio agregado exitosamente';
          form.resetForm();
        }
      }).catch(err => {
        this.error = 'Error inesperado al agregar plan de estudio';
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
