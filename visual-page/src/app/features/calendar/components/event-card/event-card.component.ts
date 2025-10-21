import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  type: 'meeting' | 'event' | 'deadline' | 'training' | 'presentation' | 'maintenance';
  priority: 'low' | 'normal' | 'high';
  attendees?: string[];
}

@Component({
  selector: 'app-event-card',
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.sass']
})
export class EventCardComponent {
  @Input() event!: CalendarEvent;
  @Output() eventClick = new EventEmitter<CalendarEvent>();

  onEventClick(): void {
    this.eventClick.emit(this.event);
  }

  getTimeRange(): string {
    const start = new Date(this.event.startDate);
    const end = new Date(this.event.endDate);

    const startTime = start.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const endTime = end.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    return `${startTime} - ${endTime}`;
  }

  getEventDate(): string {
    const date = new Date(this.event.startDate);
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  isToday(): boolean {
    const today = new Date();
    const eventDate = new Date(this.event.startDate);

    return today.toDateString() === eventDate.toDateString();
  }

  isPast(): boolean {
    return new Date(this.event.endDate) < new Date();
  }

  getTypeClass(): string {
    return `event-type-${this.event.type}`;
  }

  getPriorityClass(): string {
    return `priority-${this.event.priority}`;
  }

  getDuration(): string {
    const start = new Date(this.event.startDate);
    const end = new Date(this.event.endDate);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }
}
