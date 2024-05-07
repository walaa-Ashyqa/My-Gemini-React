import React, { useState } from "react";
import "./Sidebar.css";
import {
  bars_solid,
  plus_solid,
  question,
  history,
  setting,
  message_regular,
} from "../../assets";
import {
  onSent1,
  setPrevesPrmpt,
  setPrmpt,
  setResultPrompt,
  
  setLoading,
  setShowResult
  
} from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import runChat from "../../config/gemini";
const Sidebar = () => {
  const { prompt, resultPrompt, prevesPrmpt,loading,showResult } = useSelector(({ api }) => api);
  const dispatch = useDispatch();

    const [extended,setExtended]=useState(false);
   
    const loadPrompt= async(value)=>{
dispatch(setPrmpt(value));
dispatch(setLoading(true));
dispatch(setShowResult(true));
const response=await runChat(value);
let responseArray=response.split("**");
    let newResponse="";
    for (let index = 0; index < responseArray.length; index++) {
    if(index===0 || index%2 !== 1){
      newResponse += responseArray[index]
    }
    else{
      newResponse+="</br> <b>"+responseArray[index]+"</b>";
    }
      
    }
    let newResponse2=newResponse.split("*").join('</br>');
    
   dispatch(setResultPrompt(newResponse2));
   dispatch(setLoading(false));
 //   setLoading(false)
    }
    const newChat =()=>{
      dispatch(setLoading(false));
      dispatch(setShowResult(false));
    }
  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={bars_solid} alt="menu bars icon" />
     
      <div onClick={()=>newChat()} className="new-chat">
        <img src={plus_solid} alt="new chat icon" />
       {extended? <p>New Chat</p>:null} 
      </div>
      {extended? <div className="recent">
        <p className="recent-title">Recent</p>
        {prevesPrmpt.map((item,index)=>{
          return(
            <div onClick={()=>loadPrompt(item)} className="recent-entry">
            <img src={message_regular} alt="message icon" />
            <p>{item}...</p>
          </div>
          )
        })}
     
      </div>:null}
     
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
        <img src={question} alt="message icon" />
         {extended ? <p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
        <img src={history} alt="activity icon" />
        {extended ? <p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry ">
        <img src={setting} alt="settingS icon" />
        {extended ?  <p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
