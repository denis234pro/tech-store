import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import { SearchProducts } from "./components/SearchForm";
import ShoppingCart from "./components/ShoppingCart";
import ProductGrid from "./components/ProductGrid";

function App() {

  const [cart, setCart] = useState(() => {

    // Restore user saved cart on page refresh
    const savedCartData = localStorage.getItem('tech_store_cart');
    if (savedCartData) {
      // convert to original data type
      return JSON.parse(savedCartData);
    }
    // Boot cleanly if there is no any saved cart data
    return []
  });

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')

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

        return prevCart.map(cartItem => cartItem.id === productItem.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
      }
      // Else if item not found , break into the original productItem the user clicked and then add their a new key-value pair (tracker or counter)
      return [...prevCart, { ...productItem, quantity: 1 }]

    })


  }
  // function remove item from Cart
  function removeCartItem(itemId) {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemId))
  }

  function clearCart() {
    setCart([])

    localStorage.removeItem('tech_store_cart'); // Point the remve function to the exact  key woith data
  }

  //UseEffect: 3,  Initiate Local storage watchman.
  useEffect(() => {

    const compresssedCartData = JSON.stringify(cart)  // convert cart data into local storage supported type

    localStorage.setItem('tech_store_cart', compresssedCartData) //  Save data 
  }, [cart])

  // Sort Products function
  function sortProductsByPrice(orderDirection) {

    const sortedCopy = [...filteredProducts];  // safe copy of the products to avoid violenting react immutability rules
    sortedCopy.sort((itemA, itemB) => {
      if (orderDirection === 'lowToHigh') {
        return itemA - itemB; // Low prices first
      }
      else if (orderDirection === 'highToLow') {
        return itemB - itemA; //High prices first
      }
      return 0; // maintain original positina
    })
    setProducts(sortedCopy)
    console.log(typeof sortedCopy)
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
        
        {!loading && !error && (<div>
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', borderRadius: '6px'}}>
          <span style={{ fontSize: '14px', color: '#666', fontWeight: 'bold' }}>Sort Catalog:</span>
          <button style={{ padding: '6px 12px', background: '#6382c5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold'}}>💲Price: Low to High</button>

          <button style={{ padding: '6px 12px', background: '#6382c5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold'}} >Price: High to Low</button>
        </div>
        </div>)}

        {!loading && !error && <div className="products-grid">
          <ProductGrid products={products}
            searchQuery={searchQuery}
            filteredProducts={filteredProducts}
            addToCart={addToCart}

          />

        </div>
        }

      </div>
      <div className="cart-panel">
        <div>
          <h2>Your Shopping Cart</h2>
          <hr style={{ margin: '10px 0', borderColor: '#e0e0e0' }} />
        </div>
        <ShoppingCart
          removeCartItem={removeCartItem}
          cart={cart}
          clearCart={clearCart}
        />
      </div>
    </div>
  )
}
export default App;