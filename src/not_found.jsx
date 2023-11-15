import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hivetechLogo } from "../src/assets/index"

const NotFound = () => {
  const [counter, setCounter] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      navigate("/");
    }
  }, [counter, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src={hivetechLogo}
        alt="Logo"
        className="w-20% h-20% mb-8"
        loading="lazy"
      />
      <h1 className="text-3xl font-bold mb-4">
        The page you&apos;re looking for could not be found.
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        Redirecting to the home page in {counter} seconds...
      </p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
