import axios from "axios";
// import { userAuth } from "~/stores/userAuth";

export class HelloAbesBackService {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_APP_ROOT_API,
      timeout: 2000,
    });

    // ajout de l'intercepteur
    this.client.interceptors.response.use(
      (response) => {
        if (response.data.accessToken) {
          userAuth().setLoginData(
            response.data.userName,
            response.data.accessToken
          );
        } else if (response.data.passWord) {
          userAuth().setLoginData(
            response.data.userName,
            response.data.passWord
          );
        }
        return response;
      },
      (error) => {
        if (error.response) {
          const statusCode = error.response.status;
          let errorMessage = "";
          if (error.response.data.debugMessage) {
            errorMessage =
              error.response.data.debugMessage.toString() ||
              "Une erreur est survenue";
          }
          if (statusCode.toString().startsWith("4")) {
            userAuth().setError(errorMessage);
          } else if (statusCode.toString().startsWith("5")) {
            userAuth().setError(error.response.data.error);
          }
        } else if (error.request) {
          console.log("Erreur lors de la requête : " + error);
        } else {
          console.log("Erreur non déterminée : " + error);
        }
        return Promise.reject(error);
      }
    );
  }

  apiTestConnexion() {
    return this.client.get("/");
  }

  // sendApi(auth) {
  //   return this.client
  //     .post("/register", auth)
  //     .then(() => {
  //       userAuth().setResponseFromApi(
  //         "Votre inscription a bien été enregistrée."
  //       );
  //       return "Success";
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // }

  // login(auth) {
  //   return this.client
  //     .post("/login", auth)
  //     .then((response) => {
  //       return {
  //         accessToken: response.accessToken,
  //         userName: response.userName,
  //       };
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // }

  // getAccessToCommandsList() {
  //   const configTest = {
  //     headers: { Authorization: "Bearer " + userAuth().getToken },
  //   };
  //   return this.client
  //     .get("/secured", configTest)
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // }
  //
  // getCommandsListFromApi() {
  //   const configTest = {
  //     headers: { Authorization: "Bearer " + userAuth().getToken },
  //   };
  //   return this.client
  //     .get("/secured/commande", configTest)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // }
}

export default new HelloAbesBackService();
