import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReduxReducer from './utils/reduxStorage';
import { HeroUIProvider } from "@heroui/react";

const store = configureStore({
  reducer: {
    dataStore: ReduxReducer
  }
});

const Providers = ({children}) => {
  
  return (
    <HeroUIProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </HeroUIProvider>
  );
}

export default Providers;

