"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Save, Loader2, ExternalLink } from "lucide-react";

type Sponsor = {
  id: string;
  name: string;
  tier: string;
  description: string;
  logo: string;
  website: string;
};

const tiers = ["Title Sponsor", "Premium Partner", "Official Partner"];

const emptySponsor: Omit<Sponsor, "id"> = {
  name: "",
  tier: "Official Partner",
  description: "",
  logo: "",
  website: "",
};

export default function SponsorsAdmin() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState<Omit<Sponsor, "id">>(emptySponsor);

  const fetchSponsors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSponsors(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const openModal = (sponsor?: Sponsor) => {
    if (sponsor) {
      setEditingSponsor(sponsor);
      setFormData({
        name: sponsor.name,
        tier: sponsor.tier,
        description: sponsor.description,
        logo: sponsor.logo,
        website: sponsor.website,
      });
    } else {
      setEditingSponsor(null);
      setFormData(emptySponsor);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSponsor(null);
    setFormData(emptySponsor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingSponsor) {
      const { error } = await supabase
        .from("sponsors")
        .update(formData)
        .eq("id", editingSponsor.id);

      if (!error) {
        await fetchSponsors();
        closeModal();
      } else {
        alert("Error updating sponsor: " + error.message);
      }
    } else {
      const { error } = await supabase.from("sponsors").insert([formData]);

      if (!error) {
        await fetchSponsors();
        closeModal();
      } else {
        alert("Error creating sponsor: " + error.message);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sponsor?")) return;

    const { error } = await supabase.from("sponsors").delete().eq("id", id);

    if (!error) {
      await fetchSponsors();
    } else {
      alert("Error deleting sponsor: " + error.message);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Title Sponsor":
        return "text-yellow-400 border-yellow-500";
      case "Premium Partner":
        return "text-red-400 border-red-500";
      default:
        return "text-gray-400 border-gray-500";
    }
  };

  // Group sponsors by tier
  const sponsorsByTier = tiers.reduce((acc, tier) => {
    acc[tier] = sponsors.filter((s) => s.tier === tier);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Sponsors Management</h1>
          <p className="text-gray-400 mt-1">Manage your partners and sponsors</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Sponsor
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-red-500" size={40} />
        </div>
      ) : sponsors.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400">No sponsors found. Add your first sponsor!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {tiers.map((tier) => {
            const tierSponsors = sponsorsByTier[tier];
            if (tierSponsors.length === 0) return null;

            return (
              <div key={tier}>
                <h2 className={`text-xl font-bold mb-4 ${getTierColor(tier).split(" ")[0]}`}>
                  {tier} ({tierSponsors.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tierSponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className={`bg-gray-800 rounded-lg overflow-hidden border-l-4 ${getTierColor(sponsor.tier)}`}
                    >
                      <div className="h-32 bg-gray-700 relative">
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            No Logo
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={() => openModal(sponsor)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(sponsor.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white">
                            {sponsor.name}
                          </h3>
                          {sponsor.website && (
                            <a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${getTierColor(sponsor.tier).split(" ")[0]}`}>
                          {sponsor.tier}
                        </p>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                          {sponsor.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {editingSponsor ? "Edit Sponsor" : "Add New Sponsor"}
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
                <label className="block text-sm text-gray-400 mb-1">
                  Sponsor Name
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
                  Partnership Tier
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) =>
                    setFormData({ ...formData, tier: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                >
                  {tiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
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
                  {editingSponsor ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
