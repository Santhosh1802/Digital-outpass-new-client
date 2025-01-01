import axios from "axios";
export async function LoginPost(email,password){
    const response={
        id:"",
        message:"",
        error:"",
        user_type:""
    }
    try {
        const res=await axios.post(process.env.REACT_APP_LOGIN_API,{
            "email":email,
            "password":password,
        })
        console.log(res);
        response.user_type=res.data.result.user_type;
        response.message=res.data.message;
        response.id=res.data.result._id;
        
    } catch (err) {
        response.error=err.response.data.message;
    }
    return response;
}

export async function ForgotPasswordPost(email){
    const response={
        message:"",
        error:"",
    }
    try {
        const res=await axios.post(process.env.REACT_APP_FORGOTPASSWORD_API,{
          "email":email
        })
        console.log(res);
        
        response.message=res.data.message
    } catch (error) {
        response.error="Error sending email"
    }
    return response;
}

export async function ResetPasswordPost(password,confirmpassword){
    const response={
        message:"",
        error:""
    }
    try {
        const res=await axios.post(process.env.REACT_APP_RESETPASSWORD_API,{
            "password":password,
            "confirm_password":confirmpassword
        })
        response.message=res.data.message;
    } catch (err) {
        response.error=err.response.data.message;
    }
    return response;
}