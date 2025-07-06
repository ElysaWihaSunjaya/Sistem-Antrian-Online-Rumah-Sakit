import { Link } from "react-router-dom";

export default function UserDropdown({ closeDropdown }) {
  return (
    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
      <div className="py-1">
        <Link
          to="/profile"
          onClick={closeDropdown}
          className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Edit Profile
        </Link>
        <Link
          to="/logout"
          onClick={closeDropdown}
          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
