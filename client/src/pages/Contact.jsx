import { useEffect } from 'react';
import LeadForm from '../components/LeadForm.jsx';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact | ME Technologies';
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 max-w-2xl">Tell us about your project and we will get back to you.</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <LeadForm source="contact" title="Send us a message" />

          <div>
            <div className="rounded bg-[var(--color-light)] p-6">
              <h2 className="text-xl font-semibold">Get in touch</h2>
              <p className="mt-3">Phone / WhatsApp: 0316 6379325</p>
              <p className="mt-1">
                <a className="text-[var(--color-primary)] underline" href="https://wa.me/923166379325" target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </p>
              <p className="mt-1">
                <a className="text-[var(--color-primary)] underline" href="https://linkedin.com/company/metechnologies" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                {' | '}
                <a className="text-[var(--color-primary)] underline" href="https://facebook.com/METechnologies45" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </p>
              <h3 className="mt-5 font-semibold">Office hours</h3>
              <p className="text-sm">Monday to Saturday, 9:00 AM to 6:00 PM (sample hours, update with the real ones)</p>
            </div>

            <iframe
              title="Map"
              className="mt-6 h-64 w-full rounded border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Faisalabad,+Pakistan&output=embed"
            />
            <p className="mt-1 text-xs">Map location is a placeholder. Replace it with the real office address.</p>
          </div>
        </div>
      </div>
    </section>
  );
}