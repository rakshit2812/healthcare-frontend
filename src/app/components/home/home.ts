import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  quote: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  features: Feature[] = [
    {
      icon: 'user',
      title: 'Create Your Profile',
      description: 'Sign up and complete your profile to get personalized healthcare recommendations and services.'
    },
    {
      icon: 'calendar',
      title: 'Book Appointments',
      description: 'Browse doctor profiles, check availability, and book appointments that fit your schedule.'
    },
    {
      icon: 'video',
      title: 'Video Consultation',
      description: 'Connect with doctors through secure, high-quality video consultations from the comfort of your home.'
    },
    {
      icon: 'credit-card',
      title: 'Consultation Credits',
      description: 'Purchase credit packages that fit your healthcare needs with our simple subscription model.'
    },
    {
      icon: 'shield-check',
      title: 'Verified Doctors',
      description: 'All healthcare providers are carefully vetted and verified to ensure quality care.'
    },
    {
      icon: 'file-text',
      title: 'Medical Documentation',
      description: 'Access and manage your appointment history, doctor\'s notes, and medical recommendations.'
    }
  ];

  testimonials: Testimonial[] = [
    {
      initials: 'SP',
      name: 'Sarah P.',
      role: 'Patient',
      quote: 'The video consultation feature saved me so much time. I was able to get medical advice without taking time off work or traveling to a clinic.'
    },
    {
      initials: 'DR',
      name: 'Dr. Robert M.',
      role: 'Cardiologist',
      quote: 'This platform has revolutionized my practice. I can now reach more patients and provide timely care without the constraints of a physical office.'
    },
    {
      initials: 'JT',
      name: 'James T.',
      role: 'Patient',
      quote: 'The credit system is so convenient. I purchased a package for my family, and we\'ve been able to consult with specialists whenever needed.'
    }
  ];

  getIconSvg(iconName: string): string {
    const icons: { [key: string]: string } = {
      'user': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      'calendar': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      'video': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
      'credit-card': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
      'shield-check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
      'file-text': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
    };
    return icons[iconName] || '';
  }
}