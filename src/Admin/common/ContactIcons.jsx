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
        className=" d-flex align-items-center gap-2 px-1 py-1 rounded"
      >
        <BsWhatsapp size={24} />
      </a>

      {/* Phone Icon */}
      <a
        href={`tel:${phoneNumber}`}
        target="_blank"
        className="  d-flex align-items-center gap-2  px-1 py-1 rounded"
      >
        <FaPhoneAlt size={24} />
      </a>
    </div>
  );
};

export default ContactIcons;
