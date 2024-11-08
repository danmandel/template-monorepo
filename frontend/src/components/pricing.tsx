import { Check } from 'lucide-react';
import React from 'react';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
}: PricingTierProps) => (
  <div
    className={`relative rounded-2xl bg-white shadow-sm dark:bg-gray-900 ${
      isPopular ? 'scale-105 ring-2 ring-indigo-600' : ''
    }`}
  >
    {isPopular && (
      <span className='absolute top-0 -translate-y-1/2 rounded-full bg-indigo-600 px-4 py-1 text-sm text-white'>
        Most Popular
      </span>
    )}
    <div className='p-8'>
      <h3 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>{name}</h3>
      <p className='mb-4 text-gray-600 dark:text-gray-400'>{description}</p>
      <div className='mb-6 flex items-baseline'>
        <span className='text-4xl font-bold text-gray-900 dark:text-white'>{price}</span>
        <span className='ml-1 text-gray-600 dark:text-gray-400'>/month</span>
      </div>
      <ul className='mb-8 space-y-4'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-center text-gray-600 dark:text-gray-300'>
            <Check className='mr-2 size-5 shrink-0 text-indigo-600 dark:text-indigo-400' />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`w-full rounded-lg px-4 py-3 font-medium transition ${
          isPopular
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
        }`}
      >
        Get Started
      </button>
    </div>
  </div>
);

const pricingTiers = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for side projects and small applications',
    features: [
      'Access to 3 starter templates',
      'Basic email support',
      'Community access',
      '6 months of updates',
      'Basic documentation',
    ],
  },
  {
    name: 'Pro',
    price: '$99',
    description: 'Best for professional developers and teams',
    features: [
      'Access to all templates',
      'Priority email support',
      'Private Discord community',
      '12 months of updates',
      'Advanced documentation',
      'Source code access',
      'Custom branding',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: '$299',
    description: 'For large teams and custom requirements',
    features: [
      'Everything in Pro plan',
      '24/7 priority support',
      'Custom template development',
      'Lifetime updates',
      'Team training sessions',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantees',
    ],
  },
];

export const PricingSection = () => (
  <div className='bg-gray-50 py-24 dark:bg-gray-800' id='pricing'>
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mb-16 text-center'>
        <h2 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white'>
          Simple, Transparent Pricing
        </h2>
        <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-300'>
          Choose the perfect plan for your needs. All plans include access to our template library
          and future updates.
        </p>
      </div>
      <div className='mx-auto grid max-w-5xl gap-8 md:grid-cols-3'>
        {pricingTiers.map((tier, index) => (
          <PricingTier key={index} {...tier} />
        ))}
      </div>
      <div className='mt-12 text-center'>
        <p className='text-gray-600 dark:text-gray-400'>
          Need a custom plan?{' '}
          <a href='#' className='text-indigo-600 hover:underline dark:text-indigo-400'>
            Contact us
          </a>
        </p>
      </div>
    </div>
  </div>
);
