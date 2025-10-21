import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent, CalendarEvent } from '../event-card/event-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-view',
  imports: [CommonModule, EventCardComponent, FormsModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.sass']
})
export class CalendarViewComponent {
  @Input() set events(value: CalendarEvent[]) {
    this.allEvents.set(value);
  }
  @Input() loading = false;
  @Output() eventClick = new EventEmitter<CalendarEvent>();

  protected allEvents = signal<CalendarEvent[]>([]);
  protected searchTerm = signal<string>('');
  protected selectedFilter = signal<'all' | 'today' | 'upcoming' | 'past'>('all');
  protected selectedType = signal<'all' | 'meeting' | 'event' | 'deadline' | 'training' | 'presentation' | 'maintenance'>('all');
  protected selectedPriority = signal<'all' | 'high' | 'normal' | 'low'>('all');

  protected filteredEvents = computed(() => {
    let events = this.allEvents();

    // Filter by search term
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      events = events.filter(e =>
        e.title.toLowerCase().includes(term) ||
        (e.description && e.description.toLowerCase().includes(term)) ||
        (e.location && e.location.toLowerCase().includes(term))
      );
    }

    // Filter by date status
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (this.selectedFilter() === 'today') {
      events = events.filter(e => {
        const eventDate = new Date(e.startDate);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === today.getTime();
      });
    } else if (this.selectedFilter() === 'upcoming') {
      events = events.filter(e => new Date(e.startDate) > now);
    } else if (this.selectedFilter() === 'past') {
      events = events.filter(e => new Date(e.endDate) < now);
    }

    // Filter by type
    if (this.selectedType() !== 'all') {
      events = events.filter(e => e.type === this.selectedType());
    }

    // Filter by priority
    if (this.selectedPriority() !== 'all') {
      events = events.filter(e => e.priority === this.selectedPriority());
    }

    // Sort by start date
    return events.sort((a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  });

  protected todayCount = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.allEvents().filter(e => {
      const eventDate = new Date(e.startDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    }).length;
  });

  onEventClick(event: CalendarEvent): void {
    this.eventClick.emit(event);
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onFilterChange(filter: 'all' | 'today' | 'upcoming' | 'past'): void {
    this.selectedFilter.set(filter);
  }

  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedType.set(target.value as 'all' | 'meeting' | 'event' | 'deadline' | 'training' | 'presentation' | 'maintenance');
  }

  onPriorityChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedPriority.set(target.value as 'all' | 'high' | 'normal' | 'low');
  }
}
