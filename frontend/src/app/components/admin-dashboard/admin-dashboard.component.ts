import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../../services/complaint.service';
import { AuthService } from '../../services/auth.service';
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
  staffList: any[] = [];
  isLoading = true;

  constructor(private complaintService: ComplaintService, private authService: AuthService) {}

  ngOnInit() {
    this.loadComplaints();
    this.loadStaff();
  }

  loadStaff() {
    this.authService.getStaff().subscribe({
      next: (data) => this.staffList = data,
      error: (err) => console.error('Failed to load staff', err)
    });
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
