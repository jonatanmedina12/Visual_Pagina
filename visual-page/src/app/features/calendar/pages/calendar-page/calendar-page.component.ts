import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { CalendarViewComponent } from '../../components/calendar-view/calendar-view.component';
import { CalendarService } from '../../services/calendar.service';
import { CalendarEvent } from '../../components/event-card/event-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-page',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    CalendarViewComponent
  ],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.sass']
})
export class CalendarPageComponent {
  private calendarService = inject(CalendarService);
  private router = inject(Router);

  // Exponer los datos del servicio
  protected readonly events = this.calendarService.allEvents;
  protected readonly isLoading = this.calendarService.isLoading;
  protected readonly todayEvents = this.calendarService.todayEvents;
  protected readonly upcomingEvents = this.calendarService.upcomingEvents;

  onEventClick(event: CalendarEvent): void {
    console.log('Event clicked:', event);
    // Aquí podrías navegar a una vista detallada del evento
    // this.router.navigate(['/calendar', event.id]);
  }

  async refreshEvents(): Promise<void> {
    await this.calendarService.refreshEvents();
  }
}
