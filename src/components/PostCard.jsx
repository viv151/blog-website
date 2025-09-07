import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

const PostCard = ({ $id, title, featuredimg }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 ">
        <div className="w-full  justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredimg)}
            alt={title}
            className="roundex-xl"
          />
        </div>
        <h2 className="text-xl font-bold ">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
