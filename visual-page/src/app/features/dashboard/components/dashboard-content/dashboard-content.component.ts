import { Component, signal, inject, computed } from '@angular/core';
import { StatsCardComponent } from '../../../../shared/components/stats-card/stats-card.component';
import { TableComponent, TableColumn, TableAction } from '../../../../shared/components/table/table.component';
import { MessageCardComponent, Message } from '../../../messages/components/message-card/message-card.component';
import { MessagesService } from '../../../messages/services/messages.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface StatsData {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  trend: number | null;
  trendDirection: 'up' | 'down' | 'neutral';
  subtitle: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

@Component({
  selector: 'app-dashboard-content',
  imports: [CommonModule, StatsCardComponent, TableComponent, MessageCardComponent],
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.sass']
})
export class DashboardContentComponent {
  private messagesService = inject(MessagesService);
  private router = inject(Router);

  // Recent messages (limited to 3)
  protected readonly recentMessages = computed(() =>
    this.messagesService.allMessages().slice(0, 3)
  );

  protected readonly unreadMessagesCount = this.messagesService.unreadCount;
  // Stats Cards Data
  protected readonly statsData: StatsData[] = [
    {
      title: 'Usuarios Totales',
      value: '2,543',
      icon: 'people',
      color: 'primary',
      trend: 12.5,
      trendDirection: 'up',
      subtitle: '+318 este mes'
    },
    {
      title: 'Ventas',
      value: '$45,280',
      icon: 'trending_up',
      color: 'success',
      trend: 8.3,
      trendDirection: 'up',
      subtitle: '+$3,540 esta semana'
    },
    {
      title: 'Pedidos Pendientes',
      value: '127',
      icon: 'pending_actions',
      color: 'warning',
      trend: 5.2,
      trendDirection: 'down',
      subtitle: '-15 desde ayer'
    },
    {
      title: 'Tasa de Conversión',
      value: '3.24%',
      icon: 'analytics',
      color: 'info',
      trend: 2.1,
      trendDirection: 'up',
      subtitle: '+0.3% desde la semana pasada'
    }
  ];

  // Table Configuration
  protected readonly tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Correo Electrónico', sortable: true },
    { key: 'role', label: 'Rol', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
    { key: 'lastLogin', label: 'Último Acceso', sortable: true }
  ];

  protected readonly tableActions: TableAction[] = [
    { icon: 'visibility', label: 'Ver Detalles', color: 'primary' },
    { icon: 'edit', label: 'Editar', color: 'accent' },
    { icon: 'delete', label: 'Eliminar', color: 'warn' }
  ];

  protected readonly tableData = signal<UserData[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@ejemplo.com',
      role: 'Administrador',
      status: 'Activo',
      lastLogin: '2024-01-15 10:30'
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria.gonzalez@ejemplo.com',
      role: 'Editor',
      status: 'Activo',
      lastLogin: '2024-01-15 09:45'
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@ejemplo.com',
      role: 'Usuario',
      status: 'Inactivo',
      lastLogin: '2024-01-10 14:20'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana.martinez@ejemplo.com',
      role: 'Editor',
      status: 'Activo',
      lastLogin: '2024-01-15 11:15'
    },
    {
      id: 5,
      name: 'Luis Sánchez',
      email: 'luis.sanchez@ejemplo.com',
      role: 'Usuario',
      status: 'Activo',
      lastLogin: '2024-01-14 16:30'
    },
    {
      id: 6,
      name: 'Carmen López',
      email: 'carmen.lopez@ejemplo.com',
      role: 'Administrador',
      status: 'Activo',
      lastLogin: '2024-01-15 08:00'
    }
  ]);

  protected readonly isTableLoading = signal<boolean>(false);

  onRowClick(row: UserData): void {
    console.log('Row clicked:', row);
  }

  onActionClick(event: { row: UserData; action: TableAction }): void {
    console.log('Action clicked:', event.action.label, 'for user:', event.row.name);

    if (event.action.label === 'Ver Detalles') {
      this.viewDetails(event.row);
    } else if (event.action.label === 'Editar') {
      this.editUser(event.row);
    } else if (event.action.label === 'Eliminar') {
      this.deleteUser(event.row);
    }
  }

  onSortChange(event: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort changed:', event);
    this.sortTableData(event.column, event.direction);
  }

  private viewDetails(user: UserData): void {
    console.log('Viewing details for:', user);
    // Implementar lógica de visualización
  }

  private editUser(user: UserData): void {
    console.log('Editing user:', user);
    // Implementar lógica de edición
  }

  private deleteUser(user: UserData): void {
    console.log('Deleting user:', user);
    // Implementar lógica de eliminación
  }

  private sortTableData(column: string, direction: 'asc' | 'desc'): void {
    const sorted = [...this.tableData()].sort((a, b) => {
      const aValue = a[column as keyof UserData];
      const bValue = b[column as keyof UserData];

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    this.tableData.set(sorted);
  }

  // Message handlers
  onMessageClick(message: Message): void {
    console.log('Message clicked:', message);
    this.messagesService.markAsRead(message.id);
    // Navegar a la página de mensajes
    this.router.navigate(['/messages']);
  }

  viewAllMessages(): void {
    this.router.navigate(['/messages']);
  }
}
