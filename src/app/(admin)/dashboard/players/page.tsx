"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";

type Player = {
  id: string;
  name: string;
  real_name: string;
  role: string;
  country: string;
  age: number;
  image: string;
  bio: string;
  kills: number;
  win_rate: string;
  kd: string;
  matches: number;
  twitter: string;
  youtube: string;
  twitch: string;
};

const emptyPlayer: Omit<Player, "id"> = {
  name: "",
  real_name: "",
  role: "",
  country: "",
  age: 18,
  image: "",
  bio: "",
  kills: 0,
  win_rate: "0%",
  kd: "0.0",
  matches: 0,
  twitter: "",
  youtube: "",
  twitch: "",
};

export default function PlayersAdmin() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState<Omit<Player, "id">>(emptyPlayer);

  const fetchPlayers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPlayers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const openModal = (player?: Player) => {
    if (player) {
      setEditingPlayer(player);
      setFormData({
        name: player.name,
        real_name: player.real_name,
        role: player.role,
        country: player.country,
        age: player.age,
        image: player.image,
        bio: player.bio,
        kills: player.kills,
        win_rate: player.win_rate,
        kd: player.kd,
        matches: player.matches,
        twitter: player.twitter,
        youtube: player.youtube,
        twitch: player.twitch,
      });
    } else {
      setEditingPlayer(null);
      setFormData(emptyPlayer);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPlayer(null);
    setFormData(emptyPlayer);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingPlayer) {
      const { error } = await supabase
        .from("players")
        .update(formData)
        .eq("id", editingPlayer.id);

      if (!error) {
        await fetchPlayers();
        closeModal();
      } else {
        alert("Error updating player: " + error.message);
      }
    } else {
      const { error } = await supabase.from("players").insert([formData]);

      if (!error) {
        await fetchPlayers();
        closeModal();
      } else {
        alert("Error creating player: " + error.message);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this player?")) return;

    const { error } = await supabase.from("players").delete().eq("id", id);

    if (!error) {
      await fetchPlayers();
    } else {
      alert("Error deleting player: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Players Management</h1>
          <p className="text-gray-400 mt-1">Manage your team roster</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Player
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-red-500" size={40} />
        </div>
      ) : players.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400">No players found. Add your first player!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
            >
              <div className="h-48 bg-gray-700 relative">
                {player.image ? (
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => openModal(player)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">{player.name}</h3>
                <p className="text-gray-400">{player.real_name}</p>
                <p className="text-red-500 text-sm mt-1">{player.role}</p>
                <div className="flex gap-4 mt-3 text-sm text-gray-400">
                  <span>{player.country}</span>
                  <span>Age {player.age}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {editingPlayer ? "Edit Player" : "Add New Player"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Player Name (IGN)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Real Name
                  </label>
                  <input
                    type="text"
                    value={formData.real_name}
                    onChange={(e) =>
                      setFormData({ ...formData, real_name: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="e.g., Team Captain / Fragger"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: parseInt(e.target.value) })
                    }
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
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-white mb-3">Stats</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Kills
                    </label>
                    <input
                      type="number"
                      value={formData.kills}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kills: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Win Rate
                    </label>
                    <input
                      type="text"
                      value={formData.win_rate}
                      onChange={(e) =>
                        setFormData({ ...formData, win_rate: e.target.value })
                      }
                      placeholder="e.g., 94%"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">K/D</label>
                    <input
                      type="text"
                      value={formData.kd}
                      onChange={(e) =>
                        setFormData({ ...formData, kd: e.target.value })
                      }
                      placeholder="e.g., 4.2"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Matches
                    </label>
                    <input
                      type="number"
                      value={formData.matches}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          matches: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Social Links
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={formData.twitter}
                      onChange={(e) =>
                        setFormData({ ...formData, twitter: e.target.value })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={formData.youtube}
                      onChange={(e) =>
                        setFormData({ ...formData, youtube: e.target.value })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Twitch
                    </label>
                    <input
                      type="url"
                      value={formData.twitch}
                      onChange={(e) =>
                        setFormData({ ...formData, twitch: e.target.value })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
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
                  {editingPlayer ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
