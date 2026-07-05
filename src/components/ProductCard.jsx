
export default function ProductCard({ item, addToCart }) {
      if(!item) return <div className="product">
        Loading Item...
        </div>
    return (
      
        <div className="product-card">
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
                <button className="add-btn" onClick={()=>addToCart(item)}>
                    Add +
                </button>
                
            </div>
        </div>
    )
}