import React, { useEffect, useState } from "react";
import axios from "axios";

const CardData = () => {
  const [userCount, setUserCount] = useState(null);
  const [animalCount, setAnimalCount] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/user-count");
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchAnimalCount = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/animal-count");
        setAnimalCount(response.data.count);
      } catch (error) {
        console.error("Error fetching animal count:", error);
      }
    };

    fetchAnimalCount();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-4 justify-center items-center">
      {/* Card 1: Users */}
      <div className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-lg p-6 border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>👤</span> Users
        </h2>
        <p className="text-lg mb-4">
          Total number of users:{" "}
          <span className="text-4xl font-extrabold">
            {userCount !== null ? userCount : "Loading..."}
          </span>
        </p>
        <button className="px-4 py-2 bg-white text-green-600 font-semibold rounded hover:bg-gray-100">
          Learn More
        </button>
      </div>

      {/* Card 2: Animals */}
      <div className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg rounded-lg p-6 border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🐾</span> Animals
        </h2>
        <p className="text-lg mb-4">
          Total number of animals:{" "}
          <span className="text-4xl font-extrabold">
            {animalCount !== null ? animalCount : "Loading..."}
          </span>
        </p>
        <button className="px-4 py-2 bg-white text-purple-600 font-semibold rounded hover:bg-gray-100">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CardData;
