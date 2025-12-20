import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../services/complaint.service';
import { FormsModule } from '@angular/forms';
import { FilterStatusPipe } from '../../pipes/filter-status.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterStatusPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  complaints: any[] = [];
  isLoading = true;
  // In real app, load staff list from API. Mocking for now.
  staffList = [
    { id: 3, name: 'Technician 1' }, 
    { id: 4, name: 'Plumber Joe' },
    { id: 5, name: 'IT Support' }
  ];

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

  assignStaff(complaint: any, staffId: string) {
    if (!staffId) return;
    
    const id = parseInt(staffId);
    this.complaintService.assignComplaint(complaint.id, id).subscribe({
      next: () => {
        complaint.status = 'Assigned';
        complaint.staff_id = id;
        complaint.assigned_to = this.staffList.find(s => s.id === id)?.name;
      },
      error: (err) => alert('Failed to assign staff')
    });
  }
}
