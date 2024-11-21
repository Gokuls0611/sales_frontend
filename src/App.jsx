import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoadingSpinner from './Screens/LoadingComponent';
import Dashboard from './Screens/Dashboard';

const Login = React.lazy(() => import('./Screens/Login'));
const PageNotFound = React.lazy(()=>import('./Screens/PageNotFound'))

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/dashboard" element= {<Dashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
