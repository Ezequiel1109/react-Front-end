import apiUser from "../config/axiosConfig";

export const findAll = async () => {
  try {
    const response = await apiUser.get("products?page=0&size=10");
    console.log("Respuesta de /api/products:", response)
    return response.data;
  } catch (error) {
    console.error("Error en findAll:", error);
    throw error;
  }
};

export const create = async (product) => {
  try {
    const response = await apiUser.post("products?page=0&size=10", product);
    return response.data;
  } catch (error) {
    throw error;
  }
  //return undefined;
};

export const update = async (product) => {
  try {
    const response = await apiUser.put(`products/${product.id}?page=0&size=10`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
  //return undefined;
};

export const remove = async (id) => {
  try {
    await apiUser.delete(`products/${id}?page=0&size=10`);
    return true;
  } catch (error) {
    throw error;
  }
};
