import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './api/store';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
// import GrievancesPage from './pages/Grievances/GrievancesPage';
// import GrievanceDetail from './pages/Grievances/GrievanceDetailPage';
import GrievanceList from './features/grievances/GrievanceList';
// import GrievanceDetails from './features/grievances/GrievanceDetail';
import GrievanceForm from './features/grievances/GrievanceForm';
import NotFound from './pages/404';
import GrievanceDetailPage from './pages/Grievances/GrievanceDetailPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Layout wrapper for all public routes */}
          <Route element={<Layout />}>
            <Route path='/' element={<Dashboard />} />

            {/* Grievance Routes */}
            {/* <Route path="grievances">
              <Route index element={<GrievancesPage />} />
              <Route path="new" element={<GrievanceForm />} />
              <Route path=":id" element={<GrievanceDetail />} />
            </Route> */}

            {/* You can choose to use either GrievanceList or GrievancesPage */}
            <Route path="/grievances/all" element={<GrievanceList />} />
            <Route path="/grievances/new" element={<GrievanceForm />} />
            <Route path="/grievances/:id" element={<GrievanceDetailPage />} />
      
          </Route>

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
