import React, { useState } from "react";
import "./Main.css";
import { image1, plus_solid , bulb_icon,
  gemini_icon,
  code_icon,
  compass_icon,
  message_icon,
  send_icon,
  mic_icon,
  gallery_icon,} from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setPrevesPrmpt,
  setPrmpt,
  setResultPrompt,
  setShowResult,
  
} from "../../features/api/apiSlice";
import { useRef } from "react";

import runChat from "../../config/gemini";



const Main = () => {
  let apiRef = useRef("");
  //const [showResult,setShowResult]=useState(false);
  //    const [loading,setLoading]=useState(false);
  
  const { prompt,loading, showResult,resultPrompt, prevesPrmpt } = useSelector(({ api }) => api);
  const dispatch = useDispatch();

  const delay =(index,nextword)=>{
    setTimeout(function(){
     dispatch(setResultPrompt (prev =>prev+nextword));
    },75*index)
    }
   
   const onSent= async(prompt)=>{
   // setLoading(true)
   // setShowResult(true)
   //dispatch(setPrevesPrmpt (prev =>[...prev,prompt]));
    const response= await runChat(prompt);
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
 //   setLoading(false)
  
    console.log("resultPrompt is : " + response);
  }

  const setPromptHandler = async () => {
    console.log(apiRef.current.value);
    dispatch(setLoading(true));
    dispatch(setShowResult(true));
    dispatch(setPrmpt(apiRef.current.value));
    await onSent(apiRef.current.value);
    dispatch(setLoading(false));
    //dispatch(setResultPrompt(response));
    dispatch(setPrevesPrmpt(apiRef.current.value));

  

    apiRef.current.value = "";
  };
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={image1} alt="user icon" />
      </div>
      <div className="main-container">
        {!showResult ?
         <>
  <div className="greet">
          <p>
            <span>Hello, Wala.</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>come up with a recipe for an upcoming event</p>
            <img src={compass_icon} alt="compass icon" />
          </div>
          <div className="card">
            <p>come up with a recipe for an upcoming event</p>
            <img src={bulb_icon} alt="bulb icon" />
          </div>
          <div className="card">
            <p>come up with a recipe for an upcoming event</p>
            <img src={message_icon} alt="message icon" />
          </div>
          <div className="card">
            <p>come up with a recipe for an upcoming event</p>
            <img src={code_icon} alt="code icon" />
          </div>
        </div>
         </> 
         :
          <>
<div className="result">
  <div className="result_title">
    <img width={50}src={image1} alt="user img" />
    <p>{prompt}</p>
  </div>
  <div className="result_data">
    <img width={50} src={gemini_icon} alt="gemini icon" />
    { loading ? 
    <div className="loader">
      <hr />
<hr />
    </div>
    :
<p dangerouslySetInnerHTML= {{__html:resultPrompt}}></p>
    }

  </div>
</div>
          </>
          }
      
        <div className="main-buttom">
          <div className="search-box">
            <input type="text" ref={apiRef} placeholder="Enter a prompt here" />
            <div>
             
              {prompt?  <img
                onClick={setPromptHandler}
                src={send_icon}
                alt="send icon"
              />: null}
              <img src={gallery_icon} alt="gallery icon" />
              <img src={mic_icon} alt="mic icon" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <span>Your privacy and Gemini Apps.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
 

