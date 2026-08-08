export default function Unauth() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500">401</h1>
        <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>
        <h3 className="mt-4 text-sm text-slate-50/70">Please sign in to access this page.</h3>
      </div>
    </div>
  );
}
