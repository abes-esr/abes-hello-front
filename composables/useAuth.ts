import axios from "axios";

export type User = {
  userName: string;
};

export type LoginResponse = {
  userName: string;
  accessToken: string;
};

export type RegisterPayload = {
  userName: string;
  passWord: string;
};

export type RegisterResponse = {
  userName: string;
  accessToken: string;
};

export type LoginPayload = {
  userName: string;
  passWord: string;
};

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const token = useState<string | null>("token", () => null);
  const errorApi = useState<boolean>("errorApi", () => false);
  const errorApiMessage = useState<string | null>(
    "errorApiMessage",
    () => null
  );
  const isRequestSuccess = useState<boolean>("isRequestSuccess", () => false);
  const responseFromApi = useState<string | null>(
    "responseFromApi",
    () => null
  );
  const isLoggedIn = computed(() => !!user.value && !!token.value);

  onMounted(async () => {
    if (import.meta.client) {
      token.value = localStorage.getItem("token");
      if (token.value) {
        fetchUser();
      }
    }
  });

  watch(token, (newValue) => {
    console.log("newToken", newValue);
    if (newValue) {
      localStorage.setItem("token", newValue);
    } else {
      localStorage.removeItem("token");
    }
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>("/api/me");
      console.log("user retrieved");
      user.value = response.data;
    } catch {
      console.log("user not retrieved");
      await logout();
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      await axios.post<RegisterResponse>("/api/register", payload);
      responseFromApi.value =
        "Votre inscription a bien été enregistrée. Vous pouvez maintenant vous connecter";
      isRequestSuccess.value = true;
    } catch (error) {
      errorApiMessage.value =
        "Votre inscription a échoué. Veuillez recommencer.";
      isRequestSuccess.value = false;
      throw error;
    }
  };

  const login = async (payload: LoginPayload) => {
    try {
      const response = await axios.post<LoginResponse>("/api/login", payload);
      user.value = { userName: response.data.userName };
      token.value = response.data.accessToken;
    } catch {
      responseFromApi.value = "Une erreur est survenue. Veuillez recommencer.";
      isRequestSuccess.value = false;
    }
  };

  const logout = async () => {
    await axios.post("/api/logout");
    user.value = null;
    token.value = null;
  };

  return {
    user,
    token,
    errorApi,
    errorApiMessage,
    isRequestSuccess,
    responseFromApi,
    isLoggedIn,
    register,
    login,
    logout,
    fetchUser,
  };
};
