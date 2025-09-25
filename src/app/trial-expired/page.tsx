'use client';

import React from 'react';
import TrialExpiredPage from '@/app/trial-expired/TrialExpiredPage';

export default function TrialExpiredPageRoute() {
  const handlePlanSelect = (plan: 'basic' | 'premium') => {
    console.log('Selected plan:', plan);
    // TODO: Redirect to Stripe checkout
    // Example: window.location.href = `/checkout?plan=${plan}`;
  };

  return (
    <TrialExpiredPage 
      userEmail="test@example.com" // TODO: Get from user session
      onPlanSelect={handlePlanSelect}
    />
  );
}