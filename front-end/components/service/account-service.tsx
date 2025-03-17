import { NEXT_PUBLIC_API_URL } from "./api-link";
import { getAccessToken } from "./token-handler";

const API_URL = NEXT_PUBLIC_API_URL + '/account';


export const registerRequest = async (registerReq: any) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerReq),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return { error: "Đăng ký thất bại!" };
  } catch (error) {
    return { error: "Không thể kết nối đến server!" };
  }
};


export const setRoleRequest = async (idUser: string, roleId: string) => {
  const token = getAccessToken("accessToken");
  try {
    const response = await fetch(`${API_URL}/setrole`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: idUser,
        roleId: roleId
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { error: "Không thể kết nối đến server!" };
  }
};

export const getAllUsers = async () => {
  const token = getAccessToken("accessToken");
  try {
    const response = await fetch(`${API_URL}/alluser`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { error: "Không thể kết nối đến server!" };
  }
};

export const getAllRoles = async () => {
  const token = getAccessToken("accessToken");
  try {
    const response = await fetch(`${API_URL}/allrole`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { error: "Không thể kết nối đến server!" };
  }
};

