"use client";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const setAccessToken = (token: string) => {
    Cookies.set("accessToken", token, {
        expires: 1
    });
};

export const getAccessToken = (name: string) => {
    return Cookies.get("accessToken") || null;
}

export const callWithAuth = async (apiService: () => Promise<any>): Promise<any> => {
    const token = getAccessToken("accessToken");
    if (!token) {

        window.location.href = "/login";
        return null;
    }
    const decoded = jwt.decode(token) as { exp: number } | null;
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded == null) {
        window.location.href = "/login";
        return null;
    }

    if (decoded.exp < currentTime) {
        console.log("Token expired. Redirecting to login.");
        Cookies.remove("accessToken");
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

export const checkRole = () => {
    const token = getAccessToken("accessToken");
    if (!token)
        return null;
    const decoded = jwt.decode(token) as { name: string, role: string } | null;
    if(!decoded)
        return null;
    return decoded;
}