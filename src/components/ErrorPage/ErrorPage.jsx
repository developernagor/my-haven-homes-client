import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {

  return (
    <>
    
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
    <div className="text-center space-y-6">
    <h1 className="text-9xl font-extrabold text-white">404</h1>
    <p className="text-2xl text-white font-semibold">Oops! Page not found.</p>
    <p className="text-md text-white">
      Sorry, the page you're looking for doesn't exist or has been moved.
    </p>
    <div className="flex justify-center space-x-4">
      <Link href="/" class="btn btn-primary">Go Home</Link>
      
    </div>
    {/* <div>
      <img src="https://i.ibb.co.com/WVwGb4W/error-text-broken-glass-font.jpg" alt="404 illustration" class="rounded-lg shadow-lg" />
    </div> */}
  </div>
    </div>
    
    </>
  );
}
