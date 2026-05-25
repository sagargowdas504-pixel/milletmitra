import { useState } from "react";
import { X, Plus, Minus, ShoppingBag, Truck, Shield, Tag, Loader2, Check } from "lucide-react";
import { useCart, getProductPrice } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CartSidebar = () => {
  const { 
    items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, 
    totalPrice, clearCart, totalItems, discount, applyPromoCode, removePromoCode 
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  if (!isCartOpen) return null;

  const subtotalBeforeDiscount = items.reduce((sum, item) => sum + getProductPrice(item.product, item.size) * item.quantity, 0);
  const discountAmount = subtotalBeforeDiscount - totalPrice;
  const deliveryFee = totalPrice >= 500 ? 0 : 49;
  const grandTotal = totalPrice + deliveryFee;
  
  const savings = items.reduce((sum, item) => {
    const originalPrice = item.product.originalPrice || getProductPrice(item.product, item.size);
    return sum + (originalPrice - getProductPrice(item.product, item.size)) * item.quantity;
  }, 0) + discountAmount;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    const success = applyPromoCode(promoCode);
    if (success) {
      toast.success("Promo code applied successfully!");
      setPromoCode("");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleCheckout = async () => {
    if (!window.Razorpay) {
      toast.error("Payment SDK not loaded. Please refresh the page.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { amount: grandTotal, currency: "INR", receipt: `mm_${Date.now()}` },
      });
      if (error || !data?.orderId) throw new Error(error?.message || "Order creation failed");

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Milletmithra",
        description: `Order of ${totalItems} item${totalItems !== 1 ? "s" : ""}`,
        theme: { color: "#2d5a3d" },
        handler: async (response: any) => {
          const { data: verifyData, error: verifyErr } = await supabase.functions.invoke(
            "verify-razorpay-payment",
            {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            },
          );
          if (verifyErr || !verifyData?.verified) {
            toast.error("Payment verification failed");
            return;
          }
          toast.success("Payment successful! 🎉 Order placed.");
          clearCart();
          setIsCartOpen(false);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });
      rzp.on("payment.failed", (resp: any) => {
        toast.error(resp.error?.description || "Payment failed");
      });
      rzp.open();
    } catch (err: any) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Shopping Cart</h2>
              <p className="text-xs text-muted-foreground">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="hover:bg-destructive/10 hover:text-destructive">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground p-8">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12" />
            </div>
            <p className="font-display font-bold text-lg text-foreground">Your cart is empty</p>
            <p className="text-sm text-center">Discover our premium millet products and add them to your cart.</p>
            <Button className="bg-primary hover:bg-forest-dark text-primary-foreground" onClick={() => setIsCartOpen(false)}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            {totalPrice < 500 && (
              <div className="mx-4 mt-4 p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-secondary" />
                  <span className="text-foreground/80">Add <strong className="text-secondary">₹{500 - totalPrice}</strong> more for free delivery!</span>
                </div>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-golden-light rounded-full transition-all duration-500" style={{ width: `${Math.min((totalPrice / 500) * 100, 100)}%` }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => {
                const itemPrice = getProductPrice(item.product, item.size);
                return (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3 bg-muted/50 rounded-xl p-3 border border-border/50 hover:border-primary/20 transition-colors">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate text-foreground">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.size}</p>
                      <p className="text-sm font-bold text-primary mt-1">₹{itemPrice} × {item.quantity} = ₹{itemPrice * item.quantity}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-1 bg-card rounded-lg border border-border">
                        <button className="p-1.5 hover:bg-muted rounded-l-lg transition-colors" onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                        <button className="p-1.5 hover:bg-muted rounded-r-lg transition-colors" onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border p-5 space-y-3 bg-gradient-to-t from-muted/30 to-transparent">
              
              {/* Promo Code Section */}
              <div className="mb-4">
                {discount > 0 ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="font-medium">Promo applied ({discount * 100}%)</span>
                    </div>
                    <button onClick={removePromoCode} className="text-red-500 hover:text-red-700 font-medium">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Promo Code (e.g. MILLET10)" 
                      value={promoCode} 
                      onChange={(e) => setPromoCode(e.target.value)} 
                      className="text-sm h-9"
                    />
                    <Button onClick={handleApplyPromo} variant="secondary" className="h-9">Apply</Button>
                  </div>
                )}
              </div>

              {savings > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-green-600"><Tag className="h-3.5 w-3.5" /> Total Savings</span>
                  <span className="font-semibold text-green-600">- ₹{Math.round(savings)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotalBeforeDiscount}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 font-medium">
                  <span>Discount</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-display font-bold text-xl pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">₹{grandTotal}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-forest-dark hover:from-forest-dark hover:to-primary text-primary-foreground font-semibold h-12 text-base shadow-lg"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                Pay with Razorpay
              </Button>
              <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-destructive" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
