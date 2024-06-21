import React, { createContext, useContext } from 'react';

const ItemIdContext = createContext(null);

export const useItemId = () => useContext(ItemIdContext);
