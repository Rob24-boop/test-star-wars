declare module 'redux-mock-store' {
  import { Store, AnyAction } from 'redux';
  import { MockStoreEnhanced } from 'redux-mock-store';

  interface ConfigureMockStore {
    <TState>(middlewares?: any[]): (initialState: TState) => MockStoreEnhanced<TState, AnyAction>;
  }

  const configureMockStore: ConfigureMockStore;
  export default configureMockStore;
}
