import axios from "axios";

//configuracion axios
const apiUser = axios.create({
  baseURL: "http://localhost:64410/api/",
  timeout: 10000, // tiempo de espera de 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptor para limpiar los datos antes de enviar
apiUser.interceptors.request.use(
  (config) => {
    const publicEndpoints = ["user/login", "user/register"];
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if(!isPublicEndpoint){
      const token = localStorage.getItem("token");
      if(token){
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    //limpia los datos del objeto anidados,elimina la serealizacion innecesaria de objetos
    if (config.data && typeof config.data === "object") {
      Object.keys(config.data).forEach((key) => {
        if (config.data[key] === null || config.data[key] === undefined) {
          delete config.data[key];
        }
      });
    }
    console.log("=== AXIOS REQUEST URL===", config.url);
    console.log("Method:", config.method);
    console.log("Is Public:", isPublicEndpoint);
    console.log("Has Token:", !!config.headers.Authorization);
    return config;
  },
  (error) => Promise.reject(error)
);

//creacion del interceptor response - manejar errores
apiUser.interceptors.response.use(
  (response) => {
    //es la respuesta deol array de los productos
    console.log("=== AXIOS RESPONSE ===", "Data:", response.data);
    return response;
  },
  (error) => {
    console.error("=== AXIOS ERROR ===");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);

      if(error.response){
        if(error.response.status === 401 || error.response.status === 403){
          //manejar el error de autorizacion
          localStorage.removeItem("token");
        }
      }
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
export default apiUser;
