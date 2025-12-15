import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { selectIsAuth, selectUsername } from "../features/selectors";

export function Navbar () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogin = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  //selectores memoizados
  const isAuth = useSelector(selectIsAuth);
  const userMemoized = useSelector(selectUsername);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        {isLogin ?(
          <span className="navbar-brand">Mi App Productos</span>
        ):(<Link className="navbar-brand" to="/products">
          Mi App Productos
        </Link>)}
        {!isLogin && (
          <div className="navbar-nav ms-auto">
            {isAuth ? (
              <div className="user-menu">
                <span className="navbar-text me-3">
                  Bienvenido, {userMemoized}
                </span>
                {/* <Link to="/products" className="nav-link">
                  Productos
                </Link> */}
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Cerrar Sesión
                </button>
                
              </div>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Registro
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
