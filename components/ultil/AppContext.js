import { useState } from 'react';
import { createContext } from 'react';

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const { children } = props;
  const [isLogin, setisLogin] = useState(false);
  const [inforuser, setinforuser] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setisLogin,
        inforuser,
        setinforuser,
        cartItemCount,
        setCartItemCount,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
