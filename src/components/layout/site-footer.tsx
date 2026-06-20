export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-gray-500 sm:flex-row dark:text-gray-400">
        <p>© {year} grove. All rights reserved.</p>
        <p>
          Built with Next.js, Auth.js, Prisma &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
