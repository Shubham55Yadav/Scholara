// src/components/Footer.tsx

import React from 'react';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Social Icons */}
          <div>
            <div className="flex items-center">
              <img src="/images/footerlogo.png" alt="Scholara" className="h-12" />
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Crack Exams, Smash Grades
            </p>
            <div className="flex space-x-4 mt-4">
              <SocialIcon href="#" icon="twitter" />
              <SocialIcon href="#" icon="facebook" />
              <SocialIcon href="#" icon="instagram" />
              <SocialIcon href="#" icon="linkedin" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink text="About Us" />
              <FooterLink text="Academic Calendar" />
              <FooterLink text="Course Catalog" />
              <FooterLink text="Student Portal" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <FooterLink text="Help Center" />
              <FooterLink text="Contact Us" />
              <FooterLink text="FAQs" />
              <FooterLink text="Technical Support" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-slate-350">
              <li className="flex items-center">
                <MapPin className="h-4.5 w-4.5 text-indigo-400 mr-2 flex-shrink-0" />
                <span>For VIT University</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4.5 w-4.5 text-indigo-400 mr-2 flex-shrink-0" />
                <span>Contact on Email</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4.5 w-4.5 text-indigo-400 mr-2 flex-shrink-0" />
                <span className="truncate">jamessmith98igi@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4.5 w-4.5 text-indigo-400 mr-2 flex-shrink-0" />
                <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
          <p>© 2026 Scholara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }: { href: string; icon: string }) => (
  <a
    href={href}
    className="h-8 w-8 rounded-full bg-slate-850 flex items-center justify-center hover:bg-indigo-600 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className={`fab fa-${icon} text-white`}></i>
  </a>
);

const FooterLink = ({ text }: { text: string }) => (
  <li>
    <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">
      {text}
    </a>
  </li>
);

export default Footer;
