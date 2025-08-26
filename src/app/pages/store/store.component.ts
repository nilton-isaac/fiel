import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SteamService, SteamApp } from '../../services/steam.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {
  constructor(private steam: SteamService) {}

  protected readonly allApps = signal<SteamApp[]>([]);
  protected readonly query = signal<string>('');
  protected readonly page = signal<number>(1);
  protected readonly pageSize = 20;

  protected readonly filtered = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return this.allApps();
    return this.allApps().filter(app => 
      app.name.toLowerCase().includes(q)
    );
  });

  protected readonly totalPages = computed(() => 
    Math.ceil(this.filtered().length / this.pageSize)
  );

  protected readonly paged = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  ngOnInit(): void {
    this.loadApps();
  }

  private loadApps(): void {
    this.steam.getAppList().subscribe({
      next: (apps) => {
        this.allApps.set(apps || []);
      },
      error: () => {
        // Fallback data
        const fallbackApps: SteamApp[] = [
          { appid: 1086940, name: 'Baldur\'s Gate 3' },
          { appid: 1172470, name: 'Apex Legends' },
          { appid: 730, name: 'Counter-Strike 2' },
          { appid: 1091500, name: 'Cyberpunk 2077' },
          { appid: 1245620, name: 'Elden Ring' },
          { appid: 1142710, name: 'Mass Effect Legendary Edition' },
          { appid: 1234567, name: 'Red Dead Redemption 2' },
          { appid: 2345678, name: 'The Witcher 3: Wild Hunt' }
        ];
        this.allApps.set(fallbackApps);
      }
    });
  }

  protected goTo(pageNum: number): void {
    if (pageNum >= 1 && pageNum <= this.totalPages()) {
      this.page.set(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}


