import { configureStore } from '@reduxjs/toolkit';
import { grievanceApi } from './grievancesApi'; // Ensure you're importing 'grievanceApi'

export const store = configureStore({
  reducer: {
    [grievanceApi.reducerPath]: grievanceApi.reducer, // Use the correct name from the export
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(grievanceApi.middleware), // Include 'grievanceApi' middleware
});

// Export hooks for usage in components
export * from './grievancesApi'; // Correct import
