import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageCardComponent, Message } from '../message-card/message-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages-list',
  imports: [CommonModule, MessageCardComponent, FormsModule],
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.sass']
})
export class MessagesListComponent {
  @Input() set messages(value: Message[]) {
    this.allMessages.set(value);
  }
  @Input() loading = false;
  @Output() messageClick = new EventEmitter<Message>();

  protected allMessages = signal<Message[]>([]);
  protected searchTerm = signal<string>('');
  protected selectedFilter = signal<'all' | 'unread' | 'read'>('all');
  protected selectedPriority = signal<'all' | 'high' | 'normal' | 'low'>('all');

  protected filteredMessages = computed(() => {
    let messages = this.allMessages();

    // Filter by search term
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      messages = messages.filter(m =>
        m.sender.toLowerCase().includes(term) ||
        m.subject.toLowerCase().includes(term) ||
        m.preview.toLowerCase().includes(term)
      );
    }

    // Filter by read status
    if (this.selectedFilter() === 'unread') {
      messages = messages.filter(m => !m.isRead);
    } else if (this.selectedFilter() === 'read') {
      messages = messages.filter(m => m.isRead);
    }

    // Filter by priority
    if (this.selectedPriority() !== 'all') {
      messages = messages.filter(m => m.priority === this.selectedPriority());
    }

    return messages;
  });

  protected unreadCount = computed(() =>
    this.allMessages().filter(m => !m.isRead).length
  );

  onMessageClick(message: Message): void {
    this.messageClick.emit(message);
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onFilterChange(filter: 'all' | 'unread' | 'read'): void {
    this.selectedFilter.set(filter);
  }

  onPriorityChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedPriority.set(target.value as 'all' | 'high' | 'normal' | 'low');
  }
}
