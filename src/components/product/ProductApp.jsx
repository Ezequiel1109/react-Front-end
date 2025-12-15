import { useCallback, useEffect, useState } from "react";
import { ProductTable } from "./ProductTable";
import { PropTypes } from "prop-types";
import { ProductForm } from "./ProductForm";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../../features/productsSlice";
import {
  selectIsAuth,
  selectProducts,
  selectProductsLoading,
} from "../../features/selectors";
import { Link } from "react-router-dom";
import { Alert } from "../Alert";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

//Spinner reutilizable
const Spinner = () => (
  <div className="d-flex justify-content-center mt-5">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

//Modal reutilizable para el formulario
const ProductModal = ({ show, onClose, onSave, productSelected ={} }) => {
  const product = productSelected || {
    id: 0,
    name: "",
    price: "",
    quantity: "",
    description: "",
  };
  return (
    <Modal show={show} onHide={onClose} aria-labelledby="modal-product-title"
      centered
      role="dialog">
      <Modal.Header closeButton>
        <Modal.Title id="modal-product-title">
          {product.id > 0 ? "Editar Producto" : "Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm handlerAdd={onSave} productSelected={product} />
      </Modal.Body>
    </Modal>
  );
};
ProductModal.propTypes={
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  productSelected: PropTypes.object,
}

export const ProductApp = ({ title }) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  //usamos los selectores memoizados
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const isAuth = useSelector(selectIsAuth);

  const [message, setMessage] = useState(null);
  const [productSelected, setProductSelected] = useState({
    id: 0,
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  // 🔍 DEBUG
  console.log('🔍 Products:', products);
  console.log('📊 Is Array?:', Array.isArray(products));
  console.log('⏳ Loading:', isLoading);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchProducts())
        .unwrap()
        .then((data) => {
          console.log('✅ Products loaded:', data);
        })
        .catch((err) => {
          toast.error(
            err?.message || "Ocurrió un error al cargar los productos"
          );
        });
    }
  }, [dispatch, isAuth]);

  const handlerAddProduct = useCallback(
    async (product) => {
      if (
        !product.name ||
        !product.price ||
        !product.quantity ||
        !product.description ||
        isNaN(Number(product.price)) ||
        isNaN(Number(product.quantity))
      ) {
        toast.error("Por favor, completa todos los campos correctamente.");
        return;
      }

      const productSend = {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      };
      try {
        if (product.id > 0) {
          await dispatch(updateProduct(productSend)).unwrap();
          toast.success("Producto actualizado correctamente");
          setTimeout(() => toast.dismiss(), 1000);
        } else {
          await dispatch(addProduct(productSend)).unwrap();
          toast.success("Producto agregado correctamente");
          setTimeout(() => toast.dismiss(), 1000);
        }
        setProductSelected({
          id: 0,
          name: "",
          price: "",
          quantity: "",
          description: "",
        });
        setShowModal(false); // cerramos el modal
      } catch (error) {
        toast.error(
          error?.message || "Ocurrió un error al guardar el producto"
        );
      }
    },
    [dispatch]
  );

  const handlerRemoveProduct = useCallback(
    async (id) => {
      try {
        if (
          window.confirm("¿Estás seguro de que deseas eliminar este producto?")
        ) {
          await dispatch(deleteProduct(id)).unwrap();
          toast.success("Producto eliminado correctamente");
          setTimeout(() => toast.dismiss(), 1000);
        }
      } catch (error) {
        toast.error(error?.message || "Error al eliminar el producto");
        setTimeout(() => toast.dismiss(), 1000);
      }
    },
    [dispatch]
  );

  const handlerProductSelected = useCallback((product) => {
    setProductSelected({ ...product });
    setShowModal(true); // abrimos el modal
  }, []);

  const handlerNewProduct = useCallback(() => {
    setProductSelected({
      id: 0,
      name: "",
      price: "",
      quantity: "",
      description: "",
    });
    setShowModal(true); // abrimos el modal
  }, []);

  if (!isAuth) {
    return (
      <div className="alert alert-warning text-center mt-5">
        <h4>Acceso Restringido</h4>
        <p>
          Por favor, <Link to="/login">inicia sesión</Link> para ver y gestionar
          los productos.
        </p>
      </div>
    );
  }
  return (
    <div className="container my-4">
      <h1>{t("products.title")}</h1>
      <button className="btn btn-primary mb-3" onClick={handlerNewProduct}>
        {t("products.newButton")}
      </button>
      {message && (
        <Alert
          type={message.type}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        productSelected={productSelected}
        onSave={handlerAddProduct}
      />
      <div className="row">
        <div className="col">
          {isLoading ? (
            <Spinner />
          ) : products.length > 0 ? (
            <ProductTable
              products={Array.isArray(products) ? products : []}
              handlerRemove={handlerRemoveProduct}
              handlerProductSelected={handlerProductSelected}
            />
          ) : (
            <div className="alert alert-warning">
              No hay productos en el sistema!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductApp.propTypes = {
  title: PropTypes.string.isRequired,
};
