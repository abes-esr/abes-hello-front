import { useNuxtApi } from "~/composables/useNuxtApi";

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

export type FetchUserResponse = {
  user: User;
  timeout: number;
  accessToken: string;
};

export const useAuth = () => {
  const client = useNuxtApi();
  const config = useRuntimeConfig();
  const basePublicUrl = config.public.apiUrl;
  const user = useState<User | null>("user", () => null);
  const token = useState<string | null>("token", () => null);
  const errorApi = useState<boolean>("errorApi", () => false);
  const errorApiMessage = useState<string | null>("errorApiMessage",() => null);
  const errorApiMessageSecondLine = useState<string | null>("errorApiMessageSecondeLine", () => null);
  const isRequestSuccess = useState<boolean>("isRequestSuccess", () => false);
  const responseFromApi = useState<string | null>(
    "responseFromApi",
    () => null
  );
  const isLoggedIn = computed(() => !!user.value && !!token.value);

  watch(token, (newValue) => {
    if (newValue) {
      localStorage.setItem("token", newValue);
    } else {
      localStorage.removeItem("token");
    }
  });

  const fetchPublic = async () => {
    try {
      console.log(client.getUri().toString())
      const response = await client.get<FetchUserResponse>(basePublicUrl + "/api/v1");
    } catch {

    }
  }

  const fetchUser = async () => {
    try {
      token.value = localStorage.getItem("token");
      const response = await client.get<FetchUserResponse>("/api/v1");
      user.value = response.data.user;
      token.value = response.data.accessToken;
    } catch {
      await logout();
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      await client.post<RegisterResponse>("/api/v1/register", payload);
      responseFromApi.value =
        "Votre inscription a bien été enregistrée. Vous pouvez maintenant vous connecter";
      isRequestSuccess.value = true;
      errorApi.value = false;
      errorApiMessage.value = null;
    } catch (error) {
      errorApi.value = true;
      errorApiMessage.value = "Votre inscription a échoué. Veuillez recommencer.";
      isRequestSuccess.value = false;
      throw error;
    }
  };

  const login = async (payload: LoginPayload) => {
    try {
      const response = await client.post<LoginResponse>("/api/v1/login", payload);
      user.value = { userName: response.data.userName };
      token.value = response.data.accessToken;
      errorApi.value = false;
      errorApiMessage.value = null;
    } catch (error) {
      errorApi.value = true;
      errorApiMessage.value = "Une erreur est survenue. Veuillez recommencer.";
      responseFromApi.value = "Une erreur est survenue. Veuillez recommencer.";
      isRequestSuccess.value = false;
      throw error;
    }
  };

  const logout = async () => {
    await client.post("/api/v1/logout");
    user.value = null;
    token.value = null;
  };

  return {
    user,
    token,
    errorApi,
    errorApiMessage,
    errorApiMessageSecondLine,
    isRequestSuccess,
    responseFromApi,
    isLoggedIn,
    register,
    login,
    logout,
    fetchUser,
    fetchHome: fetchPublic,
  };
};
