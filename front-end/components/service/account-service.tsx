import { getAccessToken } from "./token-handler";

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/account';


export const registerRequest = async (registerReq:any) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerReq),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data; 
      }
      return { error: "Đăng ký thất bại!" }; 
    } catch (error) {
      return { error: "Không thể kết nối đến server!" };
    }
  };
  

  export const setRoleRequest = async (idUser:string,role:1|2|3) => {
    const token = getAccessToken("accessToken");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUser:idUser,
            role:role
        }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log(data)
        if (Object.keys(data).length === 0) {
          return { error: "Sai tài khoản hoặc mật khẩu!" };
        }
        return data; 
      }
      return { error: "Đăng nhập thất bại!" }; 
    } catch (error) {
      return { error: "Không thể kết nối đến server!" };
    }
  };
  

