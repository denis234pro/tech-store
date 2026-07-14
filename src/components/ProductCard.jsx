
export default function ProductCard({ item, addToCart, cart }) {
      if(!item) return <div className="product">
        Loading Item...
        </div>
        const existingCartItem  = cart.find((cartItem) => cartItem.id === item.id) ;
        const currentCartQuantity =  existingCartItem ? existingCartItem.quantity : 0;
        const maxWareHouseCount = 5;
        const isSoldOut = currentCartQuantity >= maxWareHouseCount;
        
    return (
      
        <div className="product-card" style={{ opacity: isSoldOut ? 0.7 : 1, transition: 'all 0.3s ease'}}>
            <img src={item?.image} alt={item?.title || 'Products'}   className="product-image" />
            <div>
                <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>
                    {item?.title?.length > 35 ? `${item?.title?.substring(0, 35)}...` : item?.title || 'Untitled Product'}
                </h4>
                <p style={{ color: '#666', fontSize: '12px', textTransform: 'capitalize' }}>
                    {item?.category || "General"}
                </p>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                    ${item?.price?.toFixed(2) || "0.00"}
                </span>
                <button className="add-btn" onClick={()=> !isSoldOut && addToCart(item)} disabled ={isSoldOut} 
                    style={{
                        background: isSoldOut ? '#cbd5e1':'#10b981',
                        color: isSoldOut ? "#64748b" : "#fff",
                        cursor: isSoldOut ? "not-allowed" : "pointer"
                    }}
                    >
                   {isSoldOut ? "🚫 Out of stock": "Add +"}
                </button>
                
            </div>
        </div>
    )
}