import axios from "axios";
export async function LoginPost(email, password) {
  const response = {
    id: "",
    message: "",
    error: "",
    user_type: "",
    email: "",
  };
  try {
    const res = await axios.post(process.env.REACT_APP_LOGIN_API, {
      email: email,
      password: password,
    });
    console.log(res);
    response.user_type = res.data.result.user_type;
    response.message = res.data.message;
    response.id = res.data.result._id;
    response.email = res.data.result.email;
    
  } catch (err) {
    response.error = err.response.data.message;
  }
  return response;
}

//TODO check with email
export async function ForgotPasswordPost(email) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.post(process.env.REACT_APP_FORGOTPASSWORD_API, {
      email: email,
    });
    console.log(res);

    response.message = res.data.message;
  } catch (error) {
    response.error = "Error sending email";
  }
  return response;
}

//TODO reset password check
export async function ResetPasswordPost(password, confirmpassword) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.post(process.env.REACT_APP_RESETPASSWORD_API, {
      password: password,
      confirm_password: confirmpassword,
    });
    response.message = res.data.message;
  } catch (err) {
    response.error = err.response.data.message;
  }
  return response;
}

export async function GetStudentInfo(id) {
  const response = {
    message: "",
    error: "",
    data: "",
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_GET_STUDENT_INFO_LOGIN_ID}${id}`,
    );
    response.data = res.data;
    response.message = res.message;
  } catch (error) {
    response.error = error.response.data.message;
    
  }
  console.log(response);
  
  return response;
}

// export async function UpdateStudentInfo(email,data){
//     const response={
//         message:"",
//         error:"",
//     }
//     try {
//         const res=axios.put(`${process.env.REACT_APP_UPDATE_STUDENT}${email}`,{
//             data
//         })
//     } catch (error) {

//     }
// }
export async function CreateStudent(data) {
  const response = {
    message: "",
    error: "",
  };
  try{
  const res =await axios.post(process.env.REACT_APP_CREATE_STUDENT, {
    name: data.name,
    mobile: data.mobile,
    department: data.department,
    parent_name: data.parent_name,
    parent_mobile: data.parent_mobile,
    guardian_name: data.guardian_name,
    guardian_mobile: data.guardian_mobile,
    home_addr: data.home_addr,
    profile: data.profile,
    email: data.email,
    login:data.login,
  });
  console.log(res);
  
}
catch(error){
  response.error=error;
}
return response;
}
