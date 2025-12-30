import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ComplaintService } from '../../services/complaint.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-complaint-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatChipsModule, RouterLink],
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'category', 'status', 'priority', 'created_at'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private complaintService: ComplaintService) {
    this.dataSource = new MatTableDataSource([] as any[]);
  }

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.complaintService.getComplaints().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error(err)
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Open': return 'warn';
      case 'Assigned': return 'accent';
      case 'In-progress': return 'primary';
      case 'Resolved': return 'primary'; // Custom CSS overrides material colors often, but keeping simple
      default: return 'primary';
    }
  }
  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High': return 'warn';
      case 'Medium': return 'accent';
      case 'Low': return 'primary';
      default: return 'primary';
    }
  }
}
