"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AddNewBlogProps {
  openBlogDialog: boolean;
  setOpenBlogDialog: (arg0: boolean) => void;
  loading: boolean;
  setLoading: (arg0: boolean) => void; // Add this line
  blogFormData: { title: string; description: string };
  setBlogFormData: (arg0: { title: string; description: string }) => void;
  handleSaveBlogData: () => void;
  initialBlogFormData: { title: string; description: string };
  currentEditedBlogId: string | null;
  setcurrentEditedBlogId: (arg0: string | null) => void;
}

const AddNewBlog = ({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  setLoading, // Ensure this is included
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
  initialBlogFormData,
  currentEditedBlogId,
  setcurrentEditedBlogId,
}: AddNewBlogProps) => {
  return (
    <>
      <div>
        <Button onClick={() => setOpenBlogDialog(true)}>Add a new Blog</Button>
      </div>
      <div>Blog List Section</div>
      <Dialog
        open={openBlogDialog}
        onOpenChange={() => {
          setOpenBlogDialog(false);
          setBlogFormData(initialBlogFormData);
          setcurrentEditedBlogId(null);
        }}
      >
        <DialogContent className="sm:mx-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedBlogId ? "Edit Blog" : "Add new blog"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter Blog Title"
                id="title"
                className="col-span-3"
                value={blogFormData.title}
                onChange={(e) =>
                  setBlogFormData({ ...blogFormData, title: e.target.value })
                }
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Blog Description"
                className="col-span-3"
                value={blogFormData.description}
                onChange={(e) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveBlogData}>
              {loading ? "Saving Changes" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewBlog;
