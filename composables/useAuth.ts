import axios from "axios";

export type User = {
  userName: string;
};

export type LoginResponse = {
  userName: string;
  accessToken: string;
};

export type LoginPayload = {
  userName: string;
  passWord: string;
};

export const useAuth = () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const errorApi = ref<boolean>(false);
  const errorApiMessage = ref<string | null>(null);
  const isRequestSuccess = ref<boolean>(false);
  const responseFromApi = ref<string | null>(null);

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
    console.log("useAuth isLoggedIn changed:", newValue);
    await nextTick();
    console.log("DOM refreshed");
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>("/api/me");
      user.value = response.data;
    } catch {
      logout();
    }
  };

  watch(user, (newvalue) => {
    console.log("user changed", newvalue);
  });

  const login = async (payload: LoginPayload) => {
    const response = await axios.post<LoginResponse>("/api/login", payload);
    console.log(response, user.value, token.value, isLoggedIn.value);
    user.value = { userName: response.data.userName };
    token.value = response.data.accessToken;
    console.log(response, user.value, token.value, isLoggedIn.value);
  };

  const logout = async () => {
    await axios.post("/api/logout");
    user.value = null;
    token.value = null;
    console.log("logout", user.value, token.value, isLoggedIn.value);
  };

  console.log("useAuth", user.value, token.value, isLoggedIn.value);

  return {
    user,
    token,
    errorApi,
    errorApiMessage,
    isRequestSuccess,
    responseFromApi,
    isLoggedIn,
    logout,
    login,
    fetchUser,
  };
};
