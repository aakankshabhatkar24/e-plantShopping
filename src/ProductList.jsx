import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds moisture to the air and removes toxins.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/03/09/16/05/flower-4850729_1280.jpg", description: "Easy to grow and clear toxins from indoor air.", cost: "$22" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/17/47/leaf-3283175_1280.jpg", description: "Purifies air and yields soothing gel for burns.", cost: "$14" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1589296986498-28cd9406425d", description: "Calming scent, used in aromatherapy.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating aroma, great for culinary use.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing smell, versatile in kitchen recipes.", cost: "$10" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy aroma, helps reduce stress.", cost: "$12" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", description: "Powerful floral fragrance with vibrant spring blooms.", cost: "$16" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", description: "Boosts immune system, helps fight colds.", cost: "$16" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Relieves digestive issues and headaches.", cost: "$13" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", description: "Soothes anxiety and aids peaceful sleep.", cost: "$15" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", description: "Heals skin irritations and minor wounds.", cost: "$12" },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2015/09/09/17/38/basil-932079_1280.jpg", description: "Contains strong anti-inflammatory properties.", cost: "$11" },
        { name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", description: "Calms nerves and acts as a natural insect repellent.", cost: "$13" }
      ]
    }
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="tag">
          <div className="landing_link">
            <h3 style={{ color: 'white', cursor: 'pointer' }} onClick={onHomeClick}>
              Paradise Nursery
            </h3>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <a href="#" onClick={handlePlantsClick} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
              <h1 className="cart">
                🛒<span className="cart_quantity_count">{calculateTotalQuantity()}</span>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} style={{ marginBottom: '30px' }}>
              <h1 style={{ textAlign: 'center', margin: '20px 0' }}>{category.category}</h1>
              <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '280px', textAlign: 'center' }}>
                    <img className="product-image" src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                    <div className="product-title" style={{ fontSize: '1.2em', fontWeight: 'bold', margin: '10px 0' }}>{plant.name}</div>
                    <div className="product-description" style={{ fontSize: '0.9em', color: '#555', minHeight: '40px' }}>{plant.description}</div>
                    <div className="product-cost" style={{ fontSize: '1.1em', fontWeight: 'bold', margin: '10px 0' }}>{plant.cost}</div>
                    <button
                      className="product-button"
                      disabled={addedToCart[plant.name]}
                      style={{
                        backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                        color: 'white',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;