import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
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
        className="btn-success d-flex align-items-center gap-2 px-2 py-2 rounded"
      >
        <FaWhatsapp size={20} />
      </a>

      {/* Phone Icon */}
      <a
        href={`tel:${phoneNumber}`}
        target="_blank"
        className="btn btn-primary  d-flex align-items-center gap-2  px-2 py-2 rounded"
      >
        <FaPhoneAlt size={20} />
      </a>
    </div>
  );
};

export default ContactIcons;
