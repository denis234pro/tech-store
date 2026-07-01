import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import { SearchProducts } from "./components/SearchForm";
import ShoppingCart from "./components/ShoppingCart";
import ProductGrid from "./components/ProductGrid";

function App() {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  // fetch Inventory handler function

  useEffect(() => {
    async function fetchStoreInventory() {

      try {
        setLoading(true)
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data)
        setFilteredProducts(response.data)
        setLoading(false)

      } catch {
        setError('Failed to synchronise with the database, check your internet connection');
        setLoading(false)
      }

    }
    fetchStoreInventory();


  }, [])

  // Effect 2 ; Debounce Filter Hook
  useEffect(() => {

    const timer = setTimeout(() => {
      const results = products.filter(product => product.title?.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredProducts(results)

    }, 300);
    return () => clearTimeout(timer)
  }
    , [products, searchQuery])

  // clear searched Terms
  function clearSearch() {
    setSearchQuery('')
  }

  // Cart Handler function
  function addToCart(productItem) {

    // Check if the item is already in the cart 
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === productItem.id);

      // if item (object data type) exists , rebuild the array using .map method
      if (existingItem) {

        return prevCart.map(cartItem => cartItem.id === productItem.id ? { ...cartItem, quantity: cartItem.quantity +1 } : cartItem);
      }
      // Else if item not found , break into the original productItem the user clicked and then add their a new key-value pair (tracker or counter)
      return [...prevCart, { ...productItem, quantity: 1 }]

    })


  }
  // function remove item from Cart
  function removeCartItem(itemId) {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemId))
  }
 


  return (
    <div className="store-layout">
      <div className="catalog-container">
        <h1>Tech Core Global Market</h1>
        <br />


        {loading && <p style={{ fontSize: '18px', color: '#666' }}>Please wait while fetching products...</p>}
        <hr style={{ margin: '10px 0', borderColor: '#ccc' }} />
        {error && <p style={{ color: '#f44336', fontWeight: 'bold' }}>⚠️{error}</p>}

        <SearchProducts

          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}

        />
        {!loading && !error && <div className="products-grid">
          <ProductGrid products={products}
            searchQuery={searchQuery}
            filteredProducts={filteredProducts}
            addToCart={addToCart}
          />
        </div>}

      </div>
      <div className="cart-panel">
        <div>
          <h2>Your Shopping Cart</h2>
          <hr style={{ margin: '10px 0', borderColor: '#e0e0e0' }} />
        </div>
        <ShoppingCart 
        removeCartItem={removeCartItem}
        cart={cart}
        />
            </div>
    </div>
  )
}
export default App;