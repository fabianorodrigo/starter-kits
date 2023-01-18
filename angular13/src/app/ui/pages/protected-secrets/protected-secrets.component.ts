import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WindowConfirmationService } from 'src/app/services/window-confirmation.service';

@Component({
  selector: 'dapp-protected-secrets',
  templateUrl: './protected-secrets.component.html',
  styleUrls: ['./protected-secrets.component.css'],
})
export class ProtectedSecretsComponent implements OnInit {
  buttonClicked = false;

  constructor(public confirmationService: WindowConfirmationService) {}

  ngOnInit(): void {}

  toggle() {
    this.buttonClicked = !this.buttonClicked;
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if button NOT clicked
    if (!this.buttonClicked) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.confirmationService.confirm('Do you really want go out?');
  }
}
