//Prducts Grid
import ProductCard from "./ProductCard";

export default function ProductGrid({ filteredProducts, searchQuery}) {
    return (
        
        <div className="products-grid">
            {filteredProducts.map((singleProduct) => (
                <ProductCard key={singleProduct.id} item={singleProduct} />
                
            ))}
            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'gray'}}>
                <h3>Search Not Found</h3>
              <br />
                <p>We could not find anything matching "{searchQuery}"</p>
            </div>
        )}
        </div>
    )
}