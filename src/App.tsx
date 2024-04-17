import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import VerifyCode from './components/VerifyCode/VerifyCode';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AuthSuccess from './components/AuthSuccess/AuthSuccess';
import NotFound from './components/NotFound/NotFound';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './guard/PrivateRoute/PrivateRoute';
import Pricing from './components/Pricing/Pricing';
import Theme from './components/Theme/Theme';
import Admin from './pages/Admin/Admin';
import TunnelComp from './pages/TunnelComp/TunnelComp';
import NotificationComponent from './components/NotificationComponent/NotificationComponent';
import AdminRoute from './guard/PrivateRoute/AdminRoute';
import TunnelEdit from './components/TunnelEdit/TunnelEdit';
import TemplateShow from './components/TemplateShow/TemplateShow';
// import { apiUrl } from './api/apiUtils';
// import TemplateEditor from './components/TemplateEditor/TemplateEditor';
import TemplateView from './components/TemplateView/TemplateView';
import SiteEditor from './components/SiteEditor/SiteEditor';
import TestSortList from './components/TestSortList/TestSortList';
import ContentPage from './components/ContentPage/ContentPage';

const App: React.FC = () => {
  
  useEffect(() => {
    // const fetchCsrfToken = async () => {
    //   try {
    //     const response = await fetch(apiUrl + 'get-csrf-token');
    //     if (!response.ok) {
    //       throw new Error('Erreur lors de la récupération du jeton CSRF');
    //     }

    //     const data = await response.json();
    //     const csrfToken = data.csrfToken;

    //     // Set the CSRF token as a meta tag in the head of the page
    //     const metaTag = document.createElement('meta');
    //     metaTag.name = 'csrf-token';
    //     metaTag.content = csrfToken;
    //     document.head.appendChild(metaTag);

    //     // Utilize the CSRF token according to your needs
    //     console.log('CSRF Token:', csrfToken);
    //   } catch (error: any) {
    //     console.error(error.message);
    //   }
    // };

    // fetchCsrfToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes sans en-tête ni pied de page */}


        {/* Routes avec en-tête et pied de page */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <Header />
              <SignIn />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Header />
              <SignUp />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/verification/:partial_token"
          element={
            <>
              <Header />
              <VerifyCode />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/verification-email/:partial_token"
          element={
            <>
              <Header />
              <VerifyEmail />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/reset-password/:reset_password_token"
          element={
            <>
              <Header />
              <ResetPassword />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/reset-email/:partial_token"
          element={
            <>
              <Header />
              <VerifyCode />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <>
              <Header />
              <ForgotPassword />
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/auth/success"
          element={
            <>
              <Header />
              <AuthSuccess />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <>
              <Header />
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/tunnel"
          element={
            <>
              <Header />
              <PrivateRoute>
                <TunnelComp />
              </PrivateRoute>
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/tunnel/:tunnelId/custom"
          element={
            <>
              <Header />
              <PrivateRoute>
                <TunnelEdit />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/template/:templateId/:tunnelId/show"
          element={
            <>
              <PrivateRoute>
                <TemplateShow />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/template/:stepId/:tunnelId/editor"
          element={
            <>
              <PrivateRoute>
                <SiteEditor />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/template/:stepId/:tunnelId/view"
          element={
            <>
              <PrivateRoute>
                <TemplateView />
              </PrivateRoute>
            </>
          }
        />

        <Route
          path="/admin/*"
          element={
            <>
              {/* <Header /> */}
              <AdminRoute>
                <Admin />
              </AdminRoute>
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/admin/:model"
          element={
            <>
              {/* <Header /> */}
              <AdminRoute>
                <Admin />
              </AdminRoute>
              {/* <Footer /> */}
            </>
          }
        />

        <Route
          path="/dashboard/:page"
          element={
            <>
              <Header />
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              <Footer />
            </>
          }
        />
        <Route path="/pricing" element={
          <>
            <Header />
            <Pricing />
            <Footer />
          </>
        } />
        <Route path="/page/:slug" element={
          <>
            <Header />
            <ContentPage />
            <Footer />
          </>
        } />
        <Route path="/test" element={
          <>
            <Header />
            <TestSortList />
          </>
        } />

        {/* Route par défaut avec en-tête et pied de page */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <NotFound />
              <Footer />
            </>
          }
        />
      </Routes>
      <Theme />
      <NotificationComponent />
    </BrowserRouter>
  );
};

export default App;
