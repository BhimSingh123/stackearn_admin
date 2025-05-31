import React from 'react';
import { BsWhatsapp } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";

const ContactIcons = ({ phoneNumber }) => {
  const whatsappMessage = 'Hello, I need some help!';

  return (
    <div className="d-flex gap-3">
      {/* WhatsApp Icon */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="d-flex align-items-center justify-content-center  bg-success bg-gradient
 text-white rounded-circle p-2 shadow-sm"
        style={{ transition: 'all 0.3s ease' }}
      >
        <BsWhatsapp size={20} />
      </a>

      {/* Phone Icon */}
      <a
        href={`tel:${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="d-flex align-items-center justify-content-center bg-primary bg-gradient   text-white rounded-circle p-2 shadow-sm"
        style={{ transition: 'all 0.3s ease' }}
      >
        <FaPhoneAlt size={18} />
      </a>
    </div>
  );
};

export default ContactIcons;
