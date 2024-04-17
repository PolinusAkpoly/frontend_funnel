import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'

import App from './App'

if (process.env.NODE_ENV === 'production') {
  // Si l'application est en mode production, écrasez les fonctions console.log, console.warn, et console.error
  console.log = function () { };
  console.warn = function () { };
  console.error = function () { };

  const disableDevTools = () => {
    // Désactive les extensions de développement
    if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () { };
    }
  };

  // Exécute la fonction pour désactiver les extensions de développement
  disableDevTools();
}


const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
