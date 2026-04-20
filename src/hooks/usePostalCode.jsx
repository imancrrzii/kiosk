import { useQuery } from "@tanstack/react-query";
import { PostalCodeService } from "@/services/postalCodeService";

/**
 * Custom Hook untuk Postal Code menggunakan React Query
 */
export const usePostalCode = () => {
  const useGetByKelurahan = (kelurahan, enabled = true) => {
    return useQuery({
      queryKey: ["postal-code", "kelurahan", kelurahan],
      queryFn: () => PostalCodeService.getByKelurahan(kelurahan),
      enabled: enabled && !!kelurahan && kelurahan.trim() !== "",
      staleTime: 1000 * 60 * 60,
      retry: 1,
    });
  };

  return {
    useGetByKelurahan,
  };
};

export default usePostalCode;
