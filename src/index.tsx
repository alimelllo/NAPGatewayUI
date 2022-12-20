import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from "./Store/configureStore";
import { Provider } from "react-redux";
import "./assets/agGrid-Css/ag-grid.css"
import "./assets/agGrid-Css/ag-theme-balham.css"
//Lang
import './i18n';
import { OidcProvider, processSilentRenew } from 'redux-oidc';
import userManager from './Store/userManager';

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);
if (window.location.pathname == '/SilentCallback') {
    userManager.signinSilentCallback();
} else {
    ReactDOM.render(
        <Provider store={store}>
            <OidcProvider userManager={userManager} store={store}>
                <App />
            </OidcProvider>
        </Provider>
        , document.getElementById('root'));
}