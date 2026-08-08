import { ShieldAlert, LogIn } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

export default function Unauth() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#06070B] bg-cyber-grid text-slate-100 selection:bg-[#FF2E63] selection:text-white">
      <div className="relative bg-[#0F121C]/90 backdrop-blur-md border border-[#FF2E63]/40 p-8 sm:p-12 rounded-2xl max-w-md w-full text-center space-y-6 shadow-[0_0_30px_rgba(255,46,99,0.2)]">
        
        {/* Warning Icon Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF2E63]/10 border border-[#FF2E63]/40 text-[#FF2E63] mx-auto animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Text Error Content */}
        <div className="space-y-2">
          <h1 className="text-5xl font-black font-orbitron text-[#FF2E63] tracking-widest">
            401
          </h1>
          <h2 className="text-xl font-bold uppercase tracking-wider font-orbitron text-white">
            Access Denied
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Authorization clearance missing. Please authenticate to view protected target files.
          </p>
        </div>

        {/* Sign In Trigger */}
        <SignInButton>
          <button className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#00F0FF] hover:bg-[#00D0DF] text-black font-orbitron font-bold uppercase tracking-wider text-xs rounded-xl transition shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95">
            <LogIn className="w-4 h-4" />
            <span>Authenticate Agent</span>
          </button>
        </SignInButton>

      </div>
    </div>
  );
}