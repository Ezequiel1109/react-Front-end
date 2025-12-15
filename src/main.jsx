import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ProductApp } from "./components/product/ProductApp.jsx";
import { LoginForm } from "./components/user/LoginForm.jsx";
import { RegisterForm } from "./components/user/RegisterForm.jsx";
import { Provider, useDispatch, useSelector} from "react-redux";
import { store } from "./store/store.js";
import { Navbar } from "./components/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { selectToken } from "./features/selectors.js";
import { fetchUserProfile } from "./features/authSlice.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./i18n.js";

function TokenReturned(){
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if(token){
      dispatch(fetchUserProfile())
      .unwrap()
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
    }
  }, [dispatch, token]);
  
  return null;
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <TokenReturned />
        <Routes>
          <Route path="/" element={<LoginForm title="Productos!"/>} />
          <Route path="/products" element={<PrivateRoute><ProductApp title="Productos!"/></PrivateRoute>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Ruta 404 - página no encontrada */}
          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>Página no encontrada</h2>
                <p>La página que buscas no existe.</p>
              </div>
            }
          />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
