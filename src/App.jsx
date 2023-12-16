import { useState,useEffect } from 'react'
import Box from './components/Box';

function App() {
  const [givenMin,setGivenMin]=useState(20);
  const [pause,setPause]=useState(false)
   const [hour,setHour]=useState(0);
   const [minute,setMinute]=useState(givenMin-1);
   const [second,setSecond]=useState(60);
   let timer;

   function handleReset(){
     
      if(givenMin>60){
     
       setHour(prev=>Math.floor(givenMin/60));
       console.log(hour)
       if(hour && minute==0){
        setHour(prev=>prev-1);
        setMinute(59);
        setSecond(60)
       
      }else if(hour && minute){
        
    
       setMinute((givenMin%60)-1)
       setSecond(60)
      }
      }
      else{
        setHour(0)
        setMinute(givenMin-1)
        setSecond(60)
      }
      

      
      timer
   }

   function handlePause(){
    let btn_txt=document.getElementById("pause-btn");
    console.log(btn_txt.innerText)
    if(pause){
     btn_txt.innerText="Pause"
    }else{
     btn_txt.innerText="Resume"
    
    }
    
    setPause(prev=>!prev)
   }

   useEffect(()=>{
     
    timer=setInterval(() => {
     if(!pause){

       if(hour && minute==0){
         setHour(prev=>prev-1);
         setMinute(59);
         setSecond(60)
       }
       else if(minute && second==0){
         setSecond(60);
         setMinute(prev=>prev-1)
         
       }else if(hour || (minute || second)){
         setSecond(prev=>prev-1)
       }
       
     }
     

    }, 1000);

    return ()=>{clearInterval(timer)};

   },[second,minute,pause]


   );



   return(
       <>
       <div className="flex  bg-rose-400 w-full h-screen items-center justify-center flex-col">
       <h1 className="text-slate-950 text-3xl mb-6 max-md:text-2xl">Countdown Timer &#x1F559; </h1>
         <div className=" max-md:w-11/12  text-rose-300 shadow-2xl shadow-slate-950 p-4 bg-slate-900 rounded-2xl">
          
           <div className="px-2">

               <label>
                   Enter the Minute
               </label>

                <input 
                type="text"
                value={givenMin}
                onChange={(e)=>setGivenMin(e.target.value)}
                className='outline-none w-full py-1 px-3'
                placeholder='minute'/>

               <div className=" shadow-md shadow-slate-400 flex gap-4 max-md:gap-2 outline outline-offset-2 max-md:m-2 max-md:p-1 justify-center outline-2 max-md:outline-none max-md:shadow-none p-6 m-4 rounded-2xl">
                   <Box text={(hour.toString().length===2) ? hour.toString().charAt(0): 0 } />
                   <Box text={(hour.toString().length===1) ? hour.toString().charAt(0):hour.toString().charAt(1)} />
                   <span className="mt-4 mb-4 text-3xl">&#58;</span>
                   <Box text={(minute.toString().length===2) ? minute.toString().charAt(0): 0 } />
                   <Box text={(minute.toString().length===1) ? minute.toString().charAt(0):minute.toString().charAt(1)} />
                   <span className="mt-4 mb-4 text-3xl">&#58;</span>
                   <Box text={(second.toString().length===2) ? second.toString().charAt(0): 0 } />
                   <Box text={(second.toString().length===1) ? second.toString().charAt(0):second.toString().charAt(1)} />
               </div>

               <button className=" cursor-pointer outline-none text-white rounded-md px-4 py-1 bg-blue-900" onClick={handleReset}>Reset</button>
               <button className="cursor-pointer px-4 py-1 text-white bg-pink-500 mx-4 bg-blue-900 rounded-md" id="pause-btn" onClick={handlePause}>Pause</button> 
           </div>
         </div>
         </div>
       </>
   )
}

export default App
