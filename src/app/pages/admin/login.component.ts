import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center px-4">
      <form (ngSubmit)="login()" class="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-5">
        <h1 class="text-2xl font-bold text-center text-gray-800">Administration</h1>
        <p *ngIf="error" class="text-red-600 text-sm text-center">{{ error }}</p>
        <input [(ngModel)]="username" name="username" required placeholder="Identifiant"
               class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400">
        <input [(ngModel)]="password" name="password" type="password" required placeholder="Mot de passe"
               class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400">
        <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Se connecter
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', (res as any).token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => this.error = 'Identifiants incorrects',
    });
  }
}
