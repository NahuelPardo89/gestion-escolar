import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error: string | null = null;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async login() {
    this.loading = true;
    this.error = null;
    try {
      const { error } = await this.supabase.signIn(this.email, this.password);
      if (error) {
        this.error = error.message || 'Error al iniciar sesión';
      } else {
        this.router.navigate(['/dashboard']);
      }
    } catch (err: any) {
      this.error = err.message || 'Error inesperado';
    } finally {
      this.loading = false;
    }
  }
}
