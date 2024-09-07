import Blog from "../../model/blog";
import connectToDb from "../../database/index";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    // Ensure connection to the database
    await connectToDb();
    console.log("Database connection successful");

    // Extract blog ID from URL query parameters
    const { searchParams } = new URL(req.url);
    const currentBlogId = searchParams.get("id");

    if (!currentBlogId) {
      console.log("Blog ID is required");
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    console.log(`Attempting to delete blog with ID: ${currentBlogId}`);

    // Attempt to delete the blog
    const blogToDelete = await Blog.findByIdAndDelete(currentBlogId);

    if (blogToDelete) {
      console.log(`Blog with ID ${currentBlogId} deleted successfully`);
      return NextResponse.json({
        success: true,
        message: "Blog deleted successfully",
      });
    } else {
      console.log(`Blog with ID ${currentBlogId} not found`);
      return NextResponse.json({
        success: false,
        message: "Blog not found. Please try again",
      });
    }
  } catch (err) {
    console.error("Error deleting blog:", err);  // Log the error for debugging
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
