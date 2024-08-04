import { useContext } from 'react';
import { StoreContext } from '../StoreProvider'; // Correct path

export const useStores = () => {
  return useContext(StoreContext);
};