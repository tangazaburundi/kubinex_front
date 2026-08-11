import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SiteBlock } from '../../models/site-block.model';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, FormsModule, RouterLink],
  template: `
    <!-- HERO -->
    <section id="accueil" class="relative bg-slate-900 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-slate-900 to-slate-950"></div>
      <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
      <div class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div class="relative max-w-6xl mx-auto px-4 pt-24 pb-20">
        <h1 class="text-4xl md:text-6xl font-display font-bold text-white leading-tight max-w-3xl mb-6">
          {{ hero?.subtitle }}
        </h1>
        <p class="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
          {{ hero?.content }}
        </p>
        <div class="flex flex-wrap gap-4 mb-14">
          <a href="#contact" class="text-sm font-semibold text-white px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition">
            Démarrer un projet
          </a>
          <a href="#services" class="text-sm font-semibold text-slate-200 px-6 py-3 rounded-lg border border-slate-500/40 hover:border-blue-400 hover:text-white transition">
            Voir nos services
          </a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
          <div *ngFor="let stat of stats">
            <p class="text-3xl font-display font-bold text-white">{{ stat.value }}</p>
            <p class="text-sm text-slate-400 mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="bg-slate-50 py-20">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold tracking-widest text-blue-600 uppercase">Nos Services</span>
          <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-3 mb-4">Des prestations complètes, de l'idée au lancement</h2>
          <p class="text-slate-500 leading-relaxed">{{ servicesIntro }}</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let s of services" class="bg-white rounded-xl border border-slate-200 p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition">
            <div class="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <ng-container [ngSwitch]="s.key">
                <svg *ngSwitchCase="'web'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                <svg *ngSwitchCase="'mobile'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                <svg *ngSwitchCase="'design'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>
                <svg *ngSwitchCase="'cloud'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
                <svg *ngSwitchCase="'conseil'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                <svg *ngSwitchCase="'maintenance'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </ng-container>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ s.name }}</h3>
            <p class="text-sm text-slate-500 mb-4 leading-relaxed">{{ s.desc }}</p>
            <ul class="space-y-2">
              <li *ngFor="let point of s.points" class="flex items-start gap-2 text-sm text-slate-600">
                <svg class="w-4 h-4 mt-0.5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- À PROPOS -->
    <section id="apropos" class="bg-white py-20">
      <div class="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span class="text-xs font-bold tracking-widest text-blue-600 uppercase">À propos</span>
          <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-3 mb-5">{{ about?.subtitle }}</h2>
          <p class="text-slate-500 leading-relaxed mb-8">{{ about?.content }}</p>
          <div class="space-y-4">
            <div *ngFor="let v of values" class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ng-container [ngSwitch]="v.key">
                  <svg *ngSwitchCase="'results'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  <svg *ngSwitchCase="'ecoute'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  <svg *ngSwitchCase="'expertise'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </ng-container>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">{{ v.title }}</h3>
                <p class="text-sm text-slate-500 mt-0.5">{{ v.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
          <h3 class="text-xl font-display font-bold mb-6">Notre approche</h3>
          <div class="space-y-6">
            <div *ngFor="let step of process" class="flex gap-4">
              <div class="flex flex-col items-center">
                <span class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold shrink-0">{{ step.num }}</span>
                <span *ngIf="step.num !== process.length" class="w-px flex-1 bg-slate-700 mt-2"></span>
              </div>
              <div class="pb-1">
                <h4 class="font-semibold text-blue-300">{{ step.title }}</h4>
                <p class="text-sm text-slate-400 mt-1 leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative bg-slate-900 overflow-hidden py-16">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-slate-900"></div>
      <div class="relative max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 class="text-2xl md:text-3xl font-display font-bold text-white">Prêt à lancer votre projet ?</h2>
          <p class="text-slate-300 mt-2">Parlons de vos objectifs et construisons ensemble une solution sur mesure.</p>
        </div>
        <a href="#contact" class="shrink-0 text-sm font-semibold text-blue-900 bg-white px-6 py-3 rounded-lg hover:bg-slate-100 transition">
          Parlons-en
        </a>
      </div>
    </section>

    <!-- BLOCS SUPPLÉMENTAIRES -->
    <section *ngFor="let b of extraBlocks" [id]="b.slug" class="bg-white py-20">
      <div class="max-w-6xl mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <span *ngIf="b.title" class="text-xs font-bold tracking-widest text-blue-600 uppercase">{{ b.title }}</span>
          <h2 *ngIf="b.subtitle" class="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-3 mb-4">{{ b.subtitle }}</h2>
          <p class="text-slate-500 leading-relaxed whitespace-pre-line">{{ b.content }}</p>
          <img *ngIf="b.imageUrl" [src]="b.imageUrl" class="mt-6 rounded-2xl w-full object-cover max-h-96" alt="">
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="bg-slate-50 py-20">
      <div class="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <div>
          <span class="text-xs font-bold tracking-widest text-blue-600 uppercase">Contact</span>
          <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-3 mb-5">Parlons de votre projet</h2>
          <p class="text-slate-500 leading-relaxed mb-8">Une idée, un besoin, une question ? Notre équipe vous répond sous 24h ouvrées.</p>
          <div class="space-y-5">
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <p class="text-xs text-slate-400 uppercase tracking-wide">Email</p>
                <p class="font-medium text-slate-800">{{ contact.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p class="text-xs text-slate-400 uppercase tracking-wide">Téléphone</p>
                <p class="font-medium text-slate-800">{{ contact.phone }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p class="text-xs text-slate-400 uppercase tracking-wide">Zone d'intervention</p>
                <p class="font-medium text-slate-800">{{ contact.address }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <form (ngSubmit)="onSubmit()" *ngIf="!sent" class="space-y-4">            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Nom</label>
                <input [(ngModel)]="form.name" name="name" required placeholder="Votre nom"
                       class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input [(ngModel)]="form.email" name="email" type="email" required placeholder="vous@exemple.com"
                       class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Sujet</label>
              <input [(ngModel)]="form.subject" name="subject" required placeholder="Objet de votre demande"
                     class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
              <textarea [(ngModel)]="form.message" name="message" rows="4" required placeholder="Décrivez votre projet..."
                        class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <p *ngIf="error" class="text-sm text-red-600">Une erreur est survenue, réessayez dans quelques instants.</p>
            <button type="submit" [disabled]="sending"
                    class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/25 transition disabled:opacity-60">
              {{ sending ? 'Envoi en cours...' : 'Envoyer le message' }}
            </button>
          </form>
          <div *ngIf="sent" class="text-center py-12">
            <div class="w-14 h-14 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-1">Message envoyé !</h3>
            <p class="text-sm text-slate-500">Merci {{ form.name }}, nous vous répondrons rapidement.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-slate-950 text-slate-400 py-14">
      <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold font-display text-sm">K</span>
            <span class="text-lg font-bold font-display text-white">Kubinex</span>
          </div>
          <p class="text-sm leading-relaxed max-w-sm">{{ hero?.content }}</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Navigation</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#accueil" class="hover:text-white transition">Accueil</a></li>
            <li><a href="#services" class="hover:text-white transition">Services</a></li>
            <li><a href="#apropos" class="hover:text-white transition">À propos</a></li>
            <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Contact</h4>
          <ul class="space-y-2 text-sm">
            <li>{{ contact.email }}</li>
            <li>{{ contact.phone }}</li>
            <li>{{ contact.address }}</li>
          </ul>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p>© 2026 Kubinex. Tous droits réservés.</p>
        <a routerLink="/admin/login" class="text-slate-600 hover:text-slate-400 transition">Espace admin</a>
      </div>
    </footer>
  `,
})
export class HomeComponent implements OnInit {
  blocks: SiteBlock[] = [];
  sent = false;
  sending = false;
  error = false;
  form = { name: '', email: '', subject: '', message: '' };

