import React from 'react';
import { FaLinkedin, FaWhatsapp, FaTelegram, FaGoogle, FaGithub } from 'react-icons/fa';
import './SocialLinks.css';

function SocialLinks() {
  return (
    <div className="social-links-container">
      <a href="https://www.linkedin.com/in/nielchong/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="mailto:niel.chong93@gmail.com" target="_blank" rel="noopener noreferrer">
        <FaGoogle />
      </a>
      <a href="https://github.com/nielchong/personal" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </a>
      <a href="https://wa.me/91544012/" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>
      <a href="https://t.me/nielchong" target="_blank" rel="noopener noreferrer">
        <FaTelegram />
      </a>
    </div>
  );
}

export default SocialLinks;