import React, { useState } from 'react';
import { useCart } from '@/components/cart/CartContext';
import { base44 } from '@/api/base44Client';
import { useRouter } from 'next/router';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Calendar, ShoppingBag, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Checkout() {
  const { cart, getCartTotal, clearCart, getCartCount } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    pickup_date: '',
    notes: '',
    card_number: '',
    card_expiry: '',
    card_cvc: '',
  });

  const TAX_RATE = 0.0825; // 8.25% tax
  const subtotal = getCartTotal();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!formData.customer_name || !formData.customer_email || !formData.customer_phone || !formData.pickup_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'card' && (!formData.card_number || !formData.card_expiry || !formData.card_cvc)) {
      toast.error('Please enter your card details');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        items: cart.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        subtotal: subtotal,
        tax: tax,
        total: total,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'card' ? 'paid' : 'pending',
        pickup_date: formData.pickup_date,
        notes: formData.notes,
        status: 'pending',
      };

      await base44.entities.Order.create(orderData);

      // Send confirmation email
      await base44.integrations.Core.SendEmail({
        to: formData.customer_email,
        subject: 'Order Confirmation - Lake City Fish',
        body: `
          <h2>Thank you for your order, ${formData.customer_name}!</h2>
          <p>Your order has been received and will be ready for pickup on ${formData.pickup_date}.</p>
          <h3>Order Summary:</h3>
          ${cart.map(item => `<p>${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}</p>`).join('')}
          <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
          <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
          <p><strong>Total:</strong> $${total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod === 'card' ? 'Card' : 'Cash on Pickup'}</p>
          <p>We'll see you at Soulard Market!</p>
          <p>730 Carroll St, St. Louis, MO 63104<br>(314) 582-5011</p>
        `,
      });

      clearCart();
      toast.success('Order placed successfully!');
      router.push(createPageUrl('OrderConfirmation'));
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-light text-[#1a2e45] mb-4">Your cart is empty</h2>
          <Button
            onClick={() => router.push(createPageUrl('Menu'))}
            className="bg-[#d4a84b] hover:bg-[#e5b95c] text-[#1a2e45]"
          >
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light text-[#1a2e45] mb-2">Checkout</h1>
          <p className="text-[#1a2e45]/60">Complete your order for pickup at Soulard Market</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-[#1a2e45] mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customer_name">Full Name *</Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer_email">Email *</Label>
                    <Input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer_phone">Phone Number *</Label>
                    <Input
                      id="customer_phone"
                      name="customer_phone"
                      type="tel"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup Date */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-[#1a2e45] mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Pickup Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pickup_date">Pickup Date *</Label>
                    <Input
                      id="pickup_date"
                      name="pickup_date"
                      type="date"
                      value={formData.pickup_date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Available Thursday - Saturday, 9AM - 5PM
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special requests or notes..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-[#1a2e45] mb-6">Payment Method</h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#d4a84b] bg-[#d4a84b]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === 'card' ? 'text-[#d4a84b]' : 'text-gray-400'
                    }`} />
                    <p className="font-medium">Credit/Debit Card</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_pickup')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'cash_on_pickup'
                        ? 'border-[#d4a84b] bg-[#d4a84b]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Wallet className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === 'cash_on_pickup' ? 'text-[#d4a84b]' : 'text-gray-400'
                    }`} />
                    <p className="font-medium">Cash on Pickup</p>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card_number">Card Number *</Label>
                      <Input
                        id="card_number"
                        name="card_number"
                        value={formData.card_number}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required={paymentMethod === 'card'}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="card_expiry">Expiry Date *</Label>
                        <Input
                          id="card_expiry"
                          name="card_expiry"
                          value={formData.card_expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required={paymentMethod === 'card'}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="card_cvc">CVC *</Label>
                        <Input
                          id="card_cvc"
                          name="card_cvc"
                          value={formData.card_cvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                          required={paymentMethod === 'card'}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash_on_pickup' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      Please pay when you pick up your order at Soulard Market.
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#d4a84b] hover:bg-[#e5b95c] text-[#1a2e45] font-semibold py-6 text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-[#1a2e45] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-[#1a2e45]">{item.name}</p>
                      <p className="text-gray-500">{item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <p className="font-semibold text-[#1a2e45]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8.25%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span className="text-[#1a2e45]">Total</span>
                  <span className="text-[#d4a84b]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#f8f9fa] rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Pickup Location:</strong><br />
                  Soulard Market<br />
                  730 Carroll St, St. Louis, MO 63104
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}