import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/forms/RegisterForm';
import { checkUser } from './auth';

function ViewDirectorBasedOnUserAuthStatus({ component: Component, pageProps }) {
  const [databaseUser, setDatabaseUser] = useState({});

  const { user, userLoading, updateUser } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      checkUser(user.uid).then(setDatabaseUser);
    }
  }, [user]);

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // Check if user is logged in
  if (user) {
    // Check if the user has registered
    if (user.uid !== databaseUser.uid) {
      // Show RegisterForm if user has not registered
      return <RegisterForm user={user} updateUser={updateUser} />;
    }
    // If user has registered, show the home page or main content
    return (
      <>
        <NavBar />
        <Component {...pageProps} /> {/* Render children for home page or main content */}
      </>
    );
  }

  // Show SignIn if user is not logged in
  return <Signin />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
