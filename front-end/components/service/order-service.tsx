import { NEXT_PUBLIC_API_URL } from "./api-link";
import { getAccessToken } from "./token-handler";

const API_ORDER = NEXT_PUBLIC_API_URL + '/neworder';

export const getAllOrder = async () => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(API_ORDER, {
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
    } catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
};

export const createOrder = async (note?: string, customerId?: string) => {

    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(API_ORDER, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                note: note,
                customerId: customerId
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
};

export const getOrderById = async (id: string) => {
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_ORDER}/getbyid/${id}`, {
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
        else {
            return { error: "Không tìm thấy dữ liệu" }
        }
    }
    catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
}

export const cancelOrderService = async (id: string) => {
    if (!id)
        return;
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(`${API_ORDER}/cancel/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            return { message: "success" }
        }
        const data = await response.json();
        return { error: data.message }
    } catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
}
export const finishOrderService = async (id: string) => {
    if (!id)
        return;
    const token = getAccessToken("accessToken");

    try {
        const response = await fetch(`${API_ORDER}/finish/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            return { success: true };
        }

        const errorText = await response.text();
        return { error: errorText || "Không tìm thấy dữ liệu" };

    } catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
};

