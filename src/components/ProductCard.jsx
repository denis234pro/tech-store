// ⚡ STEP 1: IMPORT THE CLIENT-SIDE ROUTING INTERACTIVE PASSENGER LINK TOOL
import { Link } from "react-router-dom";

export default function ProductCard({ item, addToCart, cart }) {
    if(!item) return <div className="product">Loading Item...</div>
    
    const existingCartItem  = cart?.find((cartItem) => cartItem.id === item.id);
    const currentCartQuantity =  existingCartItem ? existingCartItem.quantity : 0;
    const maxWareHouseCount = 5;
    const isSoldOut = currentCartQuantity >= maxWareHouseCount;
        
    return (
        <div className="product-card" style={{ opacity: isSoldOut ? 0.7 : 1, transition: 'all 0.3s ease'}}>
            <img src={item?.image} alt={item?.title || 'Products'} className="product-image" />
            <div>
                <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>
                    
                    {/* ⚡ STEP 2: WRAP THE TEXT INTERIOR INSIDE A STRATEGIC INTERACTIVE ROUTER LINK PROPS GATEWAY */}
                    <Link 
                        to={`/product/${item.id}`} // Links straight to your working singular App.jsx Switch route!
                        style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {item?.title?.length > 35 ? `${item?.title?.substring(0, 35)}...` : item?.title || 'Untitled Product'}
                    </Link>
                    
                </h4>
                <p style={{ color: '#666', fontSize: '12px', textTransform: 'capitalize' }}>
                    {item?.category || "General"}
                </p>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                    ${item?.price?.toFixed(2) || "0.00"}
                </span>
                <button 
                    className="add-btn" 
                    onClick={()=> !isSoldOut && addToCart(item)} 
                    disabled={isSoldOut} 
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
