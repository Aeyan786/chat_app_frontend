import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import store from "./Redux/store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from "redux-persist/es/persistStore";


let persistor = persistStore(store)


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

        <App />
      <Toaster />
        </PersistGate>
      </Provider>
  </BrowserRouter>
    </StrictMode>
);
