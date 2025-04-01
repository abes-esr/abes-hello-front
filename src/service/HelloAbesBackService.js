import axios from 'axios'
import { userAuth } from "@/store/userAuth";

export class HelloAbesBackService {
    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_APP_ROOT_API,
            timeout: 2000
        })

        // ajout de l'intercepteur
        this.client.interceptors.response.use(
            (response) => {
                console.log("interceptor.response response")
                // TODO tester la validité de l'inscription de la réponse dans le store et si correct alors ne pas renvoyer la réponse au composant
                if (response.data.accessToken) {
                    console.log("cas du accessToken : " + response.data.userName + " / " + response.data.accessToken)
                    userAuth().setLoginData(response.data.userName, response.data.accessToken);
                } else if (response.data.passWord) {
                    userAuth().setLoginData(response.data.userName, response.data.passWord)
                }
                return response;
            },
            (error) => {
                if(error.response) {
                    const statusCode = error.response.status;
                    let errorMessage = "";
                    if(error.response.data.debugMessage) {
                        errorMessage = error.response.data.debugMessage.toString() || 'Une erreur est survenue';
                    }
                    if (statusCode.toString().startsWith("4")) {
                        userAuth().setError(errorMessage)
                    } else if (statusCode.toString().startsWith("5")) {
                        userAuth().setError(error.response.data.error)
                    }
                } else if (error.request) {
                    console.error("interceptors.response error.request")
                } else {
                    console.error("interceptors.response else", error.message);
                }
                return Promise.reject(error);
            }
        )
    }

    apiTestConnexion() {
        return this.client.get('/');
    }

    sendApi(auth) {
        return this.client.post('/register', auth)
            .then((response) => {
                const userData = {
                    accessToken: response.passWord,
                    userName: response.userName,
                }
                userAuth().setResponseFromApi("Votre inscription a bien été enregistrée.")
                return "Success";
            })
            .catch(error => {
                return Promise.reject(error);
            })
    }

    login(auth) {
        return this.client.post('/login', auth)
            .then((response) => {
                const userData = {
                    accessToken: response.accessToken,
                    userName: response.userName,
                }
                // TODO placer les informations dans le store via Pinia
                return userData;
            })
            .catch(error => {
                return Promise.reject(error);
            })
    }
}
export default new HelloAbesBackService();