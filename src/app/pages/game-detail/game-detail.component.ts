import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SteamService, SteamAppDetails } from '../../services/steam.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
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
    window.open(imageUrl, '_blank');
  }
}


