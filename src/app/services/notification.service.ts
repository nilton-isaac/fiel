import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  show(message: string): void {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className =
      'fixed bottom-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded shadow-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

