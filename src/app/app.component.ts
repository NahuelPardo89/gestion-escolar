import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gestion-escolar';
  userEmail: string | null = null;
  loading = true;

  constructor(private supabase: SupabaseService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.refreshUser();
    });
  }

  async refreshUser() {
    this.loading = true;
    try {
      const { data } = await this.supabase.getUserPromise();
      this.userEmail = data?.user?.email || null;
    } catch {
      this.userEmail = null;
    } finally {
      this.loading = false;
    }
  }

  async logout() {
    await this.supabase.signOut();
    this.userEmail = null;
    this.router.navigate(['/']);
  }
}
