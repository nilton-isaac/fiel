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
      class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 hover:scale-105 group"
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
