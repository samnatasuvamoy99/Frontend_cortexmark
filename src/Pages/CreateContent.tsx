import { useState, useRef } from "react";
import { CrossIcon } from "../icons/Delete";
import { Button } from "../components/Button";
import { Submit } from "../icons/Submit";
import { Input } from "../components/input";
import { Logo } from "../icons/Logo";
import axios from "axios";
import { BACKEND_URL } from "../Config";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
  Documents: "documents",
  Account: "account",
  Others: "others",
} as const;
type ContentType = (typeof ContentType)[keyof typeof ContentType];

const typeOptions: { key: ContentType; label: string; emoji: string }[] = [
  { key: ContentType.Youtube, label: "YouTube", emoji: "🎬" },
  { key: ContentType.Twitter, label: "Twitter", emoji: "🐦" },
  { key: ContentType.Documents, label: "Document", emoji: "📄" },
  { key: ContentType.Account, label: "Account", emoji: "👤" },
  { key: ContentType.Others, label: "Others", emoji: "🔗" },
];

export function CreateContent({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, Setloading] = useState(false);
  const [type, Settype] = useState<ContentType>(ContentType.Youtube);

  const TitleRef = useRef<HTMLInputElement>(null);
  const LinkRef = useRef<HTMLInputElement>(null);

  async function addcontent() {
    const title = TitleRef.current?.value;
    const link = LinkRef.current?.value;

    if (!title || !link) {
      alert("Please enter both a title and a link.");
      return;
    }

    try {
      Setloading(true);

      await axios.post(
        `${BACKEND_URL}/api/v1/content/addcontent`,
        { type, title, link },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Your content was added successfully!");
      onClose();
    } catch (err: any) {
      console.error("Content add error:", err);
      alert(
        err.response?.data?.message || "Failed to add content. Please try again."
      );
    } finally {
      Setloading(false);
    }
  }

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
          <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 relative w-[90%] max-w-md p-8">
            {/* Close Button */}
            <div
              className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform text-gray-400 hover:text-red-500"
              onClick={onClose}
            >
              <CrossIcon />
            </div>

            {/* Logo */}
            <div className="flex gap-1.5 text-xl text-purple-600 justify-center items-center mb-1">
              <Logo />
              <b className="border px-2 py-0.5 rounded-md shadow-sm">
                CortexMark
              </b>
            </div>
            <p className="text-center text-sm text-gray-500 mb-6">
              Save a new piece of content
            </p>

            {/* Form Fields */}
            <div className="flex flex-col gap-4 mb-4">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Title
                </label>
                <Input
                  reference={TitleRef}
                  placeholder="e.g. My Favorite React Tutorial"
                  type="text"
                />
              </div>

              {/* Link */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Link
                </label>
                <Input
                  reference={LinkRef}
                  placeholder="https://example.com/..."
                  type="text"
                />
                <p className="text-xs text-gray-400">
                  Paste the full URL of the resource you want to save.
                </p>
              </div>

              {/* Content Type */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">
                  Content Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {typeOptions.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => Settype(opt.key)}
                      className={`
                        flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium
                        border-2 transition-all duration-150 cursor-pointer
                        ${
                          type === opt.key
                            ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200"
                            : "bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600"
                        }
                      `}
                    >
                      <span className="text-base">{opt.emoji}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-5">
              <Button
                onClick={addcontent}
                variant="primary"
                text="Save Content"
                styleType="primarystyle"
                endIcon={<Submit />}
                fullwidth={true}
                loading={loading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
