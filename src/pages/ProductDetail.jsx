import { useParams } from "react-router-dom";

export default function ProductDetail({ products, addToCart, cart }) {
    const { id } = useParams(); // ID string extracted from the browser URL address bar  
    
    const singleProduct = products.find((item) => item.id === parseInt(id));

    if (!singleProduct) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Product Not Found on the server</h2>
            </div>
        );
    }
    const existingItem = cart.find((cartItem) => cartItem.id === singleProduct.id)
    const maxStock = 5;
    const currentCartQty = existingItem ? existingItem.quantity : 0;
    const isSoldOut = currentCartQty >= maxStock// Find exact integer matching Item



    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '30px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>

            {/* FIXED: Updated 'img' property parameter key to 'image' and expanded width for detailed view! */}
            <img
                src={singleProduct.image}
                alt={singleProduct.title}
                style={{ width: '250px', height: '300px', objectFit: 'contain' }}
            />
            {/* FIXED: Wrapped all textual rows inside a vertical column stack division container! */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <h2 style={{ fontSize: '22px', marginBottom: '10px', color: '#0f172a' }}>
                    {singleProduct.title}
                </h2>

                <p style={{ color: '#64748b', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '14px', marginBottom: '15px' }}>
                    Category: {singleProduct.category}
                </p>

                <p style={{ lineHeight: '1.6', color: '#334155', fontSize: '14px', marginBottom: '20px' }}>
                    {singleProduct.description}
                </p>

                <h3 style={{ color: '#10b981', marginBottom: '20px', fontSize: '20px', fontWeight: '700' }}>
                    Price: ${singleProduct.price.toFixed(2)}
                </h3>

                <button
                    style={{
                        padding: '10px 20px', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', alignSelf: 'flex-start',
                        background: isSoldOut ? '#cbd5e1' : '#10b981',
                        color: isSoldOut ? "#64748b" : "#fff",
                        cursor: isSoldOut ? "not-allowed" : "pointer"
                    }}
                    onClick={() => !isSoldOut && addToCart(singleProduct)}
                >
                    {isSoldOut ? "🚫 Out of stock" : "Add +"}
                </button>
            </div>

        </div>
    );
}
