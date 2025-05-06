import { PenTool } from "lucide-react";

const Setting = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-6 w-full max-w-2xl rounded-2xl">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <PenTool color="blue" size={56} className="cursor-pointer sm:size-50" />
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold text-writly">Writly</h1>
      </div>

      {/* Settings Section */}
      <div className="bg-white text-black rounded-xl p-4 w-full shadow border text-center">
        <h2 className="text-xl font-bold mb-2">Account Settings</h2>
        <p className="text-sm mb-3">
          Manage your account, privacy, and notification preferences.
        </p>
      </div>
    </div>
  );
};

export default Setting;
