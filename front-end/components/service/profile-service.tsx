import { NEXT_PUBLIC_API_URL } from "./api-link";
import { getAccessToken } from "./token-handler";

const API_URL = NEXT_PUBLIC_API_URL + '/profile';

export const getProfile = async () => {
  const token = getAccessToken("accessToken");
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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


export const editProfile = async (newProfile: any) => {
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
      return data;
    }
    return { error: "Đăng nhập thất bại!" };
  } catch (error) {
    return { error: "Không thể kết nối đến server!" };
  }
}

export const changePassword = async (changePasswordReq: any) => {
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

    if (response.status === 204) {
      const data = await response.json();
      return data;
    }
    if (response.status === 400) {
      const data = await response.json();
      if (data.message === "wrong pasword")
        return { error: "wrong password" };
      return {error: "Lỗi khi cập nhật hãy thử lại"}
    }

  } catch (error) {
    return { error: "Không thể kết nối đến server!" };
  }
}