import { NEXT_PUBLIC_API_URL } from "./api-link";
import { getAccessToken } from "./token-handler";

const API_URL = NEXT_PUBLIC_API_URL + '/report';

export const getDailyReport = async (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const apiUrl = `${API_URL}/daily?date=${formattedDate}`;
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(apiUrl, {
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

export const getDailyReportByRange = async (startDate: string,endDate:string) => {
    const apiUrl = `${API_URL}/daily/range?startdate=${startDate}&endDate=${endDate}`;
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(apiUrl, {
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

export const updateReportService = async (date: string) => {
    const apiUrl = `${API_URL}/daily/?date=${date}`;
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const data = await response.json();
            return {Message:"success"};
        }
        else
            return { error: "Dữ liệu không hợp lệ" }
    } catch (error) {
        return { error: "Không thể kết nối đến server!" };
    }
}





export const getMonthlyReport = async (month: Number, year: Number) => {
    const apiUrl = `${API_URL}/daily?month=${month}&year=${year}`;
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(apiUrl, {
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

export const getQuarterlyReprot = async (quarter: Number, year: Number) => {
    const apiUrl = `${API_URL}/daily?quarter=${quarter}&year=${year}`;
    const token = getAccessToken("accessToken");
    try {
        const response = await fetch(apiUrl, {
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

