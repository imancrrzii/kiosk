import { API_ENDPOINTS } from "@/constant/api";
import http from "@/utils/http";

/**
 * Postal Code Service
 * Service untuk mendapatkan kode pos berdasarkan kelurahan
 */
export const PostalCodeServices = {
  getByKelurahan: async (kelurahan) => {
    if (!kelurahan || kelurahan.trim() === "") {
      throw new Error("Kelurahan tidak boleh kosong");
    }

    const response = await http.get(`${API_ENDPOINTS.POSTAL_CODE}?kelurahan=${encodeURIComponent(kelurahan)}`);

    const data = await response.json();
    return data;
  },
};

export default PostalCodeServices;
