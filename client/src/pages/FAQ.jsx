// src/components/FAQPage.js
import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is Sahand Estate?',
      answer: 'Sahand Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods.'
    },
    {
      question: 'How can I contact Sahand Estate?',
      answer: 'You can contact us via phone, email, or through our website contact form. Visit our contact page for more details.'
    },
    {
      question: 'What services do you offer?',
      answer: 'We offer a range of real estate services including property buying, selling, and renting. We also provide property management and consultation services.'
    },
    {
      question: 'Where are you located?',
      answer: 'Our main office is located in the heart of the city, but we serve clients across multiple regions. Visit our locations page for more information.'
    },
    {
      question: 'Do you offer virtual tours?',
      answer: 'Yes, we offer virtual tours for many of our properties. Contact us to schedule a virtual tour.'
    }
  ];

  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-slate-800'>Frequently Asked Questions</h1>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div key={index} className='bg-white shadow-md rounded p-4'>
            <h2 className='text-xl font-semibold text-slate-800'>{faq.question}</h2>
            <p className='mt-2 text-slate-700'>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
