import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useEffect } from "react";

function QRCodeScanner() {
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request camera permission when the component mounts
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setError(null); // Reset any previous errors
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  }, []);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <QrReader
          delay={300}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      )}
      <p>{result}</p>
    </div>
  );
}
 

export default QRCodeScanner;
