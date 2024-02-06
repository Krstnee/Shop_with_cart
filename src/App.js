import React from 'react';
import { Link, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import img1 from './1.jpg'
import './App.css'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'


const styles = {
 
  productDetailsContainer: {
    border: '1px solid #ccc',
    padding: '16px',
    margin: '16px',
    
  },

  quantityContainer: {
    margin: '8px 0',
  },
  cartItem: {
    margin: '8px 0',
  },
};

const Header = () => {
  const headerStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  };

  return (
    <div style={headerStyle}>
      <h1>Ozon2.0</h1>
      <nav>
        <Link className='header__link' to="/">Home</Link> | <Link className='header__link2' to="/cart">Cart</Link>
      </nav>
    </div>
  );
};

const Product = ({ product, addToCart }) => {
  const { id, name, price, img } = product;
  const [quantity, setQuantity] = React.useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigate('/cart');
  };
  
  return (
    <div className='product'>
      <img className='pr__img' src={img}/>
      <h2 className='pr__title'>{name}</h2>
      <p className='pr__price'>{price} Р</p>
      
      <Link className='pr__link' to={`/product/${id}`}>Подробнее</Link>

      <div className='pr__con'>
        <button className='pr__btn1' onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>
          -
        </button>
        {quantity}
        <button className='pr__btn2' onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button className='pr__cart' onClick={handleAddToCart}>Добавить в корзину</button>
    </div>
  );
};

const ProductDetails = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleDetails = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    const { name, price, characteristics, img } = this.props.product;
    const { expanded } = this.state;

    return (
      <div className='product1'>
         <img className='pr__img1' src={img}/>
        <h2 className='pr__title'>{name}</h2>
        <p className='pr__price'>{price} P</p>

        <button className='but' onClick={this.toggleDetails}>
          {expanded ? 'Скрыть параметры' : 'Развернуть параметры'}
        </button>

        {expanded && (
          <ul>
            {characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
};

const ShoppingCart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Корзина</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} style={styles.cartItem}>
            {item.name} - {item.price}
            <button className='pr__btn1' onClick={() => updateQuantity(item, item.quantity - 1)} disabled={item.quantity === 1}>
              -
            </button>
            {item.quantity}
            <button className='pr__btn2' onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
            <button className='remove_btn' onClick={() => removeFromCart(item)}>Удалить</button>
          </li>
        ))}
      </ul>
      <p>Итоговая цена: {getTotalCost()}Р</p>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = React.useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === existingItem.id ? { ...item, quantity: item.quantity + product.quantity } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, product]);
    }
  };

  const updateQuantity = (item, newQuantity) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    setCart(updatedCart);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const products = [
    {
      id: 1,
      name: 'Сухой корм для кошек PRO PLAN Sterilised',
      price: 2116,
      characteristics: ['Подходит для шотландских пород', 'Гипоаллергенный', 'С 3х месяцев'],
      img: img1
    },
    {
      id: 2,
      name: 'Блендерный набор VITEK VT-3414',
      price: 1480,
      characteristics: ['Мощность: 300Вт', 'Гарантия: 1 год', '5 сменных насадок'],
      img: img2
    },
    {
      id: 3,
      name: 'Зубная паста Sensodyne отбеливающая ',
      price: 464,
      characteristics: ['Для чувствительных зубов', 'Отбеливает на 3 тона', 'Рекоммендовано стоматологами'],
      img: img3
    },
    {
      id: 4,
      name: 'Увлажняющий крем для лица NIVEA',
      price: 207,
      characteristics: ['Подходит для сухой кожи', 'Увлажняет и питает', 'Гипоаллергенно'],
      img: img4
    },
  ];

  return (
    <Router>
      <div>
      <Header />
       

        <Routes>
          {products.map((product) => (
            <Route
              key={product.id}
              path={`/product/${product.id}`}
              element={<ProductDetails product={product} />}
            />
          ))}

          <Route
            path="/cart"
            element={
              <ShoppingCart
                cartItems={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="/"
            element={
              <div className='products'>
                {products.map((product) => (
                  <Product key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
