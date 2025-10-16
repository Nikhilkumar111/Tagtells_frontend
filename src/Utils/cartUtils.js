// cartUtils.js

/**
 * Round a number to 2 decimal places
 * @param {number} num - The number to round
 * @returns {number} Rounded number
 */
export const addDecimals = (num) => {
  // Multiply by 100, round, then divide back
  return Math.round(num * 100) / 100;
};

/**
 * Update cart state with calculated prices
 * @param {object} state - The cart slice state
 * @returns {object} Updated state (also saved in localStorage)
 */
export const updateCart = (state) => {
  // 1️⃣ Calculate total items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // 2️⃣ Calculate shipping price
  // Free shipping if itemsPrice > 2000, else charge 10
  state.shippingPrice = state.itemsPrice > 2000 ? 0 : 10;

  // 3️⃣ Calculate tax (15% of itemsPrice)
  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  // 4️⃣ Calculate total price (items + shipping + tax)
  state.totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  // 5️⃣ Save updated cart state to localStorage
  // localStorage can only store strings, so stringify the object
  localStorage.setItem("cart", JSON.stringify(state));

  // Return updated state (optional, mainly for clarity)
  return state;
};
