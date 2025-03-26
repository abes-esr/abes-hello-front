import axios from 'axios'
import { userAuth } from "@/store/userAuth";

export class HelloAbesBackService {
    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_APP_ROOT_API,
            timeout: 2000
        })

        // ajout de l'intercepteur
        this.client.interceptors.request.use(
            (config) => {
                const authStore = userAuth();
                if (authStore.isLogged && authStore.authenticated) {
                    config.headers.Authorization = authStore.authenticated;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )
    }

    apiTestConnexion() {
        return this.client.get('/');
    }

    sendApi(auth) {
        return this.client.post(auth)
    }
}
export default new HelloAbesBackService();