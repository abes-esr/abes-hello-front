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
}

export type RegisterResponse= {
  userName: string;
  accessToken: string;
}

export type LoginPayload = {
  userName: string;
  passWord: string;
};

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const token = useState<string | null>("token", () => null);
  const errorApi = useState<boolean>("errorApi", () => false);
  const errorApiMessage = useState<string | null>("errorApiMessage", () => null);
  const isRequestSuccess = useState<boolean>("isRequestSuccess", () => false);
  const responseFromApi = useState<string | null>("responseFromApi", () => null);

  // Initialiser 'user' depuis sessionStorage si disponible
  onMounted(() => {
    if (import.meta.env.CLIENT) {
      console.log("recuperation du user");
      const sessionStorageUser = sessionStorage.getItem("user");
      if (sessionStorageUser) {
        user.value = JSON.parse(sessionStorageUser);
      }
      token.value = sessionStorage.getItem("token");
    }
  });

  // Computed property pour déterminer si l'utilisateur est connecté
  const isLoggedIn = computed(() => {
    console.log("useAuth, const IsloggedIn computed : " + token.value + " / " + user.value)
    return !!token.value && !!user.value;
  });

  // Effectue les mises à jour dans sessionStorage
  watchEffect(() => {
    if (import.meta.env.CLIENT) {
      console.log("mise a jour local");
      if (user.value) {
        sessionStorage.setItem("user", JSON.stringify(user.value));
      } else {
        sessionStorage.removeItem("user");
      }

      sessionStorage.setItem("token", token.value ?? "");
    }
  });

  watch(isLoggedIn, async (newValue) => {
    await nextTick();
    console.log("DOM refreshed");
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>("/api/me");
      user.value = response.data;
    } catch {
      await logout();
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      const response = await axios.post<RegisterResponse>("/api/register", payload);
      responseFromApi.value = "Votre inscription a bien été enregistrée. Vous pouvez maintenant vous connecter";
      isRequestSuccess.value = true;
      console.log("const resgister : ", user.value, token.value, isLoggedIn.value);
    } catch (error) {
      errorApiMessage.value = "Votre inscription a échoué. Veuillez recommencer.";
      isRequestSuccess.value = false;
      console.log(error);
      throw error;
    }
  };


  const login = async (payload: LoginPayload) => {
    try {
      const response = await axios.post<LoginResponse>("/api/login", payload);
      user.value = { userName: response.data.userName };
      token.value = response.data.accessToken;
      console.log("const login : ", user.value, token.value, isLoggedIn.value);
    } catch (error) {
      responseFromApi.value = "Une erreur est survenue. Veuillez recommencer.";
      isRequestSuccess.value = false;
      console.log(error)
    }
  };

  const logout = async () => {
    await axios.post("/api/logout");
    user.value = null;
    token.value = null;
    console.log("logout", user.value, token.value, isLoggedIn.value);
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
