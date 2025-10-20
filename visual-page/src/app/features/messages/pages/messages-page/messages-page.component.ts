import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { MessagesListComponent } from '../../components/messages-list/messages-list.component';
import { MessagesService } from '../../services/messages.service';
import { Message } from '../../components/message-card/message-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages-page',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    MessagesListComponent
  ],
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.sass']
})
export class MessagesPageComponent {
  private messagesService = inject(MessagesService);
  private router = inject(Router);

  // Exponer los datos del servicio
  protected readonly messages = this.messagesService.allMessages;
  protected readonly isLoading = this.messagesService.isLoading;
  protected readonly unreadCount = this.messagesService.unreadCount;

  onMessageClick(message: Message): void {
    console.log('Message clicked:', message);
    // Marcar como leído
    this.messagesService.markAsRead(message.id);
    // Aquí podrías navegar a una vista detallada del mensaje
    // this.router.navigate(['/messages', message.id]);
  }

  async refreshMessages(): Promise<void> {
    await this.messagesService.refreshMessages();
  }
}
