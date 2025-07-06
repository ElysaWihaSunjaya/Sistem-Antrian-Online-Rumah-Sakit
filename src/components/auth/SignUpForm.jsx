import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <FiChevronLeft className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Sign Up</h2>

        <form className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fname" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                id="fname"
                name="fname"
                type="text"
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="lname" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                id="lname"
                name="lname"
                type="text"
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              id="agree"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="w-4 h-4 mt-1 text-brand-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
            />
            <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-400">
              By creating an account you agree to our{" "}
              <span className="font-medium text-gray-800 dark:text-white">Terms</span> and{" "}
              <span className="font-medium text-gray-800 dark:text-white">Privacy Policy</span>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-700 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
