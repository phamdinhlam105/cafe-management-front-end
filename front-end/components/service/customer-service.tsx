import { NEXT_PUBLIC_API_URL } from "./api-link";
import { getAccessToken } from "./token-handler";

const API_URL = NEXT_PUBLIC_API_URL + '/customer';

export const addCustomerService = async (newCustomer: any) => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCustomer)
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

export const editCustomer = async (id: string, editCustomerReq: any) => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editCustomerReq)
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

export const getAllCustomer = async () => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_URL}`, {
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