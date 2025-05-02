import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <h1 class="not">;(</h1>

    <h1>Error</h1>
    <p>We are sorry. This was unexpected.</p>
  `,
  styleUrl: './error.component.scss',
})
export class ErrorComponent {}
