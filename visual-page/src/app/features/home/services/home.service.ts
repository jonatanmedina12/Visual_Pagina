import { Injectable, signal } from '@angular/core';

export interface Stats {
  users: number;
  projects: number;
  satisfaction: number;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly stats = signal<Stats>({
    users: 1000,
    projects: 500,
    satisfaction: 98,
  });

  constructor() {}

  getStats() {
    return this.stats.asReadonly();
  }

  updateStats(newStats: Stats) {
    this.stats.set(newStats);
  }
}
