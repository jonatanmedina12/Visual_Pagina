import { Injectable, signal, computed } from '@angular/core';
import { CalendarEvent } from '../components/event-card/event-card.component';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private events = signal<CalendarEvent[]>([]);
  private loading = signal<boolean>(false);

  // Public computed signals
  readonly allEvents = computed(() => this.events());
  readonly isLoading = computed(() => this.loading());
  readonly todayEvents = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.events().filter(event => {
      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    });
  });
  readonly upcomingEvents = computed(() => {
    const now = new Date();
    return this.events()
      .filter(event => new Date(event.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  });

  constructor() {
    this.loadInitialEvents();
  }

  private loadInitialEvents(): void {
    // Simular datos de eventos iniciales
    const initialEvents: CalendarEvent[] = [
      {
        id: 1,
        title: 'Reunión de planificación',
        description: 'Revisión del sprint y planificación de nuevas tareas',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 2), // En 2 horas
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 3), // En 3 horas
        location: 'Sala de conferencias A',
        type: 'meeting',
        priority: 'high',
        attendees: ['María García', 'Carlos Rodríguez', 'Ana Martínez']
      },
      {
        id: 2,
        title: 'Presentación del proyecto',
        description: 'Demo del nuevo módulo de usuarios ante el equipo',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // Mañana
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 90), // Mañana + 1.5h
        location: 'Auditorio principal',
        type: 'presentation',
        priority: 'high',
        attendees: ['Todo el equipo']
      },
      {
        id: 3,
        title: 'Code Review',
        description: 'Revisión de código del módulo de autenticación',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 5), // En 5 horas
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 6), // En 6 horas
        location: 'Virtual - Google Meet',
        type: 'meeting',
        priority: 'normal',
        attendees: ['Luis Sánchez', 'Patricia López']
      },
      {
        id: 4,
        title: 'Entrega de funcionalidad',
        description: 'Fecha límite para entregar el módulo de reportes',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // En 3 días
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // En 3 días
        type: 'deadline',
        priority: 'high',
        attendees: []
      },
      {
        id: 5,
        title: 'Almuerzo con el equipo',
        description: 'Celebración del éxito del último sprint',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 13), // Pasado mañana 13:00
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 14), // Pasado mañana 14:00
        location: 'Restaurante El Buen Sabor',
        type: 'event',
        priority: 'low',
        attendees: ['Todo el equipo']
      },
      {
        id: 6,
        title: 'Workshop de Angular',
        description: 'Capacitación sobre signals y nuevo control flow',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // En 5 días
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 4), // En 5 días + 4h
        location: 'Sala de capacitación',
        type: 'training',
        priority: 'normal',
        attendees: ['Equipo de desarrollo']
      },
      {
        id: 7,
        title: 'Mantenimiento del servidor',
        description: 'Actualización programada de los servidores de producción',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // En 7 días
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 2), // En 7 días + 2h
        location: 'Data Center',
        type: 'maintenance',
        priority: 'high',
        attendees: ['Roberto Fernández', 'Isabel Torres']
      },
      {
        id: 8,
        title: 'Revisión de diseño',
        description: 'Feedback sobre los nuevos mockups de la interfaz',
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4 + 1000 * 60 * 60 * 15), // En 4 días 15:00
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4 + 1000 * 60 * 60 * 16), // En 4 días 16:00
        location: 'Virtual - Zoom',
        type: 'meeting',
        priority: 'normal',
        attendees: ['Equipo de diseño', 'Diego Ramírez']
      }
    ];

    this.events.set(initialEvents);
  }

  // Obtener todos los eventos
  getEvents(): CalendarEvent[] {
    return this.events();
  }

  // Obtener evento por ID
  getEventById(id: number): CalendarEvent | undefined {
    return this.events().find(e => e.id === id);
  }

  // Agregar nuevo evento
  addEvent(event: Omit<CalendarEvent, 'id'>): void {
    const newId = Math.max(...this.events().map(e => e.id), 0) + 1;
    const newEvent: CalendarEvent = { ...event, id: newId };
    this.events.update(events => [...events, newEvent]);
  }

  // Actualizar evento
  updateEvent(id: number, updates: Partial<CalendarEvent>): void {
    this.events.update(events =>
      events.map(e =>
        e.id === id ? { ...e, ...updates } : e
      )
    );
  }

  // Eliminar evento
  deleteEvent(id: number): void {
    this.events.update(events =>
      events.filter(e => e.id !== id)
    );
  }

  // Obtener eventos por fecha
  getEventsByDate(date: Date): CalendarEvent[] {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return this.events().filter(event => {
      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === targetDate.getTime();
    });
  }

  // Obtener eventos por rango de fechas
  getEventsByDateRange(startDate: Date, endDate: Date): CalendarEvent[] {
    return this.events().filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }

  // Obtener eventos por tipo
  getEventsByType(type: string): CalendarEvent[] {
    return this.events().filter(e => e.type === type);
  }

  // Obtener eventos por prioridad
  getEventsByPriority(priority: 'low' | 'normal' | 'high'): CalendarEvent[] {
    return this.events().filter(e => e.priority === priority);
  }

  // Simular carga asíncrona de eventos
  async refreshEvents(): Promise<void> {
    this.loading.set(true);
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.loadInitialEvents();
    this.loading.set(false);
  }
}
