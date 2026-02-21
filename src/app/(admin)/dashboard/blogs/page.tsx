"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  read_time: string;
  category: string;
  tags: string[];
};

const categories = ["Strategy", "Analysis", "Guides", "Interviews"];

const emptyBlog: Omit<Blog, "id"> = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  author: "",
  date: new Date().toISOString().split("T")[0],
  read_time: "5 min read",
  category: "Strategy",
  tags: [],
};

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<Omit<Blog, "id">>(emptyBlog);
  const [tagInput, setTagInput] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openModal = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image,
        author: blog.author,
        date: blog.date,
        read_time: blog.read_time,
        category: blog.category,
        tags: blog.tags || [],
      });
    } else {
      setEditingBlog(null);
      setFormData(emptyBlog);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setFormData(emptyBlog);
    setTagInput("");
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingBlog) {
      const { error } = await supabase
        .from("blogs")
        .update(formData)
        .eq("id", editingBlog.id);

      if (!error) {
        await fetchBlogs();
        closeModal();
      } else {
        alert("Error updating blog: " + error.message);
      }
    } else {
      const { error } = await supabase.from("blogs").insert([formData]);

      if (!error) {
        await fetchBlogs();
        closeModal();
      } else {
        alert("Error creating blog: " + error.message);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (!error) {
      await fetchBlogs();
    } else {
      alert("Error deleting blog: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Blogs Management</h1>
          <p className="text-gray-400 mt-1">Manage your blog posts</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Blog Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-red-500" size={40} />
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400">No blog posts found. Create your first post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex"
            >
              <div className="w-48 h-32 bg-gray-700 flex-shrink-0">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded">
                      {blog.category}
                    </span>
                    <span className="text-gray-500 text-sm">{blog.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500 text-sm">
                    By {blog.author} - {blog.read_time}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(blog)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Excerpt (Short Description)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={2}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={8}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) =>
                      setFormData({ ...formData, read_time: e.target.value })
                    }
                    placeholder="e.g., 5 min read"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add a tag..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Save size={20} />
                  )}
                  {editingBlog ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
