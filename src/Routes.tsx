import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import LoadingModal from './modules/home/common/LoadingModal';


const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const UserManagementPage = lazy(() => import('./modules/home/pages/UserManagement'));
const ListProductManagementPage = lazy(() => import('./modules/home/pages/ListProductManagement'));
const CreateProductPage = lazy(() => import('./modules/home/pages/CreateProduct'));
const DetailProductPage = lazy(() => import('./modules/home/pages/ProductDetails'));
const DetailVendorPage = lazy(() => import('./modules/home/pages/UserDetails'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingModal/>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path={ROUTES.userManager} component={UserManagementPage} />
        <Route path={ROUTES.listProductManager} component={ListProductManagementPage} />
        <Route path={ROUTES.createProduct} component={CreateProductPage} />
        <Route path={`${ROUTES.detailProduct}/:id`} component={DetailProductPage} />
        <Route path={`${ROUTES.detailVendor}/:id`} component={DetailVendorPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
