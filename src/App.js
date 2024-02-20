import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "./helpers/AuthGuard";
import { Toaster } from "sonner";
import { io } from "socket.io-client";
// import { URL_API } from "./helpers/config";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Pages
import ErrorPage from "../src/pages/ErrorPage";
import PrincipalPage from "../src/pages/PrincipalPage";
import ProductosPage from "../src/pages/ProductosPage";
import DetallePage from "../src/pages/DetallePage";
import MiBolsaPage from "../src/pages/MiBolsaPage";
import MiPerfilPage from "../src/pages/MiPerfilPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrderCanceled from "./pages/OrderCanceled";
import DetallePedidos from "./pages/DetallePedidos";

//Context
import { UserProvider } from "./context/UserContext";
import { CarritoProvider } from "./context/CarritoContext";

function App() {

  const socket = io();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <UserProvider>
          <CarritoProvider>
            <Toaster position="bottom-left" visibleToasts={2} expand={true} gap={2}/>
            <Navbar />
            <Routes>
              <Route exact path = "/" element = {<PrincipalPage />} />
              <Route path = "/productos/:categoria/:plataforma" element = {< ProductosPage />} />
              <Route path = "/detalle/:idProducto" element = {< DetallePage />} />
              <Route path = "/mi-bolsa" element = {<MiBolsaPage />} />
              <Route path = "/cuenta/:loginRegister" element = {<MiPerfilPage socket={socket} />} />
              <Route path = "/order-success" element = {<AuthGuard component={OrderSuccess} socket={socket}/>}/>
              <Route path = "/order-canceled" element = {<AuthGuard component={OrderCanceled} />} />
              <Route path = "/cuenta/detalle/:info" element = {<AuthGuard component={DetallePedidos} />} />
              <Route path = "*" element = {<ErrorPage />} />
            </Routes>
            <Footer/>
          </CarritoProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
