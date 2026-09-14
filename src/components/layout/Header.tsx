export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div>
        {/* User info or auth buttons can go here */}
        <span className="text-gray-700">Welcome, Admin</span>
      </div>
    </header>
  );
}
