import { getAccessToken } from "./token-handler";

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/customer';

export const addCustomer = async (name: string, phone: string, address: string) => {
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
                phone: phone,
                address: address
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

export const editCustomer = async (id: string, name: string, phone: string, address: string) => {
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
                phone: phone,
                address: address
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