// Add the "use client" directive at the top of your file
"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const initialBlogFormData = {
  title: "",
  description: "",
};

type Blog = {
  _id: string;
  title: string;
  description: string;
};

interface BlogOverViewProps {
  blogList: Blog[];
}

function BlogOverView({ blogList: initialBlogList }: BlogOverViewProps) {
  const [openBlogDialog, setOpenBlogDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogId, setcurrentEditedBlogId] = useState<string | null>(null);
  const [blogList, setBlogList] = useState<Blog[]>(initialBlogList);

  const handleBlogDelete = async (blogId: string) => {
    console.log("Deleting blog with ID:", blogId); // Log blogId for debugging
    try {
      if (!blogId) {
        console.error("No blog ID provided");
        return;
      }

      const apiResponse = await fetch(`/api/delete-blog?id=${blogId}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();

      if (result?.success) {
        setBlogList(blogList.filter(blog => blog._id !== blogId));
      } else {
        console.error("Failed to delete blog:", result.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEditBlog = (currentBlog: Blog) => {
    setcurrentEditedBlogId(currentBlog._id);
    setBlogFormData({
      title: currentBlog.title,
      description: currentBlog.description,
    });
    setOpenBlogDialog(true);
  };

  const handleSaveBlogData = async () => {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogId == null
          ? await fetch(`/api/add-blog`, {
              method: "POST",
              body: JSON.stringify(blogFormData),
              headers: {
                'Content-Type': 'application/json',
              },
            })
          : await fetch(`/api/update-blog?id=${currentEditedBlogId}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
              headers: {
                'Content-Type': 'application/json',
              },
            });

      const result = await apiResponse.json();
      if (result?.success) {
        if (currentEditedBlogId == null) {
          setBlogList([...blogList, { ...blogFormData, _id: result.newBlogId }]);
        } else {
          setBlogList(blogList.map(blog =>
            blog._id === currentEditedBlogId ? { ...blogFormData, _id: currentEditedBlogId } : blog
          ));
        }
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        setcurrentEditedBlogId(null);
      } else {
        console.error("Failed to save blog:", result.message);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div>
        <AddNewBlog
          openBlogDialog={openBlogDialog}
          setOpenBlogDialog={setOpenBlogDialog}
          loading={loading}
          setLoading={setLoading}
          blogFormData={blogFormData}
          setBlogFormData={setBlogFormData}
          handleSaveBlogData={handleSaveBlogData}
          initialBlogFormData={initialBlogFormData}
          currentEditedBlogId={currentEditedBlogId}
          setcurrentEditedBlogId={setcurrentEditedBlogId}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((blog) => (
            <Card className="p-5" key={blog._id}>
              <CardContent>
                <CardTitle className="mb-5">{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
                <div className="mt-5 flex gap-5 items-center">
                  <Button onClick={() => handleEditBlog(blog)}>Edit</Button>
                  <Button onClick={() => handleBlogDelete(blog._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold text-center">
            "No Blog Found"
          </Label>
        )}
      </div>
    </div>
  );
}

export default BlogOverView;
