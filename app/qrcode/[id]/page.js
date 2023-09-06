'use client'

import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

class PrintContent extends React.Component {
  render() {
    const { inputValue } = this.props;

    return (
      <div>
        <h1>QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter text or URL"
          value={inputValue}
          readOnly
        />
        <div className="mt-20">
          {inputValue && (
            <QRCode
              value={inputValue}
              size={200}
              fgColor="#000000"
              imageSettings={{
                src: "/images/cotraceLogo.png",
                excavate: true,
                height: 40,
                width: 40,
              }}
              level="H"
              includeMargin={true}
            />
          )}
        </div>
      </div>
    );
  }
}

function QRCodePage({ params: { id } }) {
  const [inputValue, setInputValue] = useState(id);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  let componentRef = useRef(null);

  return (
    <div className="w-[110mm] h-[130mm] p-20 border border-black box-border">
     
     
      <PrintContent ref={(el) => (componentRef = el)} inputValue={inputValue} />

       <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef}
      />
    </div>
  );
}

export default QRCodePage;
