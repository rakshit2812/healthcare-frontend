import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../services/doctor';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css'
})
export class DoctorDashboardComponent implements OnInit {
  appointments: any[] = [];
  activeTab = 'appointments';
  message = '';
  messageType = '';

  prescriptionForm = {
    appointmentId: '',
    notes: '',
    medicines: ''
  };

  availabilityForm = {
    date: '',
    slots: ''
  };

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.doctorService.getTodayAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        this.showMessage('Error loading appointments', 'error');
      }
    });
  }

  openPrescription(appointmentId: string) {
    this.prescriptionForm.appointmentId = appointmentId;
    this.prescriptionForm.notes = '';
    this.prescriptionForm.medicines = '';
  }

  submitPrescription() {
    const medicines = this.prescriptionForm.medicines
      .split(',')
      .map(m => m.trim())
      .filter(m => m);

    const data = {
      notes: this.prescriptionForm.notes,
      medicines: medicines
    };

    this.doctorService.prescribe(this.prescriptionForm.appointmentId, data).subscribe({
      next: (response) => {
        this.showMessage('Prescription added successfully!', 'success');
        this.prescriptionForm = { appointmentId: '', notes: '', medicines: '' };
        this.loadAppointments();
      },
      error: (err) => {
        this.showMessage('Failed to add prescription', 'error');
      }
    });
  }

  submitAvailability() {
    const slots = this.availabilityForm.slots
      .split(',')
      .map(s => s.trim())
      .filter(s => s);

    const data = {
      date: this.availabilityForm.date,
      slots: slots
    };

    this.doctorService.markAvailability(data).subscribe({
      next: (response) => {
        this.showMessage('Availability marked successfully!', 'success');
        this.availabilityForm = { date: '', slots: '' };
      },
      error: (err) => {
        this.showMessage('Failed to mark availability', 'error');
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
  }
}