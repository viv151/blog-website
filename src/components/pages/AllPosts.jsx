import React, { useEffect, useState } from "react";
import { PostCard, Container } from "../../components";
import appwriteService from "../../appwrite/config";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      //empty array in getPosts because we dont want to pass any query rn and just return all the array in an array.
      if (posts) {
        setPosts(posts.rows);
      }
    });
  }, []);

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex-wrap flex">
          {posts?.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
