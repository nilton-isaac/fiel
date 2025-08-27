import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header />
    <div class="p-8 text-white">
      <h1 class="text-2xl font-bold mb-4">Minha Biblioteca</h1>
      <p>Em breve você poderá gerenciar seus jogos aqui.</p>
    </div>
  `,
})
export class LibraryComponent {}
