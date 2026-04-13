import axios from "axios";
import { AuthService } from "@/services/authServices";

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 60000, // 60 detik
    headers: {
        'Content-Type': 'application/json',
    }
});

// Aksi yang ingin dilakukan sebelum hit API
http.interceptors.request.use(async (config) => {
    const token = AuthService.getToken();

    if (token) {
        const exp = jwtDecode(token).exp;
        if (!exp) return config;

        const nowInSeconds = Math.floor(Date.now() / 1000) // date time jakarta

        if (nowInSeconds > exp - 60) {
            /*
                Masukkan fungsi untuk Mengambil refreshToken disini dan untuk diingat di set tokennya dengan AuthService




            */

            // Setelah mendapatkan refreshToken, set header Authorization
            config.headers.Authorization = `Bearer ${AuthService.getToken()}`;

        }
        else if (token) {
            config.headers.Authorization = `Bearer ${AuthService.getToken()}`;
        }
    }

    // Misal ada informasi seperti signature atau timestamp 


    return config;
});

// Aksi yang ingin dilakukan setelah mendapat response API sebelum proses fetching diselesaikan 
http.interceptors.response.use(
    (response) => response,
    async (error) => {
        /* 
            Handling untuk responseCode yang spesifik
        
        
            */

        // Error lainnya
        return Promise.reject(error);
    }
);

export default http;