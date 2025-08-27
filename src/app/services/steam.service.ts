import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SteamApp {
  appid: number;
  name: string;
}

export interface SteamAppDetails {
  success: boolean;
  data?: {
    name: string;
    header_image: string;
    short_description: string;
    about_the_game: string;
    is_free: boolean;
    price_overview?: {
      final: number;
      final_formatted: string;
      discount_percent: number;
    };
    website?: string;
    release_date?: {
      date: string;
    };
    genres?: Array<{ id: string; description: string }>;
    categories?: Array<{ id: string; description: string }>;
    platforms?: {
      windows: boolean;
      mac: boolean;
      linux: boolean;
    };
    metacritic?: {
      score: number;
      url: string;
    };
    background: string;
    movies?: Array<{
      id: number;
      name: string;
      thumbnail: string;
      webm: { [key: string]: string };
      mp4: { [key: string]: string };
    }>;
    screenshots?: Array<{
      id: number;
      path_thumbnail: string;
      path_full: string;
    }>;
  };
}

interface AppListResponse {
  applist: {
    apps: SteamApp[];
  };
}

interface FeaturedCategory {
  items: SteamApp[];
}

export interface FeaturedCategoriesResponse {
  top_sellers: FeaturedCategory;
  specials: FeaturedCategory;
  popular_new_releases: FeaturedCategory;
  coming_soon: FeaturedCategory;
  new_releases: FeaturedCategory;
  [key: string]: FeaturedCategory;
}

@Injectable({ providedIn: 'root' })
export class SteamService {
  private readonly http = inject(HttpClient);

  getAppList() {
    return this.http.get<AppListResponse>('/steamapi/ISteamApps/GetAppList/v2/')
      .pipe(map(r => r.applist.apps));
  }

  getAppDetails(appid: number) {
    return this.http.get<{ [key: string]: SteamAppDetails }>(`/storeapi/api/appdetails?appids=${appid}&cc=br&l=portuguese`);
  }

  getFeaturedCategories(): Observable<FeaturedCategoriesResponse> {
    return this.http.get<FeaturedCategoriesResponse>(
      '/storeapi/api/featuredcategories?cc=br&l=portuguese'
    );
  }

  getNewsForApp(appid: number, count = 5) {
    return this.http
      .get<{ appnews: { newsitems: any[] } }>(
        `/steamapi/ISteamNews/GetNewsForApp/v2/?appid=${appid}&count=${count}&l=portuguese`
      )
      .pipe(map(r => r.appnews.newsitems));
  }
}


