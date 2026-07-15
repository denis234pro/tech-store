import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";

// FIXED: Using standard lowercase 'filteredProducts' and including 'setFilteredProducts' in the parameters box!
export default function Home({ products, filteredProducts, setFilteredProducts, searchQuery, cart, addToCart }) {
    return (
        <div>
            {/* 1. Category selector badges render at the top */}
            <CategoryFilter
                products={products}
                setFilteredProducts={setFilteredProducts} // FIXED: Correctly matching the function name!
            />

            {/* 2. Product grid displays directly beneath it */}
            <ProductGrid
                filteredProducts={filteredProducts} // FIXED: Passing the real filtered array to the grid prop!
                searchQuery={searchQuery}
                products={products}
                cart={cart}
                addToCart={addToCart}
            />
        </div>
    );
}
