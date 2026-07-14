import { useState, useEffect } from "react";
import axios from "axios";
import { SearchProducts } from "./components/SearchForm";
import ShoppingCart from "./components/ShoppingCart";
import ProductGrid from "./components/ProductGrid";
import FilterByCategory from "./components/CategoryFilter";

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

  const [promoCodeInput, setPromoCodeInput] = useState('')
  const [activeDiscountRate, setActiveDiscountRate] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);

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

  // Centralised Cash Register Pipeline
  const subTotalCost = cart.reduce((runnnigTotal, currentItem) => {
    return runnnigTotal + (currentItem.price * currentItem.quantity);
  }, 0) //◄ The initial calculator screen  at 0 reading !

  const discountAmount = subTotalCost * activeDiscountRate; // calculate Amount to be deducted as discount
  const FinalTotalCost = subTotalCost - discountAmount; // Final Amount 

  // --- PROMO CODE VALIDATION
  function applyPromoCode() {
    const sanitisedInput = promoCodeInput.trim().toUpperCase();
    if (sanitisedInput === "TECHCORE20") {
      setActiveDiscountRate(0.20);
      setHasDiscount(true)
      alert(`🎟️ Promo Applied: 20% Technical Discount injected successfully , ${sanitisedInput}`)
    }
    else if (sanitisedInput === "FREESHIP") {
      alert(`🚚 Code Recognized: Free Shipping applied to layout manifest!, ${sanitisedInput}`)
      setActiveDiscountRate(0);
      setHasDiscount(true)

    }
    else {
      alert("❌ Invalid Code: This voucher ledger key does not exist on our servers.")
      setActiveDiscountRate(0)
      setHasDiscount(false)
    }
  }
  // Function remove discount code  
  function removeDiscountCode() {
    setActiveDiscountRate(0)
    setHasDiscount(false)
    setPromoCodeInput('')
    alert("Discount code removed successfully")
  }

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
  function addToCart(incomingCartItem) {
    // --- UPGRADED INVENTORY-LOCKED ADD TO CART ENGINE ---
    const rawExistingItem = cart.find((cartItem) => cartItem.id === incomingCartItem.id);
    const currentCartQuantity = rawExistingItem ? rawExistingItem.quantity : 0;
    const maxWareHouseStock = incomingCartItem.rating?.count || 5;

    // Terminate early if the user hits the ceiling!
    if (currentCartQuantity === maxWareHouseStock) {
      alert(` Inventory Limit Reached, only ${maxWareHouseStock} units are available in the Ware House`);
      return; // stop if the stock limit reached
    }

    // Check if the item is already in the cart 
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === incomingCartItem.id);
      // if item (object data type) exists , rebuild the array using .map method
      if (existingItem) {
        return prevCart.map(cartItem => cartItem.id === incomingCartItem.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
      }
      // Else if item not found , break into the original incomingCartItem the user clicked and then add their a new key-value pair (tracker or counter)
      return [...prevCart, { ...incomingCartItem, quantity: 1 }]
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
    const sortedCopy = [...filteredProducts];  // safe copy of the products to avoid violeting react immutability rules
    sortedCopy.sort((itemA, itemB) => {
      if (orderDirection === 'lowToHigh') {
        return itemA.price - itemB.price; // Low prices first
      }
      else if (orderDirection === 'highToLow') {
        return itemB.price - itemA.price; //High prices first
      }
      return 0; // maintain original positina
    });
    setProducts(sortedCopy)

  }

  // Function update Cart Item quantity
  function updateCartItemQuantity(targetId, intent) {

    const filteredCart = cart.map((cartItem) => {
      // 1. FIRST check if this is the item the user clicked
      if (cartItem.id === targetId) {
        // 2. THEN decide whether to add or subtract
        if (intent === "increment") {
          const maxWareHouseStock = 5;
          if (cartItem.quantity >= maxWareHouseStock) {
            alert(`Stock Maximum: Cannot exceed ${maxWareHouseStock} units`);
            return cartItem; //   return cartItem; // Return the item unchanged! Freeze the math!
          }
          return { ...cartItem, quantity: cartItem.quantity + 1 }; // Increase item quantity
        }

        if (intent === "decrement") {
          return { ...cartItem, quantity: cartItem.quantity - 1 }; // Decrease item quantity
        }
      }

      // This now correctly runs for all other non-matching items
      return cartItem;
    });

    const purgedCart = filteredCart.filter((cartItem) => {
      return cartItem.quantity > 0;
    });

    setCart(purgedCart);
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
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', borderRadius: '6px' }}>
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 'bold' }}>Sort by prices:</span>
            <button onClick={() => sortProductsByPrice('lowToHigh')} style={{ padding: '6px 12px', background: '#6382c5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>💲Low to High</button>

            <button style={{ padding: '6px 12px', background: '#6382c5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }} onClick={() => sortProductsByPrice('highToLow')}>High to Low</button>
          </div>

          <FilterByCategory
            products={products}
            setFilteredProducts={setFilteredProducts}

          />
        </div>)}

        {!loading && !error && <div className="products-grid">
          <ProductGrid products={products}
            searchQuery={searchQuery}
            filteredProducts={filteredProducts}
            cart={cart}
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
          updateCartItemQuantity={updateCartItemQuantity}
          applyPromoCode={applyPromoCode}
          subTotalCost={subTotalCost}
          setActiveDiscountRate={setActiveDiscountRate}
          activeDiscountRate={activeDiscountRate}
          discountAmount={discountAmount}
          FinalTotalCost={FinalTotalCost}
          removeDiscountCode={removeDiscountCode}
          hasDiscount={hasDiscount}
          setHasDiscount={setHasDiscount}
          promoCodeInput={promoCodeInput}
          setPromoCodeInput={setPromoCodeInput}
        />
      </div>
    </div>
  )
}
export default App;