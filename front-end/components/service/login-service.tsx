import { setAccessToken } from "./token-handler";

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/login';

export const loginRequest = async (username:string, password:string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username, 
        password: password,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      if (Object.keys(data).length === 0) {
        return { error: "Sai tài khoản hoặc mật khẩu!" };
      }
      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }
      return data; 
    }
    return { error: "Đăng nhập thất bại!" }; 
  } catch (error) {
    return { error: "Không thể kết nối đến server!" };
  }
};
