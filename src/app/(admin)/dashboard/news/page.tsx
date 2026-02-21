"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Save, Loader2, Star } from "lucide-react";

type News = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  read_time: string;
  category: string;
  featured: boolean;
};

const categories = ["Tournament", "Roster", "Feature", "Update"];

const emptyNews: Omit<News, "id"> = {
  title: "",
  excerpt: "",
  image: "",
  date: new Date().toISOString().split("T")[0],
  read_time: "5 min read",
  category: "Update",
  featured: false,
};

export default function NewsAdmin() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState<Omit<News, "id">>(emptyNews);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      setNews(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openModal = (item?: News) => {
    if (item) {
      setEditingNews(item);
      setFormData({
        title: item.title,
        excerpt: item.excerpt,
        image: item.image,
        date: item.date,
        read_time: item.read_time,
        category: item.category,
        featured: item.featured,
      });
    } else {
      setEditingNews(null);
      setFormData(emptyNews);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setFormData(emptyNews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingNews) {
      const { error } = await supabase
        .from("news")
        .update(formData)
        .eq("id", editingNews.id);

      if (!error) {
        await fetchNews();
        closeModal();
      } else {
        alert("Error updating news: " + error.message);
      }
    } else {
      const { error } = await supabase.from("news").insert([formData]);

      if (!error) {
        await fetchNews();
        closeModal();
      } else {
        alert("Error creating news: " + error.message);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (!error) {
      await fetchNews();
    } else {
      alert("Error deleting news: " + error.message);
    }
  };

  const toggleFeatured = async (item: News) => {
    const { error } = await supabase
      .from("news")
      .update({ featured: !item.featured })
      .eq("id", item.id);

    if (!error) {
      await fetchNews();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">News Management</h1>
          <p className="text-gray-400 mt-1">Manage news and announcements</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add News
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-red-500" size={40} />
        </div>
      ) : news.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400">No news articles found. Create your first article!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className={`bg-gray-800 rounded-lg overflow-hidden border ${
                item.featured ? "border-yellow-500" : "border-gray-700"
              } flex`}
            >
              <div className="w-48 h-32 bg-gray-700 flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
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
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded flex items-center gap-1">
                        <Star size={12} /> Featured
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500 text-sm">{item.read_time}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFeatured(item)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.featured
                          ? "bg-yellow-500 text-black hover:bg-yellow-600"
                          : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                      }`}
                      title={item.featured ? "Remove from featured" : "Set as featured"}
                    >
                      <Star size={16} />
                    </button>
                    <button
                      onClick={() => openModal(item)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
          <div className="bg-gray-800 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {editingNews ? "Edit News Article" : "Add News Article"}
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
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

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

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="featured" className="text-gray-300">
                  Feature this article
                </label>
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
                  {editingNews ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
