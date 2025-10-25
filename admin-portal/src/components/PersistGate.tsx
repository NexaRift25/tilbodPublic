import { PersistGate as ReduxPersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store';

const PersistGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxPersistGate 
      loading={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      } 
      persistor={persistor}
    >
      {children}
    </ReduxPersistGate>
  );
};

export default PersistGate;
