import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [HeaderBarComponent, ReactiveFormsModule]
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}

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

