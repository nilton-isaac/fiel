import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NgFor, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SteamService, SteamApp } from '../../services/steam.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgStyle, RouterLink, GameCardComponent, ScrollRevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private steam: SteamService) {}

  protected readonly news = signal<any[]>([]);
  protected readonly trending = signal<SteamApp[]>([]);

  ngOnInit(): void {
    this.loadTrending();
    this.loadNews();
  }

  private loadTrending(): void {
    this.steam.getFeaturedCategories().subscribe({
      next: (data: any) => {
        // Try to get games from different featured categories
        const categories = ['top_sellers', 'specials', 'popular_new_releases', 'coming_soon', 'new_releases'];
        let games: SteamApp[] = [];
        
        for (const category of categories) {
          if (data[category]?.items?.length > 0) {
            games = data[category].items.slice(0, 8);
            break;
          }
        }
        
        // Fallback to some popular games if no featured data
        if (games.length === 0) {
          games = [
            { appid: 1086940, name: 'Baldur\'s Gate 3' },
            { appid: 1172470, name: 'Apex Legends' },
            { appid: 730, name: 'Counter-Strike 2' },
            { appid: 1091500, name: 'Cyberpunk 2077' },
            { appid: 1245620, name: 'Elden Ring' },
            { appid: 1142710, name: 'Mass Effect Legendary Edition' },
            { appid: 1234567, name: 'Red Dead Redemption 2' },
            { appid: 2345678, name: 'The Witcher 3: Wild Hunt' }
          ];
        }
        this.trending.set(games);
      },
      error: () => {
        // Fallback data on error
        const fallbackGames: SteamApp[] = [
          { appid: 1086940, name: 'Baldur\'s Gate 3' },
          { appid: 1172470, name: 'Apex Legends' },
          { appid: 730, name: 'Counter-Strike 2' },
          { appid: 1091500, name: 'Cyberpunk 2077' },
          { appid: 1245620, name: 'Elden Ring' },
          { appid: 1142710, name: 'Mass Effect Legendary Edition' },
          { appid: 1234567, name: 'Red Dead Redemption 2' },
          { appid: 2345678, name: 'The Witcher 3: Wild Hunt' }
        ];
        this.trending.set(fallbackGames);
      }
    });
  }

  private loadNews(): void {
    // Load news from a popular game (Baldur's Gate 3)
    this.steam.getNewsForApp(1086940, 6).subscribe({
      next: (newsItems) => {
        this.news.set(newsItems || []);
      },
      error: () => {
        // Fallback news data
        const fallbackNews = [
          {
            title: 'Novos jogos chegam à Steam',
            contents: 'Descubra as últimas novidades e lançamentos da plataforma.',
            author: 'Steam',
            feedlabel: 'Notícias',
            url: 'https://store.steampowered.com'
          },
          {
            title: 'Ofertas especiais da semana',
            contents: 'Confira os descontos imperdíveis em jogos populares.',
            author: 'Steam',
            feedlabel: 'Ofertas',
            url: 'https://store.steampowered.com'
          },
          {
            title: 'Atualizações e patches',
            contents: 'As últimas correções e melhorias em seus jogos favoritos.',
            author: 'Steam',
            feedlabel: 'Atualizações',
            url: 'https://store.steampowered.com'
          }
        ];
        this.news.set(fallbackNews);
      }
    });
  }
}


