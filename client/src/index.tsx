import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { LinksContextProvider } from "./context/LinksContext";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <LinksContextProvider>
        <App />
      </LinksContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
