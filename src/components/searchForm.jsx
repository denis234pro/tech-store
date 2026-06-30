
function SearchProducts({searchQuery, setSearchQuery,clearSearch}){
    return(
        <div>
           
                {'  '}
                <input type="text" name="" id="searchInput" placeholder="search products..." value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} className="searchInput" />
                {' '}
               <button onClick={clearSearch}>X</button>
        </div>
    )

}

export {SearchProducts};