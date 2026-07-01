import { useState } from "react";

export default function CheckoutForm({ totalCost }) {
    const [customInfo, setCustomInfo] = useState({
        fullName: '',
        shippingAddress: ''
    })

    // Form handler function 
    function handleOrderPlacement(e) {

        // prevent Default browser Behaviour
        e.preventDefault()

        // Safety Rule Check: Verify fields aren't blank strings
        if (customInfo.fullName.trim() === '' || customInfo.shippingAddress.trim() === '') {
            alert('Customer shipping credentials cannot be blank')
            return;
        }
        alert(`SUCCESS: Order Placed for ${customInfo.fullName}!\nTotal Amount Charged: ${totalCost.toFixed(2)}`)
        // Resetting the form to initial state
        setCustomInfo({
            customInfo: '',
            shippingAddress: ''
        })

    }

    return (

        <div style={{ marginTop: '20px', background: '#f8fafc', padding: '16px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <h4 style={{ marginBottom: '10PX', color: '#1e3a8a', fontSize: '14px' }}>
                Secure Checkout Dispatch
            </h4>

            <form onSubmit={handleOrderPlacement}>
                {/* Name container */}
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" name="fullName" id="fullName" value={customInfo.fullName} onChange={(e) => setCustomInfo({ ...customInfo, fullName: e.target.value })} placeholder="Receiver full name" style={{ padding: '6px', fontSize: '13px', borderRadius: '6px', width: '100%', border: '1px solid #ccc' }} />
                </div>

                {/* Shipping Address Container  */}
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" id="shippingAdrr" name="shippingAddr" value={customInfo.shippingAddress} onChange={(e) => setCustomInfo({ ...customInfo, shippingAddress: e.target.value })} style={{ padding: '6px', fontSize: '13px', borderRadius: '6px', width: '100%', border: '1px solid #ccc' }} placeholder="Destination Address" />
                </div>
                <button type="submit" className="add-btn" style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#10b981', width: '100%', margin: '0' }}>Confirm Order</button>

            </form>


        </div>
    )
}