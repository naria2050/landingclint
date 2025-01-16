'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ExternalLink, PhoneIcon as WhatsApp } from 'lucide-react'

const FooterSection = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#FF8C00] text-transparent bg-clip-text">
      {title}
    </h2>
    <div className="overflow-hidden">
      {children}
    </div>
  </div>
)

const SocialLink = ({ href, icon: Icon, color }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-6"
    style={{ backgroundColor: color }}
  >
    <Icon className="w-4 h-4 text-white" />
  </Link>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="relative bg-gradient-to-br from-[#2B3B5B] via-[#1E2A40] to-[#2B3B5B] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF8C00] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF8C00] opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <FooterSection title="CONTACT US" id="contact">
            <div className="space-y-4">
              <ContactItem icon={MapPin} text="Sky View Trade Valley, (13th Floor),66/1 VIP Road Naya Paltan, Dhaka-1000, Bangladesh." />
              <ContactItem icon={Phone} text="+8802222225357" href="tel:+8802222225357" />
              <ContactItem icon={Mail} text="info@nariaholidays.com" href="mailto:info@nariaholidays.com" />
              <Link 
                href="https://maps.google.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#FF8C00] hover:text-[#FF6B00] transition-all transform hover:translate-x-2"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="text-sm">Get direction on google map</span>
              </Link>
            </div>
            <div className="pt-4">
              <p className="text-lg text-gray-300 mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                <SocialLink href="https://facebook.com/nariaholidays" icon={Facebook} color="#1877F2" />
                <SocialLink href="https://twitter.com/nariaholidays" icon={Twitter} color="#1DA1F2" />
                <SocialLink href="https://instagram.com/nariaholidays" icon={Instagram} color="#E4405F" />
                <SocialLink href="https://youtube.com/nariaholidays" icon={Youtube} color="#FF0000" />
                <SocialLink href="https://wa.me/+8802222225357" icon={WhatsApp} color="#25D366" />
              </div>
            </div>
          </FooterSection>

          <FooterSection title="OUR SERVICES">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'International Tours', 'Domestic Tours', 'Hajj Packages', 'Umrah Packages',
                'Visa Processing', 'Hotel Booking', 'Flight Booking', 'Travel Insurance',
                'Transport Service', 'Travel Guide'
              ].map((service, index) => (
                <li key={index} className="group flex items-center text-sm text-gray-300 hover:text-[#FF8C00] transition-colors duration-300">
                  <span className="mr-2 text-[#FF8C00]">›</span>
                  {service}
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="OUR PARTNER">
            <div className="space-y-4">
              <PartnerSection title="Our Partners" partners={[
                { name: 'ATAB', src: 'https://www.nariaholidays.com/images/atab.png', link: 'https://www.atab.org.bd/' },
                { name: 'TOAB', src: 'https://www.nariaholidays.com/images/toab.png', link: 'https://www.toab.org/' },
                { name: 'PATA', src: 'https://www.nariaholidays.com/images/pata.png', link: 'https://www.pata.org/' },
                { name: 'IATA', src: 'https://www.nariaholidays.com/images/iata-logo.png', link: 'https://www.iata.org/' },
                { name: 'Biman Bangladesh Airlines', src: 'https://www.nariaholidays.com/images/bimanbd.png', link: 'https://www.biman-airlines.com/' },
              ]} />
              <PartnerSection title="We Accept" partners={[
                { name: 'Visa', src: 'https://www.nariaholidays.com/images/payment-visa.svg', link: 'https://bd.visa.com/' },
                { name: 'American Express', src: 'https://www.nariaholidays.com/images/payment-express.svg', link: 'https://www.americanexpress.com/' },
                { name: 'Mastercard', src: 'https://www.nariaholidays.com/images/payment-mastercard.svg', link: 'https://www.mastercard.us/en-us.html' },
                { name: 'DBBL', src: 'https://www.nariaholidays.com/images/payment-dbbl.svg', link: 'https://www.dutchbanglabank.com/' },
                { name: 'bKash', src: 'https://www.nariaholidays.com/images/payment-bkash.svg', link: 'https://www.bkash.com/' },
                { name: 'Nagad', src: 'https://www.nariaholidays.com/images/payment-nagad.svg', link: 'https://nagad.com.bd/' },
                { name: 'Upay', src: 'https://www.nariaholidays.com/images/payment-upay.svg', link: 'https://www.upaybd.com/' },
                { name: 'Union Pay', src: 'https://www.nariaholidays.com/images/payment-union.svg', link: 'https://www.unionpayintl.com/en/' },
                { name: 'Tap Tap Send', src: 'https://www.nariaholidays.com/images/payment-tap.svg', link: 'https://www.taptapsend.com/' },
              ]} />
            </div>
          </FooterSection>
        </div>
      </div>

      <div className="relative mt-12 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Naria Holidays. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

const ContactItem = ({ icon: Icon, text, href }) => (
  <div className="flex items-start space-x-3 text-gray-300 group">
    <Icon className="w-5 h-5 mt-1 text-[#FF8C00] group-hover:scale-110 transition-transform" />
    {href ? (
      <Link href={href} className="text-sm hover:text-[#FF8C00] transition-colors">
        {text}
      </Link>
    ) : (
      <p className="text-sm">{text}</p>
    )}
  </div>
)

const PartnerSection = ({ title, partners }) => (
  <div>
    <h3 className="text-lg text-gray-300 mb-3">{title}</h3>
    <ul className={`flex flex-wrap gap-4 ${title === "We Accept" ? "grid grid-cols-3 sm:grid-cols-4 gap-3" : ""}`}>
      {partners.map((partner, index) => (
        <li key={index}>
          <Link 
            href={partner.link} 
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all duration-300 transform hover:scale-105"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={title === "We Accept" ? 40 : 60}
              height={title === "We Accept" ? 25 : 30}
              className={`${title === "We Accept" ? "h-6" : "h-8"} w-auto object-contain`}
            />
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

