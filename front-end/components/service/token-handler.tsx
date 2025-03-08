
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const setAccessToken = (token: string) => {
    Cookies.set("access_token", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
        path: "/",
    });
};

export const getAccessToken = (name: string) => {
    return Cookies.get("accessToken") || null;
}

export const callWithAuth = async (apiService: () => Promise<any>): Promise<any> => {
    const token = getAccessToken("accessToken");

    if (!token) {
        console.warn("Token hết hạn hoặc không tồn tại. Chuyển hướng đăng nhập...");
        window.location.href = "/login";
        return null;
    }

    try {
        return await apiService();
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return null;
    }
};