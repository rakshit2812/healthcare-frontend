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
  departments: any[] = [];
  doctors: any[] = [];

  doctorForm = {
    name: '',
    email: '',
    password: '',
    specialization: '',
    hospital: ''
  };

  departmentForm = {
    name: '',
    description: ''
  };

  editingDepartment: any = null;
  showDepartmentModal = false;

  editingDoctor: any = null;
  showDoctorModal = false;

  reportDate = '';
  expandedDoctors: Set<string> = new Set();

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.reportDate = today;
    // Load departments for specialization dropdown
    this.loadDepartments();
    // Load doctors list
    this.loadDoctors();
  }

  loadDoctors() {
    this.adminService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        this.showMessage('Error loading doctors', 'error');
      }
    });
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
        this.loadDoctors(); // Reload doctors list
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
    if (tab === 'add-doctor') {
      this.loadDoctors();
    } else if (tab === 'appointments') {
      this.loadAppointments();
    } else if (tab === 'bills') {
      this.loadBills();
    } else if (tab === 'reports') {
      this.loadDailyReport();
    } else if (tab === 'departments') {
      this.loadDepartments();
    }
  }

  // Department management methods
  loadDepartments() {
    this.adminService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        this.showMessage('Error loading departments', 'error');
      }
    });
  }

  openDepartmentModal(department?: any) {
    if (department) {
      this.editingDepartment = department;
      this.departmentForm = {
        name: department.name,
        description: department.description
      };
    } else {
      this.editingDepartment = null;
      this.departmentForm = { name: '', description: '' };
    }
    this.showDepartmentModal = true;
  }

  closeDepartmentModal() {
    this.showDepartmentModal = false;
    this.editingDepartment = null;
    this.departmentForm = { name: '', description: '' };
  }

  saveDepartment() {
    if (this.editingDepartment) {
      // Update existing department
      this.adminService.updateDepartment(this.editingDepartment._id, this.departmentForm).subscribe({
        next: (response) => {
          this.showMessage('Department updated successfully!', 'success');
          this.closeDepartmentModal();
          this.loadDepartments();
        },
        error: (err) => {
          this.showMessage('Failed to update department', 'error');
        }
      });
    } else {
      // Create new department
      this.adminService.createDepartment(this.departmentForm).subscribe({
        next: (response) => {
          this.showMessage('Department created successfully!', 'success');
          this.closeDepartmentModal();
          this.loadDepartments();
        },
        error: (err) => {
          this.showMessage('Failed to create department', 'error');
        }
      });
    }
  }

  deleteDepartment(id: string) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.adminService.deleteDepartment(id).subscribe({
        next: (response) => {
          this.showMessage('Department deleted successfully!', 'success');
          this.loadDepartments();
        },
        error: (err) => {
          this.showMessage('Failed to delete department', 'error');
        }
      });
    }
  }

  deleteDoctor(id: string) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.adminService.deleteDoctor(id).subscribe({
        next: (response) => {
          this.showMessage('Doctor deleted successfully!', 'success');
          this.loadDoctors();
        },
        error: (err) => {
          this.showMessage('Failed to delete doctor', 'error');
        }
      });
    }
  }

  openDoctorModal(doctor?: any) {
    if (doctor) {
      this.editingDoctor = doctor;
      this.doctorForm = {
        name: doctor.name,
        email: doctor.email,
        password: '',
        specialization: doctor.specialization,
        hospital: doctor.hospital
      };
    } else {
      this.editingDoctor = null;
      this.doctorForm = {
        name: '',
        email: '',
        password: '',
        specialization: '',
        hospital: ''
      };
    }
    this.showDoctorModal = true;
  }

  closeDoctorModal() {
    this.showDoctorModal = false;
    this.editingDoctor = null;
    this.doctorForm = {
      name: '',
      email: '',
      password: '',
      specialization: '',
      hospital: ''
    };
  }

  updateDoctor() {
    if (this.editingDoctor) {
      this.adminService.updateDoctor(this.editingDoctor._id, this.doctorForm).subscribe({
        next: (response) => {
          this.showMessage('Doctor updated successfully!', 'success');
          this.closeDoctorModal();
          this.loadDoctors();
        },
        error: (err) => {
          this.showMessage('Failed to update doctor', 'error');
        }
      });
    }
  }

  toggleDoctorExpand(doctorId: string) {
    if (this.expandedDoctors.has(doctorId)) {
      this.expandedDoctors.delete(doctorId);
    } else {
      this.expandedDoctors.add(doctorId);
    }
  }

  isDoctorExpanded(doctorId: string): boolean {
    return this.expandedDoctors.has(doctorId);
  }
}