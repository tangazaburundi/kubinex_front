import { Component, HostListener, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SiteBlock } from '../../models/site-block.model';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
    <div class="max-w-5xl mx-auto px-4 py-10">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button (click)="logout()" class="text-sm text-gray-500 hover:text-red-600 transition">Déconnexion</button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Nouveau bloc</h2>

        <div class="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">Slug (identifiant)</label>
            <input [(ngModel)]="newBlock.slug" placeholder="ex: tarifs" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-500 mb-1">Ordre</label>
            <input [(ngModel)]="newBlock.sortOrder" type="number" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none">
          </div>
        </div>

        <label class="block text-sm font-medium text-gray-500 mb-1">Titre</label>
        <input [(ngModel)]="newBlock.title" class="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 outline-none">

        <label class="block text-sm font-medium text-gray-500 mb-1">Sous-titre</label>
        <input [(ngModel)]="newBlock.subtitle" class="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 outline-none">

        <label class="block text-sm font-medium text-gray-500 mb-1">Contenu</label>
        <textarea [(ngModel)]="newBlock.content" rows="4" class="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"></textarea>

        <button (click)="create()" class="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
          Créer le bloc
        </button>
      </div>

      <div class="space-y-6">
        <div *ngFor="let block of blocks" class="bg-white rounded-xl shadow-sm border p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-700 capitalize">{{ block.slug }}</h2>
              <p class="text-xs text-gray-400">slug: {{ block.slug }}</p>
            </div>
            <button (click)="requestRemove(block)" class="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Supprimer
            </button>
          </div>

          <label class="block text-sm font-medium text-gray-500 mb-1">Titre</label>
          <input [(ngModel)]="block.title" class="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 outline-none">

          <label class="block text-sm font-medium text-gray-500 mb-1">Sous-titre</label>
          <input [(ngModel)]="block.subtitle" class="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 outline-none">

          <label class="block text-sm font-medium text-gray-500 mb-1">Contenu</label>
          <textarea [(ngModel)]="block.content" rows="4" class="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400 outline-none"></textarea>

          <label class="block text-sm font-medium text-gray-500 mb-1">Image URL</label>
          <div class="flex gap-2 mb-3">
            <input [(ngModel)]="block.imageUrl" class="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none">
            <input type="file" (change)="uploadImage(block, $event)" class="text-sm">
          </div>

          <label class="block text-sm font-medium text-gray-500 mb-1">Extra (JSON)</label>
          <input [(ngModel)]="block.extra" class="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-indigo-400 outline-none">

          <button (click)="save(block)" class="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div *ngIf="modal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" (click)="closeModal()"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" role="dialog" aria-modal="true">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
               [class]="modal.danger ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'">
            <svg *ngIf="modal.danger" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <svg *ngIf="!modal.danger" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-800 mb-1">{{ modal.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{{ modal.message }}</p>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <ng-container *ngIf="modal.kind === 'confirm'; else infoOnly">
            <button (click)="closeModal()" autofocus class="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition">Annuler</button>
            <button (click)="confirmAction()" class="px-5 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition">{{ modal.confirmLabel }}</button>
          </ng-container>
          <ng-template #infoOnly>
            <button (click)="closeModal()" autofocus class="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">OK</button>
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  blocks: SiteBlock[] = [];
  newBlock: SiteBlock = { slug: '', title: '', subtitle: '', content: '', sortOrder: 0 };

  modal: { kind: 'confirm' | 'info'; title: string; message: string; confirmLabel?: string; danger?: boolean } | null = null;
  private pendingAction: (() => void) | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeModal();
  }

  load() {
    this.api.getAdminSite().subscribe(b => this.blocks = b);
  }

  create() {
    if (!this.newBlock.slug?.trim() || !this.newBlock.title?.trim()) {
      this.openModal('Champs manquants', 'Le slug et le titre sont obligatoires pour créer un bloc.', true);
      return;
    }
    this.api.createBlock(this.newBlock).subscribe({
      next: (created) => {
        this.newBlock = { slug: '', title: '', subtitle: '', content: '', sortOrder: this.blocks.length };
        this.load();
        this.openModal('Bloc créé', `Le bloc « ${created.slug} » a été créé.`);
      },
      error: (err: any) => this.openModal('Erreur de création', `Impossible de créer le bloc. ${this.errorMsg(err)}`, true),
    });
  }

  requestRemove(block: SiteBlock) {
    this.pendingAction = () => this.remove(block);
    this.openModal('Supprimer le bloc', `Le bloc « ${block.slug} » et son contenu seront définitivement supprimés.`, true, 'Supprimer');
  }

  remove(block: SiteBlock) {
    if (block.id == null) return;
    this.api.deleteBlock(block.id).subscribe({
      next: () => {
        this.load();
        this.openModal('Bloc supprimé', `Le bloc « ${block.slug} » a été supprimé.`);
      },
      error: (err: any) => this.openModal('Erreur de suppression', `Impossible de supprimer le bloc « ${block.slug} ». ${this.errorMsg(err)}`, true),
    });
  }

  save(block: SiteBlock) {
    if (block.id == null) return;
    this.api.updateBlock(block.id, block).subscribe({
      next: () => this.openModal('Bloc sauvegardé', `Le bloc « ${block.slug} » a bien été enregistré.`),
      error: (err: any) => this.openModal('Erreur de sauvegarde', `Impossible d'enregistrer le bloc « ${block.slug} ». ${this.errorMsg(err)}`, true),
    });
  }

  uploadImage(block: SiteBlock, event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.api.uploadImage(file).subscribe(url => block.imageUrl = url);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }

  private openModal(title: string, message: string, danger = false, confirmLabel?: string) {
    this.modal = {
      kind: confirmLabel ? 'confirm' : 'info',
      title,
      message,
      confirmLabel,
      danger,
    };
  }

  confirmAction() {
    this.pendingAction?.();
    this.pendingAction = null;
    this.modal = null;
  }

  closeModal() {
    this.pendingAction = null;
    this.modal = null;
  }

  private errorMsg(err: any): string {
    if (!err) return '';
    if (err.status) return `(HTTP ${err.status})`;
    return err.message || '';
  }
}
