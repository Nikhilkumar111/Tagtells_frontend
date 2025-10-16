import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editMode, setEditMode] = useState(false); // New toggle for edit

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-20 mt-[10rem]">
      <div className="flex flex-col md:flex-row md:space-x-8 gap-8">
        {/* User Details Panel */}
        <div className="md:w-1/3 bg-gray-900 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">My Profile</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full shadow-md transition-colors duration-300"
              title="Start Update"
            >
              <FaUserEdit />
            </button>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              <span className="font-semibold text-white">Username: </span>
              {userInfo.username}
            </p>
            <p>
              <span className="font-semibold text-white">Email: </span>
              {userInfo.email}
            </p>
            <Link
              to="/user-orders"
              className="inline-block mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded shadow-md transition-all duration-300"
            >
              My Orders
            </Link>
          </div>
        </div>

        {/* Update Form Panel */}
        {editMode && (
          <div className="md:w-2/3 bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Update Profile</h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block text-gray-200 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-3 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-200 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-3 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-200 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-3 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-200 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="form-input p-3 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-start gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
              {loadingUpdateProfile && <Loader />}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
