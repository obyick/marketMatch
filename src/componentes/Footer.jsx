import React from 'react';
import './Footer.css'; // Certifique-se de criar e configurar este arquivo para estilizar o footer

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h4>About Us</h4>
          <p>
            Our mission is to help you find the best deals for your shopping needs. Compare prices across supermarkets and save money on your grocery shopping.
          </p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#solutions">Solutions</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#resources">Resources</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@yourapp.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Market Street, City, Country</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 YourApp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
