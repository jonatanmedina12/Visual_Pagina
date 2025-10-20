import { Component, signal, effect, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessagesService } from '../../../features/messages/services/messages.service';

interface SubMenuItem {
  label: string;
  route: string;
  badge?: string;
}

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  subItems?: SubMenuItem[];
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  private messagesService = inject(MessagesService);

  protected readonly isCollapsed = signal(false);
  protected readonly expandedItem = signal<string | null>(null);

  // Computed badge for messages with dynamic count
  protected readonly messagesBadge = computed(() => {
    const count = this.messagesService.unreadCount();
    return count > 0 ? count.toString() : undefined;
  });

  constructor() {
    // Update body class when sidebar state changes
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.isCollapsed()) {
          document.body.classList.add('sidebar-collapsed');
        } else {
          document.body.classList.remove('sidebar-collapsed');
        }
      }
    });
  }

  protected readonly menuItems = computed<MenuItem[]>(() => [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/home',
    },
    {
      label: 'Analytics',
      icon: 'analytics',
      subItems: [
        { label: 'Overview', route: '/analytics/overview' },
        { label: 'Reports', route: '/analytics/reports', badge: '12' },
        { label: 'Insights', route: '/analytics/insights' },
        { label: 'Real-time', route: '/analytics/realtime' },
      ],
    },
    {
      label: 'Projects',
      icon: 'folder',
      subItems: [
        { label: 'All Projects', route: '/projects/all' },
        { label: 'Active', route: '/projects/active', badge: '5' },
        { label: 'Completed', route: '/projects/completed' },
        { label: 'Archived', route: '/projects/archived' },
      ],
    },
    {
      label: 'Team',
      icon: 'people',
      subItems: [
        { label: 'Members', route: '/team/members' },
        { label: 'Roles', route: '/team/roles' },
        { label: 'Permissions', route: '/team/permissions' },
        { label: 'Invitations', route: '/team/invitations', badge: '3' },
      ],
    },
    {
      label: 'Messages',
      icon: 'mail',
      route: '/messages',
      badge: this.messagesBadge(),
    },
    {
      label: 'Calendar',
      icon: 'calendar_today',
      route: '/calendar',
    },
    {
      label: 'Settings',
      icon: 'settings',
      subItems: [
        { label: 'General', route: '/settings/general' },
        { label: 'Security', route: '/settings/security' },
        { label: 'Notifications', route: '/settings/notifications' },
        { label: 'Integrations', route: '/settings/integrations' },
      ],
    },
  ]);

  toggleSidebar() {
    this.isCollapsed.update((value) => !value);
    if (this.isCollapsed()) {
      this.expandedItem.set(null);
    }
  }

  toggleItem(label: string) {
    if (this.isCollapsed()) {
      this.isCollapsed.set(false);
    }
    this.expandedItem.update((current) => (current === label ? null : label));
  }

  isExpanded(label: string): boolean {
    return this.expandedItem() === label;
  }
}
