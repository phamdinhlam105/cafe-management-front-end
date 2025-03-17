import { NEXT_PUBLIC_API_URL } from "./api-link";
import { setAccessToken } from "./token-handler";

const API_URL = NEXT_PUBLIC_API_URL + '/login';

export const loginRequest = async (username: string, password: string) => {
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

    if (response.status === 204) {
      return { error: "Sai tài khoản hoặc mật khẩu" };
    }

    if (response.ok) {
      const data = await response.json();
      if (!data || !data.accessToken) {
        return { error: "Sai tài khoản hoặc mật khẩu" };
      }

      setAccessToken(data.accessToken);
      return data;
    }

    return { error: "Đăng nhập thất bại" };
  } catch (error) {
    return { error: "Không thể kết nối đến server!" };
  }
};
