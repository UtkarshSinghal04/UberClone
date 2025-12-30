import React, { useEffect, useState } from 'react';

const Payment = ({setPaymentOpen, ride, setRide, setPickingOpen}) => {
    const [qrCode, setQrCode] = useState('');
    
    useEffect(() => {
        // Fetch QR Code from the backend
        const generateQrCode = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/generate-qr', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: ride.fare }) // Replace with dynamic amount
                });
                const data = await response.json();

                if (data.qrCode) {
                    setQrCode(data.qrCode);
                } else {
                    alert('Failed to generate QR code');
                }
            } catch (error) {
                console.error('Error generating QR code:', error);
                alert('Error generating QR code');
            }
        };

        generateQrCode();
    }, []);

    // Poll the backend to verify payment status
    // useEffect(() => {
    //     if (qrCode) {
    //         console.log("Starting interval to verify payment...");
    //         const interval = setInterval(async () => {
    //             try {
    //                 const response = await fetch('http://localhost:3000/api/verify-payment', {
    //                     method: 'POST',
    //                     headers: { 'Content-Type': 'application/json' },
    //                     body: JSON.stringify({ qrCode })
    //                 });
    //                 const data = await response.json();
    //                 console.log("Verification response:", data);
    
    //                 if (data.verified) {
    //                     console.log("Payment verified!");
    //                     setPaymentVerified(true);
    //                     alert('Payment Successful!');
    //                     clearInterval(interval);
    //                     window.location.href = '/captain-home';
    //                 }
    //             } catch (error) {
    //                 console.error('Error verifying payment:', error);
    //             }
    //         }, 5000);
    
    //         return () => clearInterval(interval);
    //     }
    // }, [qrCode]);
    

    return (
        <div className='text-center h-1/2 p-4 rounded-lg'>
            <hr className="w-1/4 -mt-3 border-t-4 border-gray-400 mx-auto mb-5" />
            <h2 className='text-gray-500'>Scan the QR code to pay</h2>
            {qrCode ? (
                <div >
                    <h2 className='text-2xl font-bold'>₹{ride?.fare} </h2>
                    <img src={qrCode} alt="QR Code" className='ml-10 mt-2 w-72 h-72 text-center' />
                </div>
            ) : (
                <p>Generating QR code...</p>
            )}
            <button onClick={() => {
                setRide({})
                setPickingOpen(false)
                setPaymentOpen(false)
                }} className='bg-green-500 w-[80%] mt-1 text-white font-semibold p-2 rounded-2xl'>
                Payment Received
            </button>
        </div>
    );
};

export default Payment;
