import { createSlice } from "@reduxjs/toolkit";
export const userSlice=createSlice({
    name:"user",
    initialState:{
        id:"",
        user_type:"",
    },
    reducers:{
        setId:(state,action)=>{
            state.id=action.payload;
        },
        setUserType:(state,action)=>{
            state.user_type=action.payload;
        }
    }
})

export const {setId,setUserType}=userSlice.actions
export default userSlice.reducer