import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css'
})
export class PatientDashboardComponent implements OnInit {
  searchForm = {
    specialization: '',
    hospital: '',
    date: ''
  };
  
  doctors: any[] = [];
  history: any[] = [];
  activeTab = 'search';
  message = '';
  messageType = '';

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadHistory();
  }

  searchDoctors() {
    this.message = '';
    this.patientService.searchDoctors(
      this.searchForm.specialization,
      this.searchForm.hospital,
      this.searchForm.date
    ).subscribe({
      next: (data) => {
        this.doctors = data;
        if (data.length === 0) {
          this.showMessage('No doctors found', 'info');
        }
      },
      error: (err) => {
        this.showMessage('Error searching doctors', 'error');
      }
    });
  }

  bookAppointment(doctor: any, slot: string) {
    const bookingData = {
      doctorId: doctor._id,
      doctorProfileId: doctor._id,
      date: this.searchForm.date,
      slot: slot
    };

    this.patientService.bookAppointment(bookingData).subscribe({
      next: (response) => {
        this.showMessage('Appointment booked successfully!', 'success');
        this.doctors = [];
        this.loadHistory();
      },
      error: (err) => {
        this.showMessage('Failed to book appointment', 'error');
      }
    });
  }

  loadHistory() {
    this.patientService.getHistory().subscribe({
      next: (data) => {
        this.history = data;
      },
      error: (err) => {
        console.error('Error loading history', err);
      }
    });
  }

  cancelAppointment(id: string) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.patientService.cancelAppointment(id).subscribe({
        next: (response) => {
          this.showMessage('Appointment cancelled', 'success');
          this.loadHistory();
        },
        error: (err) => {
          this.showMessage('Failed to cancel appointment', 'error');
        }
      });
    }
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
    if (tab === 'history') {
      this.loadHistory();
    }
  }
}