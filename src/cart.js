function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(arr, product, qty) { 
  if(qty <= 0) {
    throw new RangeError('Количество товара должно быть больше нуля');
  }
  if(qty > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }
  const exitingProduct = arr.find((item) => item.id === product.id);
  
  if(exitingProduct) {
    return arr.map((item) => {
      if(item.id === product.id) {
        return {...item, quantity: item.quantity + qty}
      }
    })
  }
  return [...arr, {...product, quantity: qty}]
}

function changeQuantity(arr, productId, qty) {
  if (qty <= 0) {
      throw new RangeError('Количество товара должно быть больше нуля');
  }

  return arr.map((item) => {
    if (qty > item.stock) {
      throw new RangeError('Недостаточно товара на складе');
    }
    if(item.id === productId) {
      return {...item, quantity: qty}
    }
  
    return item
  })  
}

function removeFromCart(arr, productId) { 
  return arr.filter((item) => item.id != productId)
}

function calculateCartSubtotal(arr) { 
  if(arr.length === 0) {
    return 0
  }
  return arr.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
}

function calculateOrderTotal(arr, promocode) {
  const subtotal = calculateCartSubtotal(arr);
  let discount = 0;

  if(promocode === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1
  } else {
    discount = 0
  }

  const delivery = subtotal >= 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery

  return {
    subtotal,
    discount,
    delivery,
    total
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
