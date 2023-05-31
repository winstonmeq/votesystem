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
  const arr1 = [{pr:'1',red:'100',yellow:'300',green:'400'},{pr:'2',red:'200',yellow:'400',green:'5'}]

  const p1 = (x,y,z) => {
    
    let colorx = 'blue';
    
    console.log(arr1[1]['red'],arr1[1]['yellow'],arr1[1]['green'])

    if (x >= y && x >= z) {
    
      return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P1</div>
    } else if (y >= x && y >= z) {
      return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'yellow'}}>P1</div>

    } else {
      return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'green'}}>P1</div>

    } 

 
  }

  const p2 = (x,y,z) => {
    
    let colorx = 'blue';
    
    if (x >= y && x >= z) {
    
      return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P2</div>

    } else if (y >= x && y >= z) {

      return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'yellow'}}>P2</div>

    } else {
      
      return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'green'}}>P2</div>

    } 

 
  }


  const p3 = () => {
    return <div style={{margin:'5px' ,width:'50px', height:'50px', backgroundColor:'green'}}>P3</div>
  }

  const p4 = () => {
    return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P4</div>
  }
  const p5 = () => {
    return <div style={{margin:'5px', width:'50px', height:'50px', backgroundColor:'yellow'}}>P5</div>
  }
  const p6 = () => {
    return <div style={{margin:'5px' ,width:'50px', height:'50px', backgroundColor:'green'}}>P6</div>
  }

  const p7 = () => {
    return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P7</div>
  }
  const p8 = () => {
    return <div style={{margin:'5px', width:'50px', height:'50px', backgroundColor:'yellow'}}>P8</div>
  }
  const p9 = () => {
    return <div style={{margin:'5px' ,width:'50px', height:'50px', backgroundColor:'green'}}>P9</div>
  }

  const p10 = () => {
    return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P10</div>
  }
  const p11 = () => {
    return <div style={{margin:'5px', width:'50px', height:'50px', backgroundColor:'yellow'}}>P11</div>
  }
  const p12 = () => {
    return <div style={{margin:'5px' ,width:'50px', height:'50px', backgroundColor:'green'}}>P12</div>
  }

  const p13 = () => {
    return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P13</div>
  }
  const p14 = () => {
    return <div style={{margin:'5px', width:'50px', height:'50px', backgroundColor:'yellow'}}>P14</div>
  }
  const p15 = () => {
    return <div style={{margin:'5px' ,width:'50px', height:'50px', backgroundColor:'green'}}>P15</div>
  }

  const p16 = () => {
    return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P16</div>
  }
  const p17 = () => {
    return <div style={{margin:'5px', width:'50px', height:'50px', backgroundColor:'yellow'}}>P17</div>
  }
  const p18 = () => {
    return <div style={{margin:'5px' ,width:'50px', height:'50px', backgroundColor:'green'}}>P18</div>
  }

  const p19 = () => {
    return <div style={{margin:'5px' , width:'50px', height:'50px', backgroundColor:'red'}}>P19</div>
  }
  const p20 = () => {
    return <div style={{margin:'5px', width:'50px', height:'50px', backgroundColor:'yellow'}}>P20</div>
  }
  const p21 = () => {
    return <div style={{margin:'5px' ,width:'50px', height:'50px', backgroundColor:'green'}}>P21</div>
  }
  const p22 = () => {
    return <div style={{margin:'5px' ,width:'50px', height:'50px', backgroundColor:'green'}}>P22</div>
  }




  return (
    <main className="flex min-h-screen flex-col justify-between p-4">
      <div id="my-canvas" className='border-2 border-red-500  m-4 p-8'>
 
    
    <div className='flex flex-row justify-center'>
    {p1(arr1[0]['red'],arr1[0]['yellow'],arr1[0]['green'])}
    {p2(arr1[1]['red'],arr1[1]['yellow'], arr1[1]['green'])}
    
    {p3()}{p4()}{p5()}</div>
    <div className='flex flex-row justify-center'>{p6()}{p7()}{p8()}{p9()}</div>
    <div className='flex flex-row justify-center'>{p10()}{p11()}{p12()}{p13()}{p14()}</div>
    <div className='flex flex-row justify-center'>{p15()}{p16()}{p17()}{p18()}{p19()}{p20()}{p21()}{p22()} </div>
      </div>
      
    </main>
  )
}

  {/* <div>
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
        */}
