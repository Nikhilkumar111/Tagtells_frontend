import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"; // OLD PAYPAL IMPORT - not used
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  // useGetPaypalClientIdQuery, // OLD PAYPAL QUERY - not used
  usePayOrderMutation,
  useCreateRazorpayOrderMutation
} from "../../redux/api/orderApiSlice";



// Click Pay Button → handlePayment()

// Frontend sends amount + orderId → Backend

// Backend creates Razorpay order → returns order info

// Frontend opens Razorpay modal with order details

// User pays → Razorpay calls handler

// Handler calls backend → marks order as paid

// Frontend updates → shows Paid status


const Order = () => { 
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);



  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // OLD PAYPAL REDUX SCRIPT REDUCER - not used
  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // OLD PAYPAL CLIENT ID FETCH - not used
  // const {
  //   data: paypal,
  //   isLoading: loadingPaPal,
  //   error: errorPayPal,
  // } = useGetPaypalClientIdQuery();

  // OLD PAYPAL SCRIPT LOADING USEEFFECT - not used
  // useEffect(() => {
  //   if (!errorPayPal && !loadingPaPal && paypal.clientId) {
  //     const loadingPaPalScript = async () => {
  //       paypalDispatch({
  //         type: "resetOptions",
  //         value: {
  //           "client-id": paypal.clientId,
  //           currency: "USD",
  //         },
  //       });
  //       paypalDispatch({ type: "setLoadingStatus", value: "pending" });
  //     };

  //     if (order && !order.isPaid) {
  //       if (!window.paypal) {
  //         loadingPaPalScript();
  //       }
  //     }
  //   }
  // }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  // ----------------- RAZORPAY SCRIPT -----------------
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // const handlePayment = async () => {
  //   const amount = order.totalPrice * 100; // Convert ₹ to paise
  //   try {
  //     // Create Razorpay order from backend
  //     const res = await fetch("/api/orders/razorpay", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ amount, orderId: order._id }),
  //     });
  //     const data = await res.json();

  //     // Configure Razorpay checkout
  //     const options = {
  //       key: data.key,                  // Razorpay key
  //       amount: data.order.amount,      // Amount in paise
  //       currency: "INR",
  //       name: "Tag-Tells",
  //       description: "Order Payment",
  //       order_id: data.order.id,        // Razorpay order ID
  //       handler: async (response) => { // On successful payment
  //         await payOrder({ orderId: order._id, details: response });
  //         refetch();
  //         toast.success("Payment successful!");
  //       },
  //       prefill: { name: order.user.username, email: order.user.email },
  //       theme: { color: "#EC4899" },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     toast.error("Payment failed: " + err.message);
  //   }
  // };
// ********************again try using redux toolkit*****


 const handlePayment = async () => {
    try {
      const amount = order.totalPrice * 100;

      // ✅ Create Razorpay order from backend via RTK
      const { data } = await createRazorpayOrder({
        amount,
        orderId: order._id,
      });

      // ✅ Razorpay checkout options
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Tag-Tells",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            await payOrder({ orderId: order._id, details: response });
            refetch();
            toast.success("Payment successful!");
          } catch{
            toast.error("Failed to update payment status.");
          }
        },
        prefill: {
          name: order.user.username,
          email: order.user.email,
        },
        theme: { color: "#EC4899" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };
















  // ----------------- OLD PAYPAL FUNCTIONS -----------------
  // function onApprove(data, actions) { ... } // not used
  // function createOrder(data, actions) { ... } // not used
  // function onError(err) { ... } // not used

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        ₹{(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>₹ {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>₹ {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span> ₹ {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>₹ {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {/*
            isPending is from old PayPal script, not used now
            {isPending ? (
              <Loader />
            ) : ( */}
              <div>
                <button
                  onClick={handlePayment}
                  className="bg-pink-500 text-white w-full py-2 rounded"
                >
                  Pay with Razorpay
                </button>
              </div>
            {/* )} */}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-pink-500 text-white w-full py-2"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
 