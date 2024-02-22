import React from "react";

const Header = () => {
  return (
    <div className="bg-blue-300 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://play-lh.googleusercontent.com/b15vc_mODR5xBbFKCjw4pq7c7FZrB5DpS99MoIbVXDTWaLa3nMbzXCRBcZgIQwwBCBU"
            className="w-16 rounded"
          />
          <p className="font-semibold text-2xl text-gray-600">SoundCloud.com</p>
        </div>
        <div className="flex items-center font-semibold space-x-5">
          <a
            href="#"
            className="bg-gray-600 p-2 rounded text-white hover:bg-gray-700"
          >
            Home
          </a>
          <a href="#" target="blank">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbJtwnGnsGI34PgVFkw6QA1WaCfPdt_GxVzQ&usqp=CAU"
              alt="GitHub-Icon"
              className="w-12 rounded-lg"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
