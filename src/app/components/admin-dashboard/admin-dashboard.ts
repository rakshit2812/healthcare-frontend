import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  activeTab = 'add-doctor';
  message = '';
  messageType = '';
  
  appointments: any[] = [];
  bills: any[] = [];
  dailyReport: any = null;

  doctorForm = {
    name: '',
    email: '',
    password: '',
    specialization: '',
    hospital: ''
  };

  reportDate = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.reportDate = today;
  }

  addDoctor() {
    this.adminService.addDoctor(this.doctorForm).subscribe({
      next: (response) => {
        this.showMessage('Doctor added successfully!', 'success');
        this.doctorForm = {
          name: '',
          email: '',
          password: '',
          specialization: '',
          hospital: ''
        };
      },
      error: (err) => {
        this.showMessage('Failed to add doctor', 'error');
      }
    });
  }

  loadAppointments() {
    this.adminService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        this.showMessage('Error loading appointments', 'error');
      }
    });
  }

  loadBills() {
    this.adminService.getBills().subscribe({
      next: (data) => {
        this.bills = data;
      },
      error: (err) => {
        this.showMessage('Error loading bills', 'error');
      }
    });
  }

  loadDailyReport() {
    this.adminService.getDailyReport(this.reportDate).subscribe({
      next: (data) => {
        this.dailyReport = data;
      },
      error: (err) => {
        this.showMessage('Error loading report', 'error');
      }
    });
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  setTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'appointments') {
      this.loadAppointments();
    } else if (tab === 'bills') {
      this.loadBills();
    } else if (tab === 'reports') {
      this.loadDailyReport();
    }
  }
}