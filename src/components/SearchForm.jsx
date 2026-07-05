
function SearchProducts({searchQuery, setSearchQuery,clearSearch}){
    return(
        <div>
           
                {'  '}
                <input type="text" name="" id="searchInput" placeholder="search products..." value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} className="searchInput" />
                {' '}
            {searchQuery && (<button onClick={clearSearch}>✕</button>)}
        </div>
    )

}

export {SearchProducts};