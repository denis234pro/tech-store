//Prducts Grid
import ProductCard from "./ProductCard";

export default function ProductGrid({ filteredProducts, searchQuery, addToCart, cart}) {
    const hasProducts =  filteredProducts && filteredProducts.length > 0 ;
    return (
        
        <div className="products-grid">
            {hasProducts && filteredProducts.map((singleProduct, index) => (
                <ProductCard key={singleProduct?.id ? `prod-${singleProduct.id}` : `idx-${index}` }
                 item={singleProduct} 
                addToCart={addToCart}
                cart={cart}
                />
                
            ))}
            { filteredProducts && filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'gray'}}>
                <h3>Search Not Found</h3>
              <br />
                <p>We could not find anything matching "{searchQuery}"</p>
            </div>
        )}
        </div>
    )
}
