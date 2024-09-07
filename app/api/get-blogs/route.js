import Blog from "../../model/blog";
import connectToDb from "../../database/index";
import { NextResponse } from "next/server";

export async function GET(req) {  
  try {
    await connectToDb();  
    const fetchBlogs = await Blog.find({}); 

    // Check if blogs are fetched
    if (fetchBlogs.length > 0) {
      return NextResponse.json({
        success: true,
        data: fetchBlogs,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No blogs found.",
      });
    }
  } catch (err) {
    // Return error response
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Try again.",
      error: err.message,  // Optional: include error details for debugging
    });
  }
}
