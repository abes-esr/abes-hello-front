export type User = Record<string, unknown>;

export type ResponseFromApi = Record<string, unknown>;


export const useAuth = () => {
    const user = useState<User | null>('user', () => {
        const localStorageUser = sessionStorage.getItem('user');
        if (localStorageUser) {
            return JSON.parse(localStorageUser);
        }
        return null
    });
    const token = useState<string | null>('token', () => sessionStorage.getItem('token'))
    const authenticated = computed(() => !!token.value)
    const errorApi = useState<boolean>('errorApi', () => false)
    const errorApiMessage = useState<string | null>('errorApiMessage', () => null)
    const isRequestSuccess = useState<boolean>('isRequestSuccess', () => false)
    const responseFromApi = useState<ResponseFromApi | null>('responseFromApi', () => null)
    const isLoggedIn = useState<boolean>('isLoggedIn', () => false)

    watch(user, (newUser) => {
        sessionStorage.setItem('user', JSON.stringify(newUser))
    })

    watch(token, (newToken) => {
        sessionStorage.setItem('token', JSON.stringify(newToken))
    })

    const setLoginData = (userData: User, tokenData: string) => {
        user.value = userData;
        token.value = tokenData;
        isRequestSuccess.value = true;
        isLoggedIn.value = true;
    }

    const logout = () => {
        user.value = null;
        token.value = null;
        isLoggedIn.value = false;
    };

    const setResponseFromApi = (response: ResponseFromApi) => {
        responseFromApi.value = response;
    };

    const setRequestSuccess = (stateRequestSuccess: boolean) => {
        isRequestSuccess.value = stateRequestSuccess;
    };

    const setError = (errorMessage: string) => {
        errorApi.value = true;
        errorApiMessage.value = errorMessage;
    };

    // Refactor plus intéressant

    const login = () => {
        // Faire l'appel API
        // Mettre à jour directement les valeurs
    }

    // Cela permettrait de retourner uniquement une fonction de login qui gérerait l'état des variables directement et il n'y aurait plus de nécessité à utiliser et retourner les autres fonctions du dessus

    return {user, token, authenticated, errorApi, errorApiMessage, isRequestSuccess, responseFromApi, isLoggedIn, setLoginData, logout, setResponseFromApi, setRequestSuccess, setError, login}
}