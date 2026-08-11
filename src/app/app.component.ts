import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <nav class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a routerLink="/" class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold font-display text-sm shadow-md shadow-indigo-500/30">K</span>
          <span class="text-xl font-bold font-display text-gray-900">Kubinex</span>
        </a>
        <div class="hidden md:flex gap-8 items-center">
          <button (click)="goTo('accueil')" class="text-sm font-medium text-gray-600 hover:text-purple-600 transition">Accueil</button>
          <button (click)="goTo('services')" class="text-sm font-medium text-gray-600 hover:text-purple-600 transition">Services</button>
          <button (click)="goTo('apropos')" class="text-sm font-medium text-gray-600 hover:text-purple-600 transition">À propos</button>
          <button (click)="goTo('contact')" class="text-sm font-medium text-gray-600 hover:text-purple-600 transition">Contact</button>
        </div>
        <div class="flex items-center gap-3">
          <a routerLink="/admin/login" class="hidden sm:block text-xs text-gray-400 hover:text-gray-600 transition">Admin</a>
          <button (click)="goTo('contact')"
                  class="text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-500/30 transition">
            Demander un devis
          </button>
        </div>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  constructor(private router: Router) {}

  goTo(section: string) {
    const scroll = () => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (this.router.url === '/') {
      scroll();
    } else {
      this.router.navigate(['/']).then(() => setTimeout(scroll, 100));
    }
  }
}
