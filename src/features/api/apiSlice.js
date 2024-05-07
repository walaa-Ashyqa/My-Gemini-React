import { createSlice } from '@reduxjs/toolkit'
import runChat from "../../config/gemini";
const initialState = {
  prompt: "",
  resultPrompt:"",
  prevesPrmpt:[],
  loading:false,
  showResult:false,
}
export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
      
        setPrevesPrmpt: (state, action) => {
            state.prevesPrmpt.push(action.payload)
          }, 
      setPrmpt: (state, action) => {
        state.prompt = action.payload
      },
      setResultPrompt: (state, action) => {
         
        state.resultPrompt = action.payload
      },
      setLoading:(state, action) => {
         
        state.loading = action.payload
      },
      setShowResult:(state, action) => {
         
        state.showResult = action.payload
      },
       newChat :(state, action)=>{
        setLoading(false)
        setShowResult(false)
         },
      onSent1: async(state, action)=>{
      
      
       //dispatch(setPrevesPrmpt (prev =>[...prev,prompt]));
        const response= await runChat(action.payload);
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
        
         setResultPrompt(newResponse2);
          
      
        console.log("resultPrompt is : " + response);
      }
    },
})
// Action creators are generated for each case reducer function
export const {setPrmpt ,newChat,onSent1,setShowResult,setLoading,setResultPrompt ,setPrevesPrmpt} = apiSlice.actions

export default apiSlice.reducer