import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import store from './src/panel/User/Redux/Store';
import App from './App';



const ReduxApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
  
registerRootComponent(ReduxApp);
