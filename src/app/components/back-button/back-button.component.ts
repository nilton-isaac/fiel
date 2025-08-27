import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a 
      [routerLink]="backRoute" 
      class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-lg transition-all duration-300 hover:scale-105 group text-slate-200"
    >
      <span class="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
        arrow_back
      </span>
      <span>{{ label }}</span>
    </a>
  `,
  styles: []
})
export class BackButtonComponent {
  @Input() backRoute: string = '/';
  @Input() label: string = 'Voltar';
}
