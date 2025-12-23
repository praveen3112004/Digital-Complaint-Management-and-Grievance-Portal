import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../services/complaint.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {
  complaints: any[] = [];
  isLoading = true;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.complaintService.getComplaints().subscribe({
      next: (data) => {
        this.complaints = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  updateStatus(complaint: any, newStatus: string) {
    let notes = '';
    if (newStatus === 'Resolved') {
      notes = prompt('Add resolution notes (optional):') || '';
    }

    if (confirm(`Change status to ${newStatus}?`)) {
      this.complaintService.updateStatus(complaint.id, newStatus, notes).subscribe({
        next: () => {
          complaint.status = newStatus;
          if (notes) complaint.resolution_notes = notes;
        },
        error: (err) => alert('Failed to update status')
      });
    }
  }
}
