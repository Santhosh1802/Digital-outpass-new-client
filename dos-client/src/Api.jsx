import axios from "axios";
export async function LoginPost(email, password) {
  const response = {
    id: "",
    message: "",
    error: "",
    user_type: "",
    email: "",
    token: "",
  };
  try {
    const res = await axios.post(
      process.env.REACT_APP_LOGIN_API,
      { email: email, password: password },
      { withCredentials: true }
    );
    //console.log(res);
    response.user_type = res.data.result.user_type;
    response.message = res.data.message;
    response.id = res.data.result._id;
    response.email = res.data.result.email;
    response.token = res.data.result.token;
  } catch (err) {
    console.log(err);
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
    },{withCredentials:true});
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
    },{withCredentials:true});
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
      {},
      { withCredentials: true }
    );
    response.data = res.data;
    response.message = res.message;
  } catch (error) {
    response.error = error.response.data.message;
  }
  return response;
}

export async function UpdateStudentInfo(email, data) {
  const response = {
    message: "",
    error: "",
  };
  try {
    if (email && data) {
      const url = `${process.env.REACT_APP_UPDATE_STUDENT}/${email}`;
      console.log("Request URL:", url);
      console.log(data);
      const res = await axios.put(url, {
        name: data.name,
        mobile: data.mobile,
        department: data.department,
        parent_name: data.parent_name,
        parent_mobile: data.parent_mobile,
        guardian_name: data.guardian_name,
        guardian_mobile: data.guardian_mobile,
        home_addr: data.home_addr,
        profile: data.profile,
      });
      response.message = res.message;
      return response;
    }
  } catch (error) {
    response.error = error.message;
    console.log(error);

    return response;
  }
}

export async function CreateStudent(data) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.post(
      process.env.REACT_APP_CREATE_STUDENT,
      {
        name: data.name,
        mobile: data.mobile,
        department: data.department,
        parent_name: data.parent_name,
        parent_mobile: data.parent_mobile,
        guardian_name: data.guardian_name,
        guardian_mobile: data.guardian_mobile,
        home_addr: data.home_addr,
        profile: data.profile,
        login: data.login,
      },
      { withCredentials: true }
    );
    console.log(res);
    response.message = res.data.message;
  } catch (error) {
    console.log(data);

    response.error = error;
  }
  return response;
}

export async function CreateTransaction(data) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.post(
      process.env.REACT_APP_CREATE_TRANSACTION,
      {
        in_time: data.in_time,
        out_time: data.out_time,
        reason: data.reason,
        login: data.login,
      },
      { withCredentials: true }
    );
    console.log(res);
    response.message=res.message;
  } catch (error) {
    console.log(error);
    response.error=error.message;
  }
  return response;
}

export async function GetTransactionStatus(token) {
  const response={
    message:"",
    error:"",
    data:"",
  }
  try {
    const res=await axios.get(process.env.REACT_APP_GET_ONE_TRANSACTION_STUDENT,{withCredentials:true})
    console.log(res.data);
    response.data=res.data.result;
  } catch (error) {
    console.log(error);
  }
  return response;
}

//TODO Check after Warden Accept
export async function GenerateQR(id) {
  const response={
    message:"",
    error:"",
    data:"",
  }
  try {
    const res=await axios.get(`${process.env.REACT_APP_GENERATE_QR}${id}`,{withCredentials:true});
    console.log(res.data);

  } catch (error) {
    
  }
  return response;
}