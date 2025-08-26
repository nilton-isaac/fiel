import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  standalone: true,
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input() cover = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() tag = '';
  @Input() price = '';
}


