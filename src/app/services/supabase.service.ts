import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  async signIn(email: string, password: string): Promise<any> {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut(): Promise<any> {
    return this.supabase.auth.signOut();
  }

  getUserPromise(): Promise<any> {
    return this.supabase.auth.getUser();
  }

  async addStudent(student: any): Promise<any> {
    return this.supabase.from('students').insert([student]);
  }

  async getStudents(): Promise<any> {
    const response = await this.supabase.from('students').select('*').order('creado_en', { ascending: false });
    console.log('Supabase getStudents response:', response);
    return response;
  }

  async deleteStudent(id: string): Promise<any> {
    return this.supabase.from('students').delete().eq('id', id);
  }
}
