 import React, { useCallback, useEffect, useRef, useState} from 'react'
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

 
 const Index = () => {
    const [length ,setLength] = useState(8)
    const [numberAllow,setnumberAllow] = useState(false) 
    const [character,setcharacter] = useState(false)
    const [password, setpassword] = useState("")

    // useref hooks used to reference her input k ander raferance k ander pass kr skty hai
    const passwordRef = useRef(null)

    const passwordGanarater = useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numberAllow) str +="0123456789"
        if(character) str +="!@#$%^&*()_+[]{}~`"

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        
        }
        setpassword(pass)
    },[length,numberAllow,character,setpassword]) 
    // text copy funcation 
    const copyLandleButton = useCallback(()=>{
        // passwordRef.current?.select()// copy k liye k used kiya hai text heighlight k liye used kiya hai
        // passwordRef.current?.setSelectionRange(0,5)
        window.navigator.clipboard.writeText(password)
        toast("Text Copy Successfully!");
    },[password])

    useEffect(()=>{
        passwordGanarater()
    },[length,numberAllow,character,passwordGanarater])// password dy gy to infinite loop me pas ja ay gy
     //passwordGanarater optimize me rkho means memory me rkho 
    

   return (
     <div >

        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-700 mt-5'>
        <h1 className='text-center text-2xl mt-4 text-white'>Password Genarater</h1>

            <div className='flex w-full shadow-rounded-lg overflow-hidden mb-5 mt-5 '>
                <input 
                ref={passwordRef} 
                type="text"  
                className='outline-none w-full py-1 px-3' 
                value={password} 
                placeholder='password' 
                readOnly 
                />
                <button 
                onClick={copyLandleButton} 
                className='outline-none  bg-blue-700 text-white px-3 py-0.5 shrink-0'
                >Copy</button>
            </div>

            <div className='flex text-sm gap-x-2 w-full'>
                <div className='flex items-center gap-x-1 mb-5  '>
                    <input 
                    ref={passwordRef}
                    type="range"
                    min={6}
                    max={100}
                    value={length}
                    className='cursor-pointer'
                    onChange={(e)=>{setLength(e.target.value)}}
                     />
                    <label > Length :{length} </label>
                </div>

                <div className='flex items-center gap-x-1 mb-5'>
                    <input 
                    ref={passwordRef}
                    type="checkbox"
                    defaultChecked ={numberAllow}
                    id='numberInput'
                    onClick={()=>{setnumberAllow((pre)=> !pre)}}
                    />
                    <label htmlFor="numberInput"> Number</label>

                </div>

                <div className='flex items-center gap-x-1 mb-5'>
                    <input type="checkbox"
                    ref={passwordRef}
                    defaultChecked ={character}
                    id='numberInput'
                    onClick={()=>{setcharacter((pre)=> !pre)}}
                    />
                    <label htmlFor="numberInput"> Character</label>
                </div>


            </div>

        </div>
                <ToastContainer />

     </div>
   )
 }
 
 export default Index