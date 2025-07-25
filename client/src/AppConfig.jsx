import vkBridge, { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';
import { useAdaptivity, useAppearance, useInsets } from '@vkontakte/vk-bridge-react';
import { AdaptivityProvider, ConfigProvider, AppRoot } from '@vkontakte/vkui';
import { RouterProvider } from '@vkontakte/vk-mini-apps-router';
import '@vkontakte/vkui/dist/vkui.css';
import { transformVKBridgeAdaptivity } from './utils';
import { router } from './routes';
import { App } from './App';


import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import { mainReducer } from './store/redux/mainSlice.js'
import { persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, mainReducer)


const store = configureStore({
  reducer: {
    main : persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: true,
});

const persistor = persistStore(store)

export const AppConfig = () => {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search);

  return (
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          colorScheme={vkBridgeAppearance}
          platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
          isWebView={vkBridge.isWebView()}
          hasCustomPanelHeaderAfter={true}
        >
          <AdaptivityProvider {...adaptivity}>
            <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
              <RouterProvider router={router}>
                <App />
              </RouterProvider>
            </AppRoot>
          </AdaptivityProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};
