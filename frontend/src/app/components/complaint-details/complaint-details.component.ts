import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complaint-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.scss']
})
export class ComplaintDetailsComponent {
  complaintForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private router: Router
  ) {
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      category: ['Facility', Validators.required],
      description: ['', Validators.required],
      priority: ['Medium', Validators.required],
      attachment_url: [''] // Optional
    });
  }

  onSubmit() {
    if (this.complaintForm.invalid) return;

    this.isSubmitting = true;
    this.complaintService.createComplaint(this.complaintForm.value).subscribe({
      next: () => {
        this.router.navigate(['/complaints']);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }
}
