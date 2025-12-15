import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Esquema de validacion con Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  price: yup
    .number()
    .typeError("El precio debe ser un número")
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0"),
  quantity: yup
    .number()
    .typeError("La cantidad debe ser un número")
    .required("La cantidad es obligatoria")
    .min(1, "La cantidad debe ser al menos 1"),
  description: yup
    .string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

export const ProductForm = ({ productSelected, handlerAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: productSelected
  });
  // sincorniza el formulario cuando cambia el producto seleccionado
  useEffect(() => {
    reset(productSelected);
  }, [productSelected, reset]);

  return (
    <form onSubmit={handleSubmit(handlerAdd)} className="form-inline">
      <div className="mb-3">
        <input
          type="text"
          className={`form-control my-3 w-75 ${errors.name ? "is-invalid" : ""}`}
          name="Name"
          placeholder="name"
          {...register("name")}
        />
        {errors.name && <div className="alert alert-danger">{errors.name.message}</div>}
      </div>
      <div>
        <input
          type="text"
          className={`form-control my-3 w-75 ${errors.price ? "is-invalid" : ""}`}
          name="Price"
          placeholder="price"
          {...register("price")}
        />
        {errors.price && (
          <div className="alert alert-danger">{errors.price.message}</div>
        )}
      </div>
      <div>
        <input
          type="text"
          className={`form-control my-3 w-75 ${errors.quantity ? "is-invalid" : ""}`}
          name="Quantity"
          placeholder="quantity"
          {...register("quantity")}
        />
        {errors.quantity && (
          <div className="alert alert-danger">{errors.quantity.message}</div>
        )}
      </div>
      <div>
        <input
          type="text"
          className={`form-control my-3 w-75 ${errors.description ? "is-invalid" : ""}`}
          name="Descripcion"
          placeholder="description"
          {...register("description")}
        />
        {errors.description && (
          <div className="alert alert-danger">{errors.description.message}</div>
        )}
      </div>
      <div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {/* {form.id > 0 ? "Actualizar Producto" : "Agregar Producto"} */}Guardar
        </button>
      </div>
    </form>
  );
};
ProductForm.propTypes = {
  productSelected: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
  }).isRequired,
  handlerAdd: PropTypes.func.isRequired,
};
