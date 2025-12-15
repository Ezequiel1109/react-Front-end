import PropTypes from "prop-types";

export const Alert = ({type, message, onClose}) => (
      <div className={`alert alert-${type} alert-dismissible`} role="alert">
    {message}
    {onClose && (
      <button type="button" className="btn-close" onClick={onClose}></button>
    )}
  </div>
);
Alert.propTypes = {
  type: PropTypes.oneOf(["success", "danger", "warning", "info"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};