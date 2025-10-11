import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../components/home/home.component';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, HomeComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent {
  protected readonly title = signal('Bienvenido a Visual Page');
  protected readonly subtitle = signal('Tu solución para crear páginas web modernas');

  constructor(private homeService: HomeService) {}
}
