import { getAccessToken } from "./token-handler";

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/orderdetail';

export const addOrderDetail = async (orderId: string, productId: string, quantity: Number, note?: string) => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: orderId,
                productId: productId,
                quantity: quantity,
                note: note
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

export const getByOrderId = async (id: string) => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_URL}/getByOrderId/${id}`, {
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

export const getAllOrderDetail = async ()=>{
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