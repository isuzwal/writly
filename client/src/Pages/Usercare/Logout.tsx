import { PenTool } from "lucide-react";

const Logout = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-6 w-full max-w-2xl rounded-2xl">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <PenTool color="blue" size={56} className="cursor-pointer sm:size-50" />
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold text-writly">Writly</h1>
      </div>
      {/* Delete Account Section */}
      <div className="bg-white text-black text-center rounded-xl p-4 w-full shadow border">
        <h2 className="text-xl font-bold mb-2">Delete your account?</h2>
        <p className="text-sm">
          If you delete your Writly account, all your posts, stories, and data will be permanently removed. This action cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default Logout;
