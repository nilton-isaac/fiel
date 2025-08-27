import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  route?: string;
  action?: () => void;
  badge?: string;
}

@Component({
  selector: 'app-tools-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
      <h3 class="text-2xl font-bold text-white mb-6">Ferramentas</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          *ngFor="let tool of tools()" 
          class="group p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-space cursor-pointer"
          (click)="tool.route ? router.navigate([tool.route]) : tool.action?.()"
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="material-symbols-outlined text-2xl text-yellow-400 group-hover:scale-110 transition-transform duration-300">
              {{ tool.icon }}
            </span>
            <div class="flex-1">
              <h4 class="font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">
                {{ tool.name }}
              </h4>
              <p class="text-sm text-white/70">{{ tool.description }}</p>
            </div>
            <span *ngIf="tool.badge" class="px-2 py-1 text-xs bg-yellow-400/20 text-yellow-400 rounded-full border border-yellow-400/30">
              {{ tool.badge }}
            </span>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-xs text-white/50">Clique para usar</span>
            <span class="material-symbols-outlined text-sm text-white/40 group-hover:text-yellow-400 transition-colors duration-300">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ToolsPanelComponent {
  protected readonly router = inject(Router);
  protected readonly tools = signal<Tool[]>([
    {
      id: 'library',
      name: 'Minha Biblioteca',
      description: 'Gerencie seus jogos instalados e favoritos',
      icon: 'library_books',
      route: '/library',
      badge: 'Em breve'
    },
    {
      id: 'achievements',
      name: 'Conquistas',
      description: 'Visualize suas conquistas e estatísticas',
      icon: 'emoji_events',
      action: () => this.showComingSoon('Conquistas')
    },
    {
      id: 'friends',
      name: 'Amigos Online',
      description: 'Veja quem está jogando agora',
      icon: 'group',
      action: () => this.showComingSoon('Sistema de Amigos')
    },
    {
      id: 'workshop',
      name: 'Workshop',
      description: 'Mods e conteúdo da comunidade',
      icon: 'build',
      action: () => this.showComingSoon('Workshop')
    },
    {
      id: 'trading',
      name: 'Trocas',
      description: 'Troque itens com outros jogadores',
      icon: 'swap_horiz',
      action: () => this.showComingSoon('Sistema de Trocas')
    },
    {
      id: 'market',
      name: 'Mercado',
      description: 'Compre e venda itens do jogo',
      icon: 'store',
      action: () => this.showComingSoon('Mercado')
    }
  ]);

  private showComingSoon(feature: string): void {
    alert(`${feature} estará disponível em breve! 🚀`);
  }
}
