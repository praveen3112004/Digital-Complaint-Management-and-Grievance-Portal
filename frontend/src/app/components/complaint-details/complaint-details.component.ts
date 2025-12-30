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

  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private router: Router
  ) {
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      category: ['Facility', Validators.required],
      description: ['', Validators.required],
      priority: ['Medium', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = () => this.filePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.complaintForm.invalid) return;

    this.isSubmitting = true;
    
    // Prepare FormData
    const formData = new FormData();
    formData.append('title', this.complaintForm.get('title')?.value);
    formData.append('category', this.complaintForm.get('category')?.value);
    formData.append('description', this.complaintForm.get('description')?.value);
    formData.append('priority', this.complaintForm.get('priority')?.value);
    if (this.selectedFile) {
        formData.append('image', this.selectedFile);
    }

    this.complaintService.createComplaint(formData).subscribe({
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
