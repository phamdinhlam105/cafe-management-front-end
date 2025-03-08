import { getAccessToken } from "./token-handler";

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/profile';

export const editProfile = async(newProfile:any)=>{
  const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_URL}/profile`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProfile),
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
}

export const changePassword = async(changePasswordReq:any)=>{
  const token = getAccessToken("accessToken");
  try {
      const response = await fetch(`${API_URL}/password`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changePasswordReq),
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
}