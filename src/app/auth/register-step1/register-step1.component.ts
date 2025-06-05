import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-step1',
  standalone: true,
  templateUrl: './register-step1.component.html',
  styleUrls: ['./register-step1.component.css'],
  imports: [FormsModule, RouterLink]
})
export class RegisterStep1Component {
  selectedRole: string | null = null;

  constructor(private router: Router) {
  }

  onSubmit(): void {
    if (this.selectedRole === 'general') {
      this.router.navigate(['/register-step2']);
    } else if (this.selectedRole === 'supplier') {
      this.router.navigate(['/register-step3']);
    }
  }
}
