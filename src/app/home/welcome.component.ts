import { Component } from '@angular/core';
/*
* A selector is only used if the component will be embedded in another component.
* The selector is used as a directive
* */
@Component({
  selector: 'pm-home',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
}
