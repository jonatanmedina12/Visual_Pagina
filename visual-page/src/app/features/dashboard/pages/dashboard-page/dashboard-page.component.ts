import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { DashboardContentComponent } from '../../components/dashboard-content/dashboard-content.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [HeaderComponent, SidebarComponent, DashboardContentComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent {

}
