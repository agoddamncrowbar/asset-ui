import { useState } from "react";
import ButtonLoader from "../components/loading/ButtonLoader";
import AppLoader from "../components/loading/AppLoader";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initializing] = useState(false); // replace with auth initialization state later
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(email, password);

      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  if (initializing) {
    return <AppLoader />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#283B91] text-white flex-col justify-center items-center p-12">
        <img
          src="./images/logo.png"
          alt="USIU Logo"
          className="w-52 mb-8"
        />

        <h1 className="text-4xl font-bold text-center">
          Asset Management System
        </h1>

        <div className="w-24 h-1 bg-[#FFCB08] rounded-full mt-4 mb-6" />

        <p className="max-w-md text-center text-lg text-gray-200">
          Manage organizational assets, assignments,
          requests, maintenance, and reporting from a
          centralized platform.
        </p>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <img
              src="./images/logo.png"
              alt="USIU Logo"
              className="w-32 bg-amber-50"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-[#283B91]">
            Sign In
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Asset Management System
          </p>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#283B91]
                  disabled:bg-gray-100
                "
                placeholder="admin@usiu.ac.ke"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#283B91]
                  disabled:bg-gray-100
                "
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-lg
                bg-[#283B91]
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#1f2f73]
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading ? (
                <ButtonLoader />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#FFCB08]" />

            <span className="text-sm text-gray-500">
              United States International University
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}