  stats = [
    { value: '10+', label: 'Projets livrés' },
    { value: '1', label: "Année d'expérience" },
    { value: '5', label: 'Experts dédiés' },
    { value: '98%', label: 'Clients satisfaits' },
  ];

  services = [
    { key: 'web', name: 'Développement Web', desc: 'Sites vitrine, plateformes SaaS et APIs sur mesure, robustes et performants.',
      points: ['Sites vitrine & e-commerce', 'Plateformes SaaS & CRM', 'APIs & intégrations', 'Sécurité & performance'] },
    { key: 'mobile', name: 'Applications Mobiles', desc: 'Applications iOS & Android modernes, pensées pour vos utilisateurs.',
      points: ['iOS & Android', 'Flutter & React Native', 'Applications hybrides', 'Publication App Store & Play'] },
    { key: 'design', name: 'UI/UX Design', desc: 'Des interfaces élégantes et des parcours utilisateurs mémorables.',
      points: ['Design d\'interfaces (UI)', 'Parcours utilisateur (UX)', 'Design systems', 'Prototypage & tests utilisateurs'] },
    { key: 'cloud', name: 'Cloud & DevOps', desc: 'Une infrastructure fiable, scalable et déployée en continu.',
      points: ['Hébergement cloud', 'CI/CD automatisé', 'Monitoring & supervision', 'Optimisation des coûts'] },
    { key: 'conseil', name: 'Conseil & Stratégie', desc: 'Un accompagnement sur mesure pour accélérer votre transformation digitale.',
      points: ['Audit technique', 'Feuille de route produit', 'Transformation digitale', 'Formation des équipes'] },
    { key: 'maintenance', name: 'Maintenance & Support', desc: 'Vos plateformes évoluent et restent performantes dans la durée.',
      points: ['Support & SAV', 'Évolutions & correctifs', 'Suivi de performance', 'Contrats de maintenance'] },
  ];

