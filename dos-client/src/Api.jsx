/* eslint-disable no-unused-vars */
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
    if (res) {
      response.user_type = res.data.result.user_type;
      response.message = res.data.message;
      response.id = res.data.result._id;
      response.email = res.data.result.email;
      response.token = res.data.result.token;
    }
  } catch (err) {
    //console.log(err);
    if (err.response) {
      response.error = err.response.data.message;
    }
  }
  return response;
}
export async function ForgotPasswordPost(email) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.post(
      process.env.REACT_APP_FORGOTPASSWORD_API,
      {
        email: email,
      },
      { withCredentials: true }
    );
    //console.log(res);

    response.message = res.data.message;
  } catch (error) {
    response.error = "Error sending email";
  }
  return response;
}

export async function ResetPasswordPost(password, confirmpassword,token) {
  const response = {
    message: "",
    error: "",
  };
  console.log(token);
  
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_RESETPASSWORD_API}${token}`,
      {
        password: password,
        confirm_password: confirmpassword,
      },
      {withCredentials: true }
    );
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
    response.data = res.data.result;
    response.message = res.message;
    //console.log(res.data);
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
      //console.log("Request URL:", url);
      //console.log(data);
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
    //console.log(error);

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
    //console.log(res);
    response.message = res.data.message;
  } catch (error) {
    //console.log(data);

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
    //console.log(res);
    response.message = res.message;
  } catch (error) {
    //console.log(error);
    response.error = error.message;
  }
  return response;
}

export async function GetTransactionStatus() {
  const response = {
    message: "",
    error: "",
    data: "",
  };
  try {
    const res = await axios.get(
      process.env.REACT_APP_GET_ONE_TRANSACTION_STUDENT,
      { withCredentials: true }
    );
    //console.log(res.data);
    response.data = res.data.result;
  } catch (error) {
    //console.log(error);
  }
  return response;
}

export async function GenerateQR(id) {
  const response = {
    data: "",
  };
  try {
    const trans_res = await axios
      .get(`${process.env.REACT_APP_GET_ONE_TRANSACTION_STUDENT}`, {
        params: {
          status: "Live",
        },
        withCredentials: true,
      })
      .then(async (res) => {
        const data = res.data.result;
        if (data) {
          const id = data[0]._id;
          const qr_res = await axios.get(
            `${process.env.REACT_APP_GENERATE_QR}${id}`,
            { withCredentials: true }
          );
          response.data = qr_res.data.result;
        }
      });
    //console.log(trans_res);
  } catch (error) {
    //console.log(error);
  }
  return response;
}

export async function GetWardenProfile(id) {
  const response = {
    message: "",
    error: "",
    data: {},
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_GET_WARDEN_VIA_LOGIN_ID}${id}`,
      { withCredentials: true }
    );
    //console.log(res.data);
    response.message = res.data.message;
    response.data = res.data;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function GetOutpassRequests(token) {
  const response = {
    message: "",
    error: "",
    data: {},
  };
  try {
    const res = await axios.get(`${process.env.REACT_APP_GET_ALL_REQUEST}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    response.message = res.data.message;
    response.data = res.data.result;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function UpdateRequestStatus(token, id, status) {
  const response = {
    message: "",
    error: "",
    data: {},
  };
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_UPDATE_TRANSACTION}${id}/${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    //console.log(res.data);
  } catch (error) {
    //console.log(error);
  }
  return response;
}

export async function GetSecurityProfile() {
  const response = {
    message: "",
    error: "",
    data: {},
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_GET_SECURITY_VIA_SESSION_ID}`,
      { withCredentials: true }
    );
    //console.log(res.data);
    response.message = res.data.message;
    response.data = res.data;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function VerifyQr(auth_token, token) {
  const response = {
    message: "",
    error: "",
    data: "",
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_VERIFY_QR}`,
      { token: token },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );
    console.log(res.data);
    response.message = res.data.message;
    response.data=res.data.result;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function GetAllStudent(token) {
  const response = {
    message: "",
    error: "",
    data: "",
  };
  try {
    const res = await axios.get(process.env.REACT_APP_ADMIN_GET_ALL_STUDENT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    response.data = res.data;
  } catch (error) {
    //console.log(error);
    response.error = error;
  }
  return response;
}

export async function GetAllWarden(token) {
  const response = {
    message: "",
    error: "",
    data: "",
  };
  try {
    const res = await axios.get(process.env.REACT_APP_ADMIN_GET_ALL_WARDEN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    //console.log(res.data);
    response.data = res.data;
  } catch (error) {
    //console.log(error);
    response.error = error;
  }
  return response;
}

export async function GetAllSecurity(token) {
  const response = {
    message: "",
    error: "",
    data: "",
  };
  try {
    const res = await axios.get(process.env.REACT_APP_ADMIN_GET_ALL_SECURITY, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    //console.log(res.data);
    response.data = res.data;
  } catch (error) {
    //console.log(error);
    response.error = error;
  }
  return response;
}

export async function DeleteWarden(token, id) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_ADMIN_DELETE_WARDEN}/${id}`,
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    response.message = res.data.message;
    //console.log(res.data);
    
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function DeleteSecurity(token, id) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_ADMIN_DELETE_SECURITY}/${id}`,
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    response.message = res.data.message;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function DeleteStudent(token, id) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_ADMIN_DELETE_STUDENT}/${id}`,
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    //console.log(res.data);
    
    response.message = res.data.message;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function AddSecurity(data) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.post(
      process.env.REACT_APP_ADMIN_CREATE_SECURITY,
      {
        name: data.name,
        primary_number: data.primary_number,
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );
    response.message = res.message;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function AddWarden(data) {
  const response = {
    message: "",
    error: "",
  };
  try {
    const res = await axios.post(
      process.env.REACT_APP_ADMIN_CREATE_WARDEN,
      {
        name: data.name,
        primary_number: data.primary_number,
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );
    response.message = res.message;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}

export async function AddStudent(data){
  const response={
    message:"",
    error:"",
  }
  try {
    const res=await axios.post(process.env.REACT_APP_ADMIN_CREATE_STUDENT,{students:data},{withCredentials:true});
    response.message=res.data.message;
  } catch (error) {
    //console.log(error.response.data.message);
    response.error=error.response.data.message;
  }
  return response;
}