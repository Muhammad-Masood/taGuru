import ReactDOM from "react-dom";

// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// project imports
import * as serviceWorker from "serviceWorker";
import App from "App";
import { store } from "store";

// style + assets

import "assets/scss/style.scss";
import config from "./config";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
// ==============================|| REACT DOM RENDER  ||============================== //

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
const container = document.getElementById("root");

const ContextAPI = createContext({});
export const useContextAPI = () => useContext(ContextAPI);

const ContextAPIProvider = ({ children }) => {
  const [LoggedInUser, setLoggedInUser] = useState({});
  return <ContextAPI.Provider value={{ LoggedInUser, setLoggedInUser }}>{children}</ContextAPI.Provider>;
};

// createRoot(container!) if you use TypeScript
ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ContextAPIProvider>
      <Provider store={store}>
        <BrowserRouter basename={config.basename}>
          <App />
        </BrowserRouter>
      </Provider>
    </ContextAPIProvider>
  </Web3ReactProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
