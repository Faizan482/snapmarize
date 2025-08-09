'use client';
import { BadgeCheck } from 'lucide-react';
import React, { useState } from 'react';

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const pricingTabs = [
    {
      name: 'Lite',
      description:
        'Perfect for users who need basic PDF conversion tools. Convert documents with essential formatting and export options.',
      price: '$6.99',
      billing: '/month',
      annualPrice: '$63.88 billed annually',
      featuresTitle: 'For light usage',
      features: [
        'Convert PDFs to Word, Excel, and JPG',
        'Basic formatting support',
        'No watermarks on exports',
        'Email support',
      ],
      isBestValue: false,
    },
    {
      name: 'Pro',
      description:
        'Ideal for frequent users needing powerful PDF tools. Unlock batch conversion, OCR, and advanced formatting for professional results.',
      price: '$19.99',
      billing: '/month',
      annualPrice: '$239.88 billed annually',
      featuresTitle: 'For regular users',
      features: [
        'All Lite features',
        'Batch conversion',
        'Advanced formatting and layout retention',
        'OCR for scanned PDFs',
        'Priority email & chat support',
      ],
      isBestValue: true,
    },
    {
      name: 'Unlimited',
      description:
        'Ultimate solution for businesses and teams. Get unlimited conversions, API access, cloud storage integration, and team collaboration features.',
      price: '$49.99',
      billing: '/month',
      annualPrice: '$599.88 billed annually',
      featuresTitle: 'For teams and businesses',
      features: [
        'All Pro features',
        'Unlimited document conversions',
        'REST API access for automation',
        'Team sharing and permissions',
        'Cloud integration (Google Drive, Dropbox)',
        'Dedicated support & onboarding',
      ],
      isBestValue: false,
    },
  ];
  const handleSelectPlan = (planName: any) => {
    setSelectedPlan(planName);
  };
  return (
    <section className="relative overflow-hidden  mx-auto">
      <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="font-bold text-xl uppercase mb-4 text-rose-500 ">Pricing Plans</p>
          <h1 className="font-bold text-3xl max-w-2xl mx-auto sm:text-4xl">Choose the perfect plan for your needs</h1>
        </div>

        {/* Pricing Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTabs.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col border transition-all duration-300 ease-in-out hover:shadow-xl
        ${tier.name === selectedPlan
                  ? 'border-2 border-rose-600 ring-4 ring-rose-200'
                  : 'border-gray-200'}

                  
      `}
            >
              {/* Best Value Badge */}
              {tier.isBestValue && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Best Value
                </span>
              )}

              {/* Card Content */}
              <div className="flex flex-col">
                <div className="flex flex-col min-h-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">{tier.name}</h2>
                  <p className="text-gray-500 text-sm mb-4 text-center">{tier.description}</p>

                  <div className="mb-6 text-center">
                    <span className="text-5xl font-extrabold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 text-lg">{tier.billing}</span>
                    <p className="text-gray-500 text-sm mt-1">{tier.annualPrice}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => handleSelectPlan(tier.name)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-300 mb-4
              ${tier.name === selectedPlan
                        ? 'bg-rose-500 text-white hover:bg-rose-700 shadow-md'
                        : 'bg-rose-100 text-rose-500 hover:bg-rose-200'}
            `}
                  >
                    Choose plan
                  </button>

                  {/* Features */}
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-4">{tier.featuresTitle}</h3>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-rose-500 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}