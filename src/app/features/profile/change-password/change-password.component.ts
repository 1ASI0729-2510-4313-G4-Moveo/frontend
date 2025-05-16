import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    NgIf,
    HeaderBarComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})

export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  showError = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  goBack(): void {
    this.router.navigate(['/profile']);
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      actualPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
    }, { validators: this.matchPasswords });
  }

  matchPasswords(form: FormGroup) {
    const pass = form.get('newPassword')?.value;
    const repeat = form.get('repeatNewPassword')?.value;
    return pass === repeat ? null : { mismatch: true };
  }

  onSubmit() {
    const stored = localStorage.getItem('userProfile');
    if (!stored) return;

    const user = JSON.parse(stored);
    const actual = this.passwordForm.value.actualPassword;

    if (user.password !== actual) {
      this.showError = true;
      return;
    }

    // Guardar nueva contraseña
    user.password = this.passwordForm.value.newPassword;
    localStorage.setItem('userProfile', JSON.stringify(user));
    this.showError = false;

    alert('Password updated successfully!');
    this.router.navigate(['/profile']);
  }
}
