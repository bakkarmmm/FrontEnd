import { createContext, useContext, useEffect, useState } from "react";
import { getCartFromStorage, saveCartToStorage } from "./CardStorge";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getCartFromStorage());

  // تحميل السلة عند فتح الموقع
  // حفظ السلة عند أي تغيير
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);
  const addToCart = (product) => {
     setCart((prev) => {
    const exist = prev.find((item) => item.id === product.id);

    const productQty = product.qty ?? 1; // 👈 default = 1

    if (exist) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty + productQty }
          : item
      );
    }

    return [...prev, { ...product, qty: productQty }];
  });
  };
  const decreaseQty = (id) => {
    setCart(
      (prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, qty: (item.qty || 1) - 1 } : item
          )
          .filter((item) => item.qty > 0) // نحذف العنصر إذا qty = 0
    );
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const removeAllFromCart = () => {
    setCart([]);
  };

  // دالة لحساب المجموع الكلي
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        decreaseQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook للاستخدام السريع
export const useCart = () => useContext(CartContext);
