
import CheckoutForm from "./CheckoutForm"
export default function ShoppingCart({ cart, removeCartItem, clearCart, updateCartItemQuantity }) {
    //Calculate total checkout cost live from state memory snapshots
    const totalCost = cart.reduce((accumulator, item) => {
        return accumulator + (item.price * item.quantity)
    }, 0)

    return (
        <div>

            {/* If the cart array length is empty, show the baseline placeholder */}
            {cart.length === 0 && (<p style={{ color: '#aaa', fontStyle: 'italic' }}>Your Manifest is currently Empty</p>)}

            {/* Scrollable list frame window for your active item packages layout */}
            <div style={{ maxHeight: '80vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                {cart.map((cartItem => {
                    return (
                        <div key={cartItem.id} style={{ display: 'flex', gap: '10px', background: '#fff', padding: '10px', borderRadius: '6px', marginBottom: '10px', border: '1px solid #e2e8f0' }}>
                            <img src={cartItem.image} alt={cartItem.title} style={{ height: '40px', width: '40px', objectFit: 'contain' }} />

                            <div style={{ flex: 1 }}>
                                <h5 style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                {cartItem.title}
                                </h5>
                                <div style={{display: 'flex', alignItems: 'center', gap: '8px', margin: '5px 0'}}>

                                <button style={{width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 'bold' }} onClick={()=> updateCartItemQuantity(cartItem.id, "decrement")}>
                                    -{/*  decrement button   */}
                                    </button>
                                
                                <span style={{fontSize: '14px', fontWeight: '600', minWidth: '15px', textAlign: 'center'}} >
                                    {cartItem.quantity}   
                                </span>

                                <button style={{width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 'bold' }} onClick={()=> updateCartItemQuantity(cartItem.id, "increment")}>
                                    + {/*  increment button   */}
                                </button>
                                </div>

                                <p style={{ fontSize: '12px', color: '#666' }}>
                                    ${cartItem.price.toFixed(2)} x {cartItem.quantity}
                                </p>
                            </div>
                            <button style={{ border: 'none', color: '#ef4444', background: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => removeCartItem(cartItem.id)}>✕</button>
                          
                        </div>
                    )
                }))}

                {/* The final numerical summary calculated by reduce calculator engine! */}
                <div style={{ borderTop: '2px solid  #e2e8f0', paddingTop: '15px', marginTop: '15px' }}>
                     {' '}
                    {cart.length > 0 && <button style={{ position: 'relative', left: '70%', marginTop: '10px', marginBottom: '15px', background: '#cbd5e1', color: '#475569', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }} onClick={clearCart}>clear cart</button>}
                    <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
                   
                </div>

                {cart.length > 0 && (<CheckoutForm cart={cart} totalCost={totalCost}


                />)}

            </div>

        </div>
    )
}