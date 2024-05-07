// import { createContext, useState,useCallback } from "react";
// import runChat from "../config/gemini"
// export const ApiContext = createContext({
//     error: null,
//     addError: () => {},
//     removeError: () => {},
//   })
// const ContextProvider=({
//     chlidren
// })=>{

//     const [input,setInput]=useState("");
//     const [recentPrompt,setRecentPrompt]=useState("");
//     const [prevPrompts,setPrevPrompts]=useState([]);

//     const [showResult,setShowResult]=useState(false);
//     const [loading,setLoading]=useState(false);
//     const [resultData,setResultData]=useState("");

// const onSent = async (prompt)=>{
//    const respons= await runChat(prompt)
// }
// const [error, setError] = useState(null)

//   const removeError = () => setError(null)

//   const addError = (message, status) => setError({ message, status })
// const contextValue = {
//     error,
//     addError: useCallback((message, status) => addError(message, status), []),
//     removeError: useCallback(() => removeError(), []),
//   }

//     return( 
//         <ApiContext.Provider value={contextValue}>
//             {chlidren}
//         </ApiContext.Provider>
//     )
// }
// export default ContextProvider;