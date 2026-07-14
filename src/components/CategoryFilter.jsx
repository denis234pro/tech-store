export default function CategoryFilter({ products, setFilteredProducts }) {
    // logical filtering bug 
    const availableCategories = ["all", ...new Set(products.map((item) => {
        return item.category;
    }))]

    function filterByProducts(selectedCategory) {
        if (selectedCategory === "all") {
            setFilteredProducts(products)
            return;
        }
        const filteredProducts = products.filter((item) => {
            return item.category === selectedCategory;

        })
        setFilteredProducts(filteredProducts);
    }

    return (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 'bold' }}>Sort by Categories:</span>
              {/* Loop over our unique category names list data array and render dynamic selection buttons! */}
              {availableCategories.map((categoryName, index) => {
                return (
                    <button key={index} onClick={() => filterByProducts(categoryName)} style={{padding: '6px 12px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', textTransform: 'capitalize'}}>
                        {categoryName}
                        </button>
                )
              })}

        </div>
    );
}