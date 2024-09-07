import Blog from "../../model/blog";
import connectToDb from "../../database/index";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

// Export PUT method for handling the request
export async function PUT(req) {
  try {
    // Connect to the database
    await connectToDb();

    // Extract blog ID from URL query parameters
    const { searchParams } = new URL(req.url);
    const currentBlogId = searchParams.get("id");

    if (!currentBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog Id is required",
      });
    }

    // Parse request JSON data
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    // Validate input data
    const { error } = AddNewBlog.validate({ title, description });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Update the blog entry
    const updatedBlog = await Blog.findByIdAndUpdate(
      currentBlogId,
      { title, description },
      { new: true }
    );

    if (updatedBlog) {
      return NextResponse.json({
        success: true,
        message: "Blog updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Blog not found. Please check the ID",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
