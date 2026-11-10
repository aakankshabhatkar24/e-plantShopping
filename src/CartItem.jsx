import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const costNumber = parseFloat(item.cost.substring(1));
      total += costNumber * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.substring(1));
    return (costNumber * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', marginRight: '20px' }} />
            <div className="cart-item-details" style={{ flexGrow: 1 }}>
              <div className="cart-item-name" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity" style={{ margin: '10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" style={{ marginTop: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)} style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;