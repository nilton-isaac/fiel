import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { LibraryComponent } from './pages/library/library.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: 'library', component: LibraryComponent },
  { path: '**', redirectTo: '' }
];
