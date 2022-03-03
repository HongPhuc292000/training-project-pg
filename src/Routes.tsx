import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';


const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const UserManagementPage = lazy(() => import('./modules/home/pages/UserManagement'));
const ListProductManagementPage = lazy(() => import('./modules/home/pages/ListProductManagement'));


interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path={ROUTES.userManager} component={UserManagementPage} />
        <Route path={ROUTES.listProductManager} component={ListProductManagementPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
