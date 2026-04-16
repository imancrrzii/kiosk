import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import NotificationContainer from "@/components/ui/NotificationContainer";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAuth();
  const { notifications, show: showNotification, hide: hideNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/counter", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const result = await login(data.username, data.password);

    if (result.success) {
      showNotification(`Selamat datang, ${result.user.name}!`, "success");
      switch (result.user.role) {
        case "ADMIN":
          navigate("/admin", { replace: true });
          break;
        case "TELLER":
        case "CS":
          navigate("/counter", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    } else {
      showNotification(result.error, "error");
      setError("password", {
        type: "manual",
        message: result.error,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <NotificationContainer notifications={notifications} onClose={hideNotification} />

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-sky-200">
            <FontAwesomeIcon icon={faShield} className="text-white" size="lg" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Login Petugas</h1>
          <p className="text-sm text-gray-400 mt-1">Bank · Sistem Antrian</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-4">
          <div>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username harus diisi" }}
              render={({ field }) => (
                <InputField
                  label="Username"
                  placeholder="teller1 / cs1 / admin"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.username?.message}
                  showHelperText={!!errors.username}
                  helperText={errors.username?.message}
                  showLeftIcon={false}
                  showRightIcon={false}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password harus diisi" }}
              render={({ field }) => (
                <InputField
                  label="Password"
                  placeholder="••••••••"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.password?.message}
                  isPassword={true}
                  showHelperText={!!errors.password}
                  helperText={errors.password?.message}
                  showLeftIcon={false}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            size="large"
            variant="primary"
            leftIcon={faShield}
            label={isLoading ? "Memverifikasi…" : "Masuk"}
            className="w-full"
          />
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Gunakan kredensial yang telah diberikan oleh admin</p>
        </div>
      </div>
    </div>
  );
}