  values = [
    { key: 'results', title: 'Orienté résultats', desc: 'Chaque décision est guidée par vos objectifs business.' },
    { key: 'ecoute', title: 'Écoute & transparence', desc: 'Un interlocuteur unique et une communication claire à chaque étape.' },
    { key: 'expertise', title: 'Expertise technique', desc: 'Une équipe passionnée, à jour sur les dernières technologies.' },
  ];

  process = [
    { num: 1, title: 'Découverte & cadrage', desc: 'Analyse de vos besoins, de votre marché et de vos objectifs.' },
    { num: 2, title: 'Design & prototypes', desc: 'Maquettes et parcours validés avant le moindre développement.' },
    { num: 3, title: 'Développement & tests', desc: 'Méthode agile, revues régulières et tests continus.' },
    { num: 4, title: 'Lancement & accompagnement', desc: 'Mise en production, formation et support dans la durée.' },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getPublicSite().subscribe(b => this.blocks = b);
  }

  get hero(): SiteBlock | undefined { return this.block('hero'); }
  get about(): SiteBlock | undefined { return this.block('about'); }
  get servicesBlock(): SiteBlock | undefined { return this.block('services'); }
  get servicesIntro(): string {
    return this.servicesBlock?.content?.split('\n')[0] ?? '';
  }

  get extraBlocks(): SiteBlock[] {
    const known = ['hero', 'services', 'about', 'contact'];
    return this.blocks.filter(b => !known.includes(b.slug));
  }
  get contact(): { email: string; phone: string; address: string } {
    const c = this.block('contact')?.content || '';
    const parts = c.split('—').map(p => p.trim());
    return {
      email: 'contactkubinex@gmail.com',
      phone: '+33 7 80 73 93 84',
      address: parts.slice(2).join(' — ') || '100% en ligne, partout dans le monde',
    };
  }

  private block(slug: string): SiteBlock | undefined {
    return this.blocks.find(b => b.slug === slug);
  }

  onSubmit() {
    this.sending = true;
    this.error = false;
    this.api.sendContact(this.form).subscribe({
      next: () => { this.sending = false; this.sent = true; },
      error: () => { this.sending = false; this.error = true; },
    });
  }
}
