import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin panel
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {users.length} registered {users.length === 1 ? "user" : "users"}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {user.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
