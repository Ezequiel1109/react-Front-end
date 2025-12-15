import { PropTypes } from "prop-types";
import React from "react";

export const ProductDetail = React.memo(
  ({ handlerProductSelected, handlerRemove, product = [] }) => (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.description}</td>
      <td>
        <button
          className="btn btn-secondary btn-sm me-2"
          onClick={() => handlerProductSelected(product)}
          aria-label={`Editar producto ${product.name}`}
          type="button"
        >
          <i className="bi bi-pencil"></i> {/* Bootstrap Icons */}
          <span className="visually-hidden">Editar</span>
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handlerRemove(product.id)}
          aria-label={`Eliminar producto ${product.name}`}
          type="button"
        >
          <i className="bi bi-trash"></i>
          <span className="visually-hidden">Eliminar</span>
        </button>
      </td>
    </tr>
  )
);

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
  handlerRemove: PropTypes.func.isRequired,
  handlerProductSelected: PropTypes.func.isRequired,
};
