export default function ShoppingCart({cart, removeCartItem}){
    //
    const totalCost = cart.reduce((accumulator, item)=>{
        return accumulator + (item.price * item.quantity)
    }, 0)
    
    return(
        <div>
            <h2>Your Shopping Cart</h2>
            <hr style={{margin: '15, 0', borderColor: '#e0e0e0'}}/>
              {/* If the cart array length is empty, show the baseline placeholder */}
              {cart.length ===0 && (<p style={{color:'#aaa', fontStyle:'italic'}}>Your Manifest is currently Empty</p>)}

                {/* Scrollable list frame window for your active item packages layout */}
              <div style={{maxHeight: '70vh', overflowY: 'auto'}}>
                {cart.map((cartItem =>{
                    return(
                        <div key={cartItem.id} style={{display:'flex', gap:'10px',background:'#fff', padding:'10px', borderRadius:'6px', marginBottom:'10px', border:'1px solid #e2e8f0'}}>
                          <img src={cartItem.image} alt={cartItem.title} style={{height: '40px', width:'40px', objectFit:'contain'}} />

                          <div style={{flex: 1}}>
                            <h5 style={{fontSize: '13px',whiteSpace:'nowrap', overflow:'hidden',textOverflow:'ellipsis', maxWidth:'180px'}}>
                                {cartItem.title}
                            </h5>

                        <p style={{fontSize:'12px', color:'#666'}}>
                          ${cartItem.price.toFixed(2)} x {cartItem.quantity}
                        </p>
                          </div>
                          <button style={{border:'none', color:'#ef4444', background:'none', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}} onClick={removeCartItem}>✕</button>
                        </div>
                    )
                }))}

                            {/* The final numerical summary calculated by reduce calculator engine! */}
                            <div style={{borderTop:'2px solid  #e2e8f0', paddingTop:'15px', marginTop:'15px'}}>
                            <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
                            </div>


              </div>

        </div>
    )
}