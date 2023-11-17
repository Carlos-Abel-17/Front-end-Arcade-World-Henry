 import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./redux/store";
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
);