export const getCartFromStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// حفظ السلة
export const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};