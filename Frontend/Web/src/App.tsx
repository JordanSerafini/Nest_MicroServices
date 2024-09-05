import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import DevisPage from "./pages/devis/DevisPage";
import Clients from "./pages/clients/Clients";
import Articles from "./pages/articles/Articles";
import Map from "./pages/map/Map";
import AllMap from "./components/leaflet/LeafletAll";
import Stock from "./pages/stock/Stock";
import Settings from "./pages/settings/Settings";
import Fournisseur from "./pages/supplier/Suppliers";
import Favoris from "./pages/favoris/Favoris";
import Login from "./pages/login/Login";
import Form from "./pages/form/form";
import SendForm from "./pages/form/SendForm";
import UpdatePage from "./pages/update/UpdatePage";
import CustomerSyncChecker from "./pages/update/updateCustomerPage";
import ItemSyncChecker from "./pages/update/UpdateItemPage";
import Ui from "./pages/UI/Ui";
import Planing from "./pages/planing/Planing";
import Maintenance from "./pages/maintenance/Maintenance";
import { Pdftrain } from "./pages/devis/devistrain";

import PrivateRoute from "./utils/middleware/PrivateRoute";
import Page404 from "./pages/404/404";

import { NotificationsProvider } from "./context/NotificationsContext";
import { GlobalProvider } from "./context/globalContext";

function App() {

  

  return (
    <NotificationsProvider>
      < GlobalProvider>
      <Router>
        <div className="relative w-screen h-screen">
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/devis" element={<DevisPage />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/mapClient" element={<Map />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/fournisseurs" element={<Fournisseur />} />
              <Route path="/favoris" element={<Favoris />} />
              <Route path="/map" element={<AllMap />} />
              <Route path="/form" element={<Form />} />
              <Route path="/update" element={<UpdatePage />} />
              <Route path="/updateCustomer" element={<CustomerSyncChecker />} />
              <Route path="/updateItem" element={<ItemSyncChecker />} />
              <Route path="/sendform" element={<SendForm />} />
              <Route path="/ui" element={<Ui />} />
              <Route path="/planing" element={<Planing />} />
              <Route path="/maintenance" element={<Maintenance />} />

              <Route path="/pdftrain" element={<Pdftrain />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
      </GlobalProvider>
    </NotificationsProvider>
  );
}

export default App;
