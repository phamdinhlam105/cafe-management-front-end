import { NEXT_PUBLIC_API_URL } from "./api-link";
import { getAccessToken } from "./token-handler";

const API_URL = NEXT_PUBLIC_API_URL + '/category';

export const getAllCategory = async () => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        else
            return { error: "Dữ liệu không hợp lệ" }
    } catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
}


export const createNewCategory = async (name:string, description?:string) => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        else
            return { error: "Dữ liệu không hợp lệ" }
    } catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
}

export const editCategory = async (id: string, name: string, description: string) => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        else
            return { error: "Dữ liệu không hợp lệ" }
    } catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
}


export const getProductsByCategoryId = async (id: string) => {
        const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_URL}/GetProducts/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        else
            return { error: "Dữ liệu không hợp lệ" }
    } catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
}


export const getCategoryById = async (id: string) => {
    const token = getAccessToken("accessToken");
try {
    const response = await fetch(`${API_URL}/getbyid/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
    else
        return { error: "Dữ liệu không hợp lệ" }
} catch (error) {
    return { error: "Không thể kết nối đến server!" };
}
}