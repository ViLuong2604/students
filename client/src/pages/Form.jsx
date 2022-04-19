import React, { useState } from 'react'
import { publicRequest } from '../requestMethod';
import './form.css'
export default function Form() {
    const[name,setName] = useState('');
    const[subject,setSubject]= useState('');
    const submitHandle =async()=>{
        const res = await publicRequest.post("student",{name,subject});
        
        res && window.confirm("them san pham thanh cong !!!");
    }
  return (
    <div>
        <div className="right ">
                <div className="nhom row">
                    <div className="topic">
                        <label for=""> Name</label>
                    </div>
                    <div className="inp">
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />
                    </div>
               </div>
               <div className="nhom row">
                <div className="topic">
                    <label for="">Subject </label>
                </div>
                <div className="inp">
                    <input value={subject} onChange={(e)=>setSubject(e.target.value)} type="text" />
                </div>
            </div> 
           <div class="but-sp">
            <button onClick={submitHandle}>Thêm</button>
           </div>
              
            </div>
    </div>
  )
}
