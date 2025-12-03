import { createContext, useContext, useReducer } from "react"; // membuat global storage

const CartContext = createContext();

function cartReducer(state, action) { // reducer, nyimpan state biar ga re render 
  switch (action.type) {
    case "ADD": {
      const exists = state.find((item) => item.id === action.product.id);

      if (exists) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...state, { ...action.product, qty: 1 }];
    }

    case "REMOVE": 
      return state.filter((item) => item.id !== action.id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) { // ini untuk nyalurin semua cart ke global
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  function addToCart(product) {
    dispatch({ type: "ADD", product });
  }

  function removeFromCart(id) {
    dispatch({ type: "REMOVE", id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0); // otomatis hitung produck total

  return (
    <CartContext.Provider // mengirim semua data lewat Context provider
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

export function useCart() { // hook yang dipakai untuk ambil cart dari component
  return useContext(CartContext);
}
