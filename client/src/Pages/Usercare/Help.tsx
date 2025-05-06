import { PenTool} from "lucide-react";

const Help = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-6 w-full max-w-2xl rounded-2xl">

      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <PenTool color="blue" size={56} className="cursor-pointer sm:size-50" />
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold text-writly">Writly</h1>
      </div>

      {/* Help Center Section */}
      <div className="bg-white text-black rounded-xl p-4 w-full shadow border text-center">
        <h2 className="text-xl font-bold mb-2">Help Center</h2>
        <p className="text-sm mb-1">
          Need help with your account, posts, or settings?
        </p>
        <p className="text-sm">
       Message us at{" "}
      <a href="mailto:ujjwalgaihre45t@gmail.com" className="font-medium text-blue-700 underline">
       writly
     </a>, or reach out on{" "}
     <a href="https://x.com/Ujjwal_2061" target="_blank" className="font-medium text-blue-500 underline">
      Twitter
     </a> or{" "}
      {/* <a href="https://discord.gg/your-invite-code" target="_blank" className="font-medium text-indigo-600 underline">
       Discord
     </a>. */}
    </p>
      </div>
    </div>
  );
};

export default Help;
