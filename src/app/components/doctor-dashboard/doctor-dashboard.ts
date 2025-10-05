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
  appointmentSubTab = 'booked'; // New: subtab for appointment filtering
  message = '';
  messageType = '';
  showPrescriptionModal = false;
  selectedAppointment: any = null;

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
        console.log('Appointments loaded:', data);
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.showMessage('Error loading appointments', 'error');
      }
    });
  }

  openPrescriptionModal(appointment: any) {
    this.selectedAppointment = appointment;
    this.prescriptionForm.appointmentId = appointment._id;
    this.prescriptionForm.notes = '';
    this.prescriptionForm.medicines = '';
    this.showPrescriptionModal = true;
  }

  closePrescriptionModal() {
    this.showPrescriptionModal = false;
    this.selectedAppointment = null;
    this.prescriptionForm = { appointmentId: '', notes: '', medicines: '' };
  }

  openPrescription(appointmentId: string) {
    const appointment = this.appointments.find(a => a._id === appointmentId);
    if (appointment) {
      this.openPrescriptionModal(appointment);
    }
  }

  submitPrescription() {
    if (!this.prescriptionForm.notes || !this.prescriptionForm.medicines) {
      this.showMessage('Please fill in all fields', 'error');
      return;
    }

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
        this.closePrescriptionModal();
        this.showMessage('Prescription added successfully! Appointment marked as completed.', 'success');
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Error submitting prescription:', err);
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
    if (tab === 'appointments') {
      this.loadAppointments();
    }
  }

  formatTime(datetime: string): string {
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(datetime: string): string {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getPatientInitials(name: string): string {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  setAppointmentSubTab(subTab: string) {
    this.appointmentSubTab = subTab;
  }

  getFilteredAppointments() {
    return this.appointments.filter(apt => 
      apt.status.toLowerCase() === this.appointmentSubTab.toLowerCase()
    );
  }

  getAppointmentCount(status: string): number {
    return this.appointments.filter(apt => 
      apt.status.toLowerCase() === status.toLowerCase()
    ).length;
  }
}