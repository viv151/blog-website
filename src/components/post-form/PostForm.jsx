import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";

const PostForm = ({ post }) => {
  const { register, setValue, handleSubmit, getValues, watch, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      //update the existing post
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage); //delete the old file after the new one is uploaded
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,

        if(dbPost) {
          navigate(`/post/${dbPost.$id}`);
        },
      });
    } else {
      //create a new post

      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
    }
  };

  return <div>PostForm</div>;
};

export default PostForm;
