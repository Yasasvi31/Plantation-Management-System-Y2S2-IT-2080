// OnlinePaymentPortal.js
import React, { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OnlinePaymentPortal = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolderName: '',
        cardType: '',
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Implement your payment logic here
        console.log('Payment submitted:', formData);
        // Reset form data after submission if needed
        // setFormData({ cardNumber: '', expirationDate: '', cvv: '', cardHolderName: '', cardType: 'visa' });
        navigate('/confirmation');
    };

    return (
        <div className="max-w-lg mx-auto mt-8 mb-8 p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-center">Payment Details</h2>

            {/* Payment Form */}
            <form onSubmit={handlePaymentSubmit}>
                <div><br/></div>
                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="**** **** **** ****"
                        required
                    />
                </div>
                <div><br/></div>
                <div className="flex justify-between mb-4">
                    <div className="w-1/2 mr-2">
                        <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            id="expirationDate"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div><br/></div>
                    <div className="w-1/2 ml-2">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                            CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="CVV"
                            required
                        />
                    </div>
                </div>
                <div><br/></div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Card Type</label>
                    <div className="flex items-center">
                        <label className="mr-12">
                            <input
                                type="radio"
                                name="cardType"
                                value="visa"
                                checked={formData.cardType === 'visa'}
                                onChange={handleInputChange}
                            />
                            <FaCcVisa size={30} className="ml-2"/>
                        </label>
                        <label className="mr-12">
                            <input
                                type="radio"
                                name="cardType"
                                value="master"
                                checked={formData.cardType === 'master'}
                                onChange={handleInputChange}
                            />
                            <FaCcMastercard size={30} className="ml-2"/>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="cardType"
                                value="amex"
                                checked={formData.cardType === 'amex'}
                                onChange={handleInputChange}
                            />
                            <FaCcAmex size={30} className="ml-2"/>
                        </label>
                    </div>
                </div>
                <div><br/></div>
                <div className="mb-4">
                    <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        id="cardHolderName"
                        name="cardHolderName"
                        value={formData.cardHolderName}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Full Name"
                        required
                    />
                </div>
                <div><br/></div>
                <button type="submit" className="bg-black text-white p-2 rounded-md w-full hover:bg-emerald-700">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default OnlinePaymentPortal;