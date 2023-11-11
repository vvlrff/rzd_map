import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./assets/styles/index.scss";
// import "bootstrap/dist/css/bootstrap.css";
import MyThemeProvider from "./app/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MyThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </MyThemeProvider>
    </React.StrictMode>
);
