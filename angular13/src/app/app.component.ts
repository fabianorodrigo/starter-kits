import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './shared/services/message.service';
import menu from './menu.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = '<app title>';
  icon = 'fa-duotone'; //https://fontawesome.com/search

  menu = menu;

  constructor() {}

  ngOnInit(): void {}
}
