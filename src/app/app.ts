import { Component } from '@angular/core';
import { RequestForm } from './features/request-form/request-form';

@Component({
  selector: 'app-root',
  imports: [RequestForm],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
