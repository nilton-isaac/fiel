import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SteamService, SteamAppDetails } from '../../services/steam.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, HeaderComponent, ScrollRevealDirective],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly steam = inject(SteamService);

  protected readonly appid = signal<number>(0);
  protected readonly detail = signal<SteamAppDetails['data'] | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<boolean>(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.appid.set(id);
    
    if (!id) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    this.steam.getAppDetails(id).subscribe({
      next: (response) => {
        const appKey = id.toString();
        const appData = response[appKey];
        
        if (appData?.success && appData.data) {
          this.detail.set(appData.data);
        } else {
          this.error.set(true);
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  protected openImage(imageUrl: string): void {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Fallback para imagem padrão quando houver erro
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE1MCAxMDBIMjUwTDIwMCAxNTBaIiBmaWxsPSIjNjQ3NDhiIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pgo8L3N2Zz4K';
    img.alt = 'Imagem não disponível';
  }
}


