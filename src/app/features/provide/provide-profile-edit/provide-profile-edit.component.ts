import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderBarProviderComponent} from "../../../project/components/header-bar-provider/header-bar-provider.component";

@Component({
  selector: 'app-provide-profile-edit',
  imports: [HeaderBarProviderComponent, ReactiveFormsModule],
  templateUrl: './provide-profile-edit.component.html',
  styleUrl: './provide-profile-edit.component.css'
})
export class ProvideProfileEditComponent {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  goBack(): void {
    this.router.navigate(['/provider/profile']);

  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');

    this.profileForm = this.fb.group({
      fullName: [userData.fullName || '', Validators.required],
      surname: [userData.surname || '', Validators.required],
      email: [userData.email || '', [Validators.required, Validators.email]],
    });
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      this.router.navigate(['/profile']);
    }
  }
}
