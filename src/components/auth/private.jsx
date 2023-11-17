import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          children
        ) : (
          <Navigate
            to="/auth"
            replace
          />
        )
      }
    />
  )
}