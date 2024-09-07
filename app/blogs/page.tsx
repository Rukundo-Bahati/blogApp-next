import BlogOverView from "../components/blog-overview";

interface BlogData {
  _id: string;
  title: string;
  description: string;
}

interface ApiResponse {
  data: BlogData[];
}

async function fetchBlogs(): Promise<BlogData[] | undefined> {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: 'no-store'
    });

    const result: ApiResponse = await apiResponse.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

async function Blogs() {
  const blogList = await fetchBlogs();
  console.log(blogList);
  return <BlogOverView blogList={blogList || []} />;
}

export default Blogs;
