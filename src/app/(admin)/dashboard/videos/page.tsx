"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Save, Loader2, Play } from "lucide-react";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  youtube_id: string;
  views: string;
  duration: string;
  category: string;
  featured: boolean;
};

const categories = ["Highlights", "Tournaments", "Behind the Scenes", "Tutorials"];

const emptyVideo: Omit<Video, "id"> = {
  title: "",
  thumbnail: "",
  youtube_id: "",
  views: "0",
  duration: "0:00",
  category: "Highlights",
  featured: false,
};

export default function VideosAdmin() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState<Omit<Video, "id">>(emptyVideo);

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openModal = (video?: Video) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title,
        thumbnail: video.thumbnail,
        youtube_id: video.youtube_id,
        views: video.views,
        duration: video.duration,
        category: video.category,
        featured: video.featured,
      });
    } else {
      setEditingVideo(null);
      setFormData(emptyVideo);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVideo(null);
    setFormData(emptyVideo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingVideo) {
      const { error } = await supabase
        .from("videos")
        .update(formData)
        .eq("id", editingVideo.id);

      if (!error) {
        await fetchVideos();
        closeModal();
      } else {
        alert("Error updating video: " + error.message);
      }
    } else {
      const { error } = await supabase.from("videos").insert([formData]);

      if (!error) {
        await fetchVideos();
        closeModal();
      } else {
        alert("Error creating video: " + error.message);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    const { error } = await supabase.from("videos").delete().eq("id", id);

    if (!error) {
      await fetchVideos();
    } else {
      alert("Error deleting video: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Videos Management</h1>
          <p className="text-gray-400 mt-1">Manage your video gallery</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Video
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-red-500" size={40} />
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400">No videos found. Add your first video!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
            >
              <div className="relative aspect-video bg-gray-700">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Thumbnail
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => openModal(video)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {video.featured && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                    Featured
                  </span>
                )}
                <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded">
                    {video.category}
                  </span>
                </div>
                <h3 className="text-white font-semibold line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{video.views} views</p>
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
                {editingVideo ? "Edit Video" : "Add New Video"}
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
                  YouTube Video ID
                </label>
                <input
                  type="text"
                  value={formData.youtube_id}
                  onChange={(e) =>
                    setFormData({ ...formData, youtube_id: e.target.value })
                  }
                  placeholder="e.g., dQw4w9WgXcQ"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  required
                />
                <p className="text-gray-500 text-xs mt-1">
                  The ID from the YouTube URL (e.g., youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>)
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., 12:34"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Views
                  </label>
                  <input
                    type="text"
                    value={formData.views}
                    onChange={(e) =>
                      setFormData({ ...formData, views: e.target.value })
                    }
                    placeholder="e.g., 125K"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
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
                  Feature this video
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
                  {editingVideo ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
