import React from "react";
import { ProductDetail } from "./ProductDetail";
import { PropTypes } from "prop-types";

export const ProductTable = React.memo(
  ({ handlerProductSelected, handlerRemove, products = [] }) => {
    const productsList = Array.isArray(products) ? products : [];
    return (
      <table
        className="table table-dark table-hover "
        role="table"
        aria-label="Tabla de productos"
      >
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productsList.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No hay productos disponibles.
              </td>
            </tr>
          ) : (
            productsList.map((product) => (
              <ProductDetail
                handlerProductSelected={handlerProductSelected}
                handlerRemove={handlerRemove}
                product={product}
                key={product.id}
              />
            ))
          )}
        </tbody>
      </table>
    );
  }
);

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  handlerRemove: PropTypes.func.isRequired,
  handlerProductSelected: PropTypes.func.isRequired,
};
