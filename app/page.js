'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { useRef } from 'react';




export default function Home() {

  const canvasRef = useRef(null);

  const purok1 = () => {

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(5, 5);
    context.lineTo(5, 50);
    context.lineTo(50, 50);
    context.lineTo(50, 5);
    context.closePath();
    context.stroke();


  };



  useEffect(() => {


       // purok1()       
     
        
  },[])

  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

  const renderSquares = () => {
    const squares = [];
    for (let i = 0; i < 20; i++) {
      squares.push(<div key={i} className={'square'}></div>);
    }
    return squares;
  };



  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div id="my-canvas" className='border-2 border-red-500 m-4 p-8'>
    

      <div>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: color,
            margin: '10px',
          }}
        ></div>
      ))}
    </div>
       
      </div>
      
    </main>
  )
}
