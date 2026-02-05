import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.find(
        (item) => item._id === action.product._id
      );

      if (exists) {
        return state.map((item) =>
          item._id === action.product._id
            ? { ...item, qty: item.qty + action.qty }
            : item
        );
      }

      return [...state, { ...action.product, qty: action.qty }];
    }

    case "REMOVE":
      return state.filter((item) => item._id !== action._id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  function addToCart(product, qty = 1) {
    dispatch({ type: "ADD", product, qty });
  }

  function removeFromCart(_id) {
    dispatch({ type: "REMOVE", _id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
