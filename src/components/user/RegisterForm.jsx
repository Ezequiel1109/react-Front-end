import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRegister } from "../../features/authSlice";
import { selectAuthLoading } from "../../features/selectors";
import { toast } from "react-toastify"; 
import { Loader } from "../Loader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  //selector memoizado
  const isLoading = useSelector(selectAuthLoading);
  
  // Esquema de validacion con Yup
  const schema = yup.object().shape({
    username: yup.string().required("El nombre de usuario es obligatorio."),
    email: yup.string().email("El email no es válido.").required("El email es obligatorio."),
    password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres.").required("La contraseña es obligatoria."),
  });

  //

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setMessage(null);
    try {
      await dispatch(addRegister(data)).unwrap();
      reset();
      toast.success("Usuario registrado correctamente."); 
      navigate("/login");
    } catch (error) {
      console.log("Error recibido:", error);
      // Captura el error lanzado por unwrap y Axios
      let backField = error?.response?.data?.field || error?.field;
      let backMessage = error?.response?.data?.message || error?.message || error?.response?.data;
      if (backField && backMessage) {
        setError(backField, { message: backMessage });
        setMessage(null);
      } else {
        toast.error(backMessage || "Error al registrar el usuario.");
        setTimeout(() => toast.dismiss(), 1000);
      }
    }
  }; 
  return (
    <div className="card mx-auto my-4" style={{ maxWidth: 400 }}>
      {isLoading && <Loader />}
      <div className="card-body">
        <h4 className="card-title mb-4">Registro</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="form-inline">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nombre de usuario"
              className={`form-control my-3 w-75 ${
                errors.username || serverErrors.username ? "is-invalid" : ""
              }`}
              {...register("username")}
            />
            {(errors.username || serverErrors.username) && (
              <div className="invalid-feedback d-block">
                {errors.username?.message || serverErrors.username}
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Contraseña"
              className={`form-control my-3 w-75 ${
                errors.password || serverErrors.password ? "is-invalid" : ""
              }`}
              {...register("password")}
            />
            {(errors.password || serverErrors.password) && (
              <div className="invalid-feedback d-block">
                {errors.password?.message || serverErrors.password}
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className={`form-control my-3 w-75 ${
                errors.email || serverErrors.email ? "is-invalid" : ""
              }`}
              {...register("email")}
            />
            {(errors.email || serverErrors.email) && (
              <div className="invalid-feedback d-block">
                {errors.email?.message || serverErrors.email}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isSubmitting || isLoading}
          >
            { isLoading  ? "Registrando..." : "Registrarse"}
          </button>
          <div className="form-footer">
            <p>
              ¿Ya tienes cuenta?
              <Link to="/login" className="link"> Inicia sesión aquí</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
