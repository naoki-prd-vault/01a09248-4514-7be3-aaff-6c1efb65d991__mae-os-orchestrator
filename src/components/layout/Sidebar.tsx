import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      <div className="text-2xl font-bold mb-6">Mae Orchestrator</div>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="block hover:bg-gray-700 p-2 rounded">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/agents" className="block hover:bg-gray-700 p-2 rounded">
              Agents
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/knowledge-bases" className="block hover:bg-gray-700 p-2 rounded">
              Knowledge Bases
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/settings" className="block hover:bg-gray-700 p-2 rounded">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
