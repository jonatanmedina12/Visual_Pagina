import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../components/home/home.component';
import { HeroComponent } from '../../../../shared/components/hero/hero.component';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, HomeComponent, HeroComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent {
  protected readonly title = signal('Transforma Tu Visión Digital en Realidad');
  protected readonly subtitle = signal('Creamos experiencias web innovadoras que conectan, inspiran y convierten. Con Angular 20 y las tecnologías más avanzadas.');

  constructor(private homeService: HomeService) {}
}
