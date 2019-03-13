export const pushWishlist = product => ({
  type: "PUSH_WISHLIST",
  product: product
});

export const popWishlist = product => ({
  type: "POP_WISHLIST",
  product: product
});
