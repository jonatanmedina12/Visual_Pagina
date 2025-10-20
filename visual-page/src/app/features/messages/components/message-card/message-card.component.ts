import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Message {
  id: number;
  sender: string;
  senderAvatar?: string;
  subject: string;
  preview: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high';
  category?: string;
}

@Component({
  selector: 'app-message-card',
  imports: [CommonModule],
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.sass']
})
export class MessageCardComponent {
  @Input() message!: Message;
  @Output() messageClick = new EventEmitter<Message>();

  onMessageClick(): void {
    this.messageClick.emit(this.message);
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'hace un momento';
  }

  getPriorityClass(): string {
    return `priority-${this.message.priority}`;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
