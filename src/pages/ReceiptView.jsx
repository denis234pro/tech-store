import { useNavigate } from "react-router-dom"

export default function ReceiptView({ orderReceipt }) {
    const navigate = useNavigate()
    if(!orderReceipt){
        return(
            <div style={{padding: '50px', textAlign: 'center'}}>
                <h2>No transactions  Found</h2>
            <button style={{marginTop: '20px', padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            onClick={()=> navigate('/')}
            >
             {/* it is confirmed the type of the orderReceipt is an object (from state) */}
              {/* {console.log(typeof orderReceipt)}  */}
            Return
            </button>

            </div>
        )
    }
    return(
          <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', background: '#fff', borderRadius: '8px', border: '2px dashed #cbd5e1' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1 style={{ color: '#10b981', margin: 0 }}>🧾 TRANSACTION RECEIPT</h1>
        <p style={{ color: '#64748b', fontSize: '13px', marginTop: '5px' }}>ID: {orderReceipt.transactionId}</p>
      </div>

      <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '15px', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>Customer Dispatched Credentials:</h4>
        <p style={{ margin: '2px 0', fontSize: '14px', color: '#475569' }}><strong>Name:</strong> {orderReceipt.buyerName}</p>
        <p style={{ margin: '2px 0', fontSize: '14px', color: '#475569' }}><strong>Destination:</strong> {orderReceipt.deliveryLocation}</p>
      </div>
      

      <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '15px', marginBottom: '15px' }}>
        <h4 style={{ marginBottom: '10px', color: '#1e293b' }}>Items Manifest Purchased:</h4>
        {/* Loop through our frozen cart snapshot data array list inside the receipt object container! */}
        {orderReceipt.itemsManifest.map((item, index) => (
            <div key={index} style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', margin: '6px 0', color: '#334155'}}>
                <span>{item.title.substring(0, 25)} ...(x{item.quantity})</span>
                <span>{(item.price * item.quantity).toFixed(2)}</span>
            </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <h3 style={{ margin: 0, color: '#0f172a' }}>Total Amount Charged:</h3>
        <h2 style={{ margin: 0, color: '#10b981' }}>${orderReceipt.totalAmountPaid?.toFixed(2)||0.00}</h2>
      </div>

      <button 
        onClick={() => navigate("/")}
        style={{ width: '100%', marginTop: '30px', padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Return Shopping
      </button>
    </div>
    )

}