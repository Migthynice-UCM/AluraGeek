import React from "react";

function Footer() {
  return (
    <footer className="bg-highlight text-center p-4 mt-8 rounded-lg text-white font-pixel relative">
      <div className="flex justify-center mb-4">
        <img
          src="/images/image 1.svg"
          alt="Hearts"
          className="inline-block"
          style={{ width: "150px", height: "50px" }}
        />
      </div>
      <p>DESARROLLADO POR Joaquín Cancino Torres</p>
      <p>ALURA LATAM - 2024</p>
    </footer>
  );
}

export default Footer;
