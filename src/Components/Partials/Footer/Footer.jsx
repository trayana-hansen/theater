import React from "react";
import "./Footer.scss";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footerContainer">
      <div>
        <h3>ADRESSE</h3>
        <p>Det utrolige teater</p>
        <p>Havnegade 901</p>
        <p>9000 Aalborg</p>
        <p>EAN 5798003279845</p>
        <p>CVR 1001 0012</p>
        <p className="map">Find vej på kort</p>
      </div>
      <div className="innerFlex">
        <div>
          <h3>BILLETSERVICE</h3>
          <p>Se åbningstider</p>
          <p>Billettelefon: +45 96 31 80 80</p>
          <p>billet@dut.dk</p>
        </div>
        <div>
          <h3>ADMINISTRATION</h3>
          <p>Telefon: +45 96 31 80 90</p>
          <p>adm@dut.dk</p>
        </div>
      </div>
      <div>
        <h3>PRAKTISK INFO</h3>
        <p>Kontakt</p>
        <p>Kom trygt i teatret</p>
        <p>Presseside</p>
        <p>Skoleforestillinger</p>
        <p>Teatercaféen</p>
        <p>Handelsbetingelser</p>
      </div>
      <div className="socials">
        <FaFacebook size={"2em"} />
        <FaInstagram size={"2em"} />
        <FaLinkedin size={"2em"} />
      </div>
    </footer>
  );
};

export default Footer;
