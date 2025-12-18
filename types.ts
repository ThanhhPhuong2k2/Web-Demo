import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface RSVPFormData {
  name: string;
  phone: string;
  guests: number;
  attending: 'yes' | 'no' | 'maybe';
  message: string;
  amount?: string; // Tiền mừng nếu vắng mặt
}

export interface SectionProps {
  id?: string;
  className?: string;
}