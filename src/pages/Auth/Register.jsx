import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader.jsx";
import { useRegisterMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";


// State setup → use useState for email and password.
// Form handler → submitHandler with e.preventDefault() to stop page reload.
// API call → call login({ email, password }).unwrap() inside try/catch.
// Store user → on success, dispatch(setCredentials(res)) to save user in Redux.
// Redirect user → useEffect with if (userInfo) navigate(redirect) to send 
// logged-in users away from login page.
// Feedback → show toast.success on success and toast.error on failure.



const Register = () => {
  // these four are easiy to understand hai 
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);


  
  const submitHandler = async (e) => {
    //this is used to prevent during refreshing 
    e.preventDefault();
//check that the password will be matched or not with the confirm password 
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
  // Use .unwrap() to get raw API response and throw errors like a normal async call      
        const res = await register({ username, email, password });
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };


  
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/madhubani.jpeg')",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form Section */}
      <div className="relative bg-gradient-to-br from-yellow-50/95 via-white/90 to-pink-50/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-yellow-200">
        <h1 className="text-4xl font-bold mb-6 text-center text-orange-700 drop-shadow-sm">
          Register
        </h1>

        <form onSubmit={submitHandler} className="w-full">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-3 border border-orange-300 focus:ring-2 focus:ring-orange-400 rounded-lg w-full"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-3 border border-blue-300 focus:ring-2 focus:ring-blue-400 rounded-lg w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-3 border border-pink-300 focus:ring-2 focus:ring-pink-400 rounded-lg w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-3 border border-green-300 focus:ring-2 focus:ring-green-400 rounded-lg w-full"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white text-lg font-semibold rounded-lg cursor-pointer hover:from-orange-600 hover:via-pink-600 hover:to-red-600 transition shadow-lg"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;




















// this is the actual data flow then you understand that how the data will be go 
// 1>User fills form → clicks Register.
// 2>submitHandler calls useRegisterMutation → sends POST request to backend /users/register.
// 3>If backend responds successfully → setCredentials(userData) saves user info in:
// 4>Redux store (auth slice)
// 5>localStorage (so it survives refresh)
// 6>The Redux store updates, and your app knows the user is logged in.
// 7>You can then redirect to dashboard or show success message.
// useEffect runs after every render, and it checks:
// “Does userInfo exist?”
// If yes → it redirects the user to the proper page 
// (home, dashboard, or wherever redirect points).
