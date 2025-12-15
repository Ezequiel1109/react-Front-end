export const Loader = () => (
  <div className="loader-overlay">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    <style>
      {`
        .loader-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
      `}
    </style>
  </div>
);