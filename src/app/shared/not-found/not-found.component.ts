import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h1 class="not">
      404
    </h1>

    <h1>Page not found :(</h1>
    <p>Ooooups! Looks like you got lost.</p>

  `,
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
