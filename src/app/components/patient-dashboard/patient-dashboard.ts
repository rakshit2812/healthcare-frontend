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
  historyData: any = null;
  departments: any[] = [];
  activeTab = 'search';
  message = '';
  messageType = '';
  
  // Modal states
  showBookingModal = false;
  showCancelModal = false;
  selectedDoctor: any = null;
  selectedSlot: string = '';
  selectedAppointmentId: string = '';

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadHistory();
    this.loadDepartments();
  }

  loadDepartments() {
    this.patientService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error('Error loading departments', err);
      }
    });
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

  openBookingModal(doctor: any, slot: string) {
    this.selectedDoctor = doctor;
    this.selectedSlot = slot;
    this.showBookingModal = true;
  }

  closeBookingModal() {
    this.showBookingModal = false;
    this.selectedDoctor = null;
    this.selectedSlot = '';
  }

  confirmBooking() {
    if (!this.selectedDoctor || !this.selectedSlot) return;

    const bookingData = {
      doctorId: this.selectedDoctor._id,
      doctorProfileId: this.selectedDoctor._id,
      date: this.searchForm.date,
      slot: this.selectedSlot
    };

    this.patientService.bookAppointment(bookingData).subscribe({
      next: (response) => {
        this.closeBookingModal();
        this.showMessage('Appointment booked successfully!', 'success');
        this.doctors = [];
        this.loadHistory();
      },
      error: (err) => {
        this.closeBookingModal();
        this.showMessage('Failed to book appointment', 'error');
      }
    });
  }

  // Keep old method for backward compatibility
  bookAppointment(doctor: any, slot: string) {
    this.openBookingModal(doctor, slot);
  }

  loadHistory() {
    this.patientService.getHistory().subscribe({
      next: (data) => {
        this.historyData = data;
        this.history = data; // Keep for backward compatibility
      },
      error: (err) => {
        console.error('Error loading history', err);
      }
    });
  }

  openCancelModal(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    this.showCancelModal = true;
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.selectedAppointmentId = '';
  }

  confirmCancellation() {
    if (!this.selectedAppointmentId) return;

    this.patientService.cancelAppointment(this.selectedAppointmentId).subscribe({
      next: (response) => {
        this.closeCancelModal();
        this.showMessage('Appointment cancelled successfully', 'success');
        this.loadHistory();
      },
      error: (err) => {
        this.closeCancelModal();
        this.showMessage('Failed to cancel appointment', 'error');
      }
    });
  }

  // Keep old method for backward compatibility
  cancelAppointment(id: string) {
    this.openCancelModal(id);
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

  getAvailableSlots(doctor: any): string[] {
    if (!doctor.availability || doctor.availability.length === 0) {
      return [];
    }
    
    // Find availability for the selected date
    const dateAvailability = doctor.availability.find((avail: any) => avail.date === this.searchForm.date);
    
    return dateAvailability ? dateAvailability.slots : [];
  }

  getDoctorName(doctorId: string): string {
    // Try to find the doctor name from appointments
    if (this.historyData && this.historyData.appointments) {
      const appointment = this.historyData.appointments.find((apt: any) => apt.doctor._id === doctorId);
      if (appointment && appointment.doctor) {
        return appointment.doctor.name;
      }
    }
    
    // Try to find from prescriptions
    if (this.historyData && this.historyData.prescriptions) {
      const prescription = this.historyData.prescriptions.find((pres: any) => pres.doctor._id === doctorId);
      if (prescription && prescription.doctor) {
        return prescription.doctor.name;
      }
    }
    
    return 'Doctor';
  }
}