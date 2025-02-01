import { createSlice } from "@reduxjs/toolkit";
export const userSlice=createSlice({
    name:"user",
    initialState:{
        id:"",
        user_type:"",
        email:"",
        loggedIn:false,
        token:"",
        t_id:"",
    },
    reducers:{
        setId:(state,action)=>{
            state.id=action.payload;
            state.loggedIn=true;
        },
        setUserType:(state,action)=>{
            state.user_type=action.payload;
        },
        setStoreEmail:(state,action)=>{
            state.email=action.payload;
        },
        setStoreToken:(state,action)=>{
            state.token=action.payload;
        },
        logout:(state)=>{
            state.id="";
            state.user_type="";
            state.email="";
            state.loggedIn=false;
            state.token="";
        },
        setTid:(state,action)=>{
            state.t_id=action.payload;
        }
    }
})

export const {setId,setUserType,setStoreEmail,setStoreToken,logout,setTid}=userSlice.actions
export default userSlice.reducer