export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-neutral-200/60 dark:border-neutral-800/60 text-center text-sm text-neutral-500 dark:text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">Clean Structural Skeleton Baseline</p>
      </div>
    </footer>
  );
}
