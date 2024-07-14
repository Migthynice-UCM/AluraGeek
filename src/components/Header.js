import React from "react";

function Header() {
  return (
    <header className="bg-highlight p-4 text-white text-center rounded-lg mb-8 relative">
      <div className="flex justify-center items-center">
        <img
          src="/images/image 1.svg"
          alt="Hearts"
          className="inline-block mr-2"
          style={{ width: "150px", height: "50px" }}
        />
        <h1 className="text-4xl font-bold font-pixel mx-2">AluraGeek</h1>
      </div>
    </header>
  );
}

export default Header;
