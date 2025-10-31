import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  imports: [],
  templateUrl: './page-heading.html',
  styleUrl: './page-heading.scss'
})
export class PageHeading {
  @Input() title: string = '';
  
}
