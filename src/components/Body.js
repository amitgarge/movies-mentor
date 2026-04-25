import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ for consistent toast support
import Demo from "./Demo";

// ✅ Lazy-load routes
const Login = lazy(() => import("./Login"));
const Browse = lazy(() => import("./Browse"));

// ✅ Reusable fallback component
const PageFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 text-gray-700 text-lg font-medium">
    Loading Movie Mentor...
  </div>
);

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<PageFallback />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/browse",
      element: (
        <Suspense fallback={<PageFallback />}>
          <Browse />
        </Suspense>
      ),
    },
    {
      path: "/demo",
      element:<Demo />
    }
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </>
  );
};

export default Body;
