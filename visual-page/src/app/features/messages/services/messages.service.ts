import { Injectable, signal, computed } from '@angular/core';
import { Message } from '../components/message-card/message-card.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages = signal<Message[]>([]);
  private loading = signal<boolean>(false);

  // Public computed signals
  readonly allMessages = computed(() => this.messages());
  readonly isLoading = computed(() => this.loading());
  readonly unreadCount = computed(() =>
    this.messages().filter(m => !m.isRead).length
  );

  constructor() {
    this.loadInitialMessages();
  }

  private loadInitialMessages(): void {
    // Simular datos de mensajes iniciales
    const initialMessages: Message[] = [
      {
        id: 1,
        sender: 'María García',
        subject: 'Actualización del proyecto',
        preview: 'Hola, quería informarte sobre los últimos avances en el proyecto. Hemos completado la fase de diseño y estamos listos para comenzar el desarrollo.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
        isRead: false,
        priority: 'high',
        category: 'Proyectos'
      },
      {
        id: 2,
        sender: 'Carlos Rodríguez',
        subject: 'Reunión de equipo',
        preview: 'Recordatorio: tenemos reunión de equipo mañana a las 10:00 AM. Por favor confirma tu asistencia.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
        isRead: false,
        priority: 'normal',
        category: 'Reuniones'
      },
      {
        id: 3,
        sender: 'Ana Martínez',
        subject: 'Documentación actualizada',
        preview: 'He actualizado la documentación del sistema. Puedes revisarla en el repositorio.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
        isRead: true,
        priority: 'low',
        category: 'Documentación'
      },
      {
        id: 4,
        sender: 'Luis Sánchez',
        subject: 'Problema urgente en producción',
        preview: '¡Atención! Hemos detectado un problema crítico en el servidor de producción. Necesitamos tu ayuda inmediata.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 horas atrás
        isRead: true,
        priority: 'high',
        category: 'Soporte'
      },
      {
        id: 5,
        sender: 'Patricia López',
        subject: 'Propuesta de mejora',
        preview: 'Tengo algunas ideas para mejorar el rendimiento de la aplicación. ¿Podemos discutirlas esta semana?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
        isRead: false,
        priority: 'normal',
        category: 'Desarrollo'
      },
      {
        id: 6,
        sender: 'Roberto Fernández',
        subject: 'Informe mensual',
        preview: 'Adjunto el informe mensual de métricas y estadísticas del sistema.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 días atrás
        isRead: true,
        priority: 'low',
        category: 'Reportes'
      },
      {
        id: 7,
        sender: 'Isabel Torres',
        subject: 'Nueva funcionalidad aprobada',
        preview: 'Buenas noticias, la nueva funcionalidad que propusiste ha sido aprobada. Podemos comenzar a trabajar en ella.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 días atrás
        isRead: false,
        priority: 'high',
        category: 'Proyectos'
      },
      {
        id: 8,
        sender: 'Diego Ramírez',
        subject: 'Revisión de código',
        preview: 'He revisado tu pull request. Todo se ve bien, solo tengo algunos comentarios menores.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 días atrás
        isRead: true,
        priority: 'normal',
        category: 'Desarrollo'
      }
    ];

    this.messages.set(initialMessages);
  }

  // Obtener todos los mensajes
  getMessages(): Message[] {
    return this.messages();
  }

  // Marcar mensaje como leído
  markAsRead(messageId: number): void {
    this.messages.update(messages =>
      messages.map(m =>
        m.id === messageId ? { ...m, isRead: true } : m
      )
    );
  }

  // Marcar mensaje como no leído
  markAsUnread(messageId: number): void {
    this.messages.update(messages =>
      messages.map(m =>
        m.id === messageId ? { ...m, isRead: false } : m
      )
    );
  }

  // Eliminar mensaje
  deleteMessage(messageId: number): void {
    this.messages.update(messages =>
      messages.filter(m => m.id !== messageId)
    );
  }

  // Agregar nuevo mensaje
  addMessage(message: Omit<Message, 'id'>): void {
    const newId = Math.max(...this.messages().map(m => m.id), 0) + 1;
    const newMessage: Message = { ...message, id: newId };
    this.messages.update(messages => [newMessage, ...messages]);
  }

  // Obtener mensaje por ID
  getMessageById(id: number): Message | undefined {
    return this.messages().find(m => m.id === id);
  }

  // Marcar todos los mensajes como leídos
  markAllAsRead(): void {
    this.messages.update(messages =>
      messages.map(m => ({ ...m, isRead: true }))
    );
  }

  // Obtener mensajes no leídos
  getUnreadMessages(): Message[] {
    return this.messages().filter(m => !m.isRead);
  }

  // Obtener mensajes por prioridad
  getMessagesByPriority(priority: 'low' | 'normal' | 'high'): Message[] {
    return this.messages().filter(m => m.priority === priority);
  }

  // Obtener mensajes por categoría
  getMessagesByCategory(category: string): Message[] {
    return this.messages().filter(m => m.category === category);
  }

  // Simular carga asíncrona de mensajes
  async refreshMessages(): Promise<void> {
    this.loading.set(true);
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.loadInitialMessages();
    this.loading.set(false);
  }
}
