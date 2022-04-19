import React, { useState ,useEffect, useRef} from 'react'
import { publicRequest } from '../requestMethod';
import { useHistory,Link} from 'react-router-dom';
import './home.css'

export default function Home() {
  const pageSize = 10;
  const[students,setStudents] = useState([]);
  const[page,setPage] = useState(1);
  const[maxPage,setMaxPage] = useState(1);
  const[change,setChange] = useState(false);
  
  const order = useRef('asc');
  const search = useRef("");
  const typingTimeoutRef = useRef(null);
  const[textSearch,setTextSearch]= useState('');
  const history = useHistory();
  useEffect(()=>{
    const getStudents =async ()=>{
     const res = await publicRequest.get(`student?pageSize=${pageSize}&page=${page}&sort=${order.current}&search=${search.current}`);
    const countNumber = await publicRequest.get(`student/count?search=${search.current}`);
     
    setMaxPage(countNumber.data%pageSize ===0 ? countNumber.data/pageSize : Math.floor(countNumber.data/pageSize)+1);
     setStudents(res.data);
    }
    getStudents();
  },[page,maxPage,change])
  useEffect(()=>{
    const getCountNumber =async ()=>{ 
     const countNumber = await publicRequest.get(`student/count?search=${search.current}`);
      setMaxPage(countNumber.data%pageSize ===0 ? countNumber.data/pageSize : Math.floor(countNumber.data/pageSize)+1);
    }
    getCountNumber();
  },[])
  const pageHandle =(style)=>{
       if(style ==='del'){
         page <=1 ? setPage(1) : setPage(page-1); 
       }else{
        page >= maxPage ? setPage(maxPage) : setPage(page+1);
       }
  }
  const deleteHandle = async(id)=>{
    await publicRequest.delete(`student/${id}`);
     setChange(!change)
    // setTest(tets+1);
   
  }
  const oderHandle = async(e)=>{
    order.current = e.target.value;
    setChange(!change)
    
  }
  console.log(change);
  const handleSubmit = (e)=>{
    const value = e.target.value;
       setTextSearch(value)
    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current)
    }
     
    typingTimeoutRef.current = setTimeout(() => {
      
      search.current = value;
       setPage(1);
       setChange(!change);
    }, 300);
     
   }
 
  return (
    <>
          <div className="right"> 
                <div className="nav">
               
                    <input className='input' value={textSearch} onChange={handleSubmit} placeholder='nhập tên sinh viên....' type="text" />
                     <select className='selec' onChange={oderHandle }>
                       <option value={"asc"}>Tăng dần </option>
                       <option value={"desc"}>Giảm dần </option>
                    </select>
                    <Link to="/form" >
                    <div  class="nut">
                        <button ><i  class="fa fa-plus-circle" aria-hidden="true"></i></button></div>
                    </Link>
                    

                  
                  
                    
                </div>
               
                <div className="table">
                    <table style={{width : '100%'}}>
                        <tr>
                            <th >STT</th>
                            <th >ID</th>
                            <th >Name</th>
                            <th >Subject</th>
                            <th >Delete</th>

                        </tr>
                        {
                          students.map( (s ,idx) =>{
                               return <tr key={idx}>
                                          <td >{idx + 1+pageSize*(page-1)}</td>
                                          <td >{s._id}</td>
                                          <td >{s.name}</td>
                                          <td >{s.subject}</td>
                                          <td style={{cursor : 'pointer'}} >
                                            <i onClick={()=> deleteHandle(s._id)} class="fa fa-trash" aria-hidden="true">
                                            </i></td>
                                  </tr>
                          })
                        }
                        
                       
                    </table>
                    
                </div>
                <div className="paging">
                <i onClick={ ()=> pageHandle("del")}  class="fa fa-arrow-left" aria-hidden="true"></i>
                 <div className="number">
                   {page}/{maxPage}
                 </div>
                 <i onClick={ ()=> pageHandle("add")} class="fa fa-arrow-right" aria-hidden="true"></i>
                </div>
            </div>
            
    </>
  )
}
