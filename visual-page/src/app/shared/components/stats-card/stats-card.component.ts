import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type TrendDirection = 'up' | 'down' | 'neutral';
export type StatsCardColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-stats-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.sass']
})
export class StatsCardComponent {
  // Inputs
  title = input<string>('');
  value = input<string | number>('0');
  icon = input<string>('');
  color = input<StatsCardColor>('primary');
  trend = input<number | null>(null);
  trendDirection = input<TrendDirection>('neutral');
  subtitle = input<string>('');
  loading = input<boolean>(false);

  // Computed
  readonly trendIcon = computed(() => {
    switch (this.trendDirection()) {
      case 'up':
        return 'trending_up';
      case 'down':
        return 'trending_down';
      default:
        return 'remove';
    }
  });

  readonly trendText = computed(() => {
    const trend = this.trend();
    if (trend === null) return '';
    const direction = this.trendDirection();
    const prefix = direction === 'up' ? '+' : '';
    return `${prefix}${trend}%`;
  });
}
