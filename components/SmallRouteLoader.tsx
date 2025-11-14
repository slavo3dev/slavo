export default function SmallRouteLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div className="w-5 h-5 mx-auto mt-2 border-2 rounded-full animate-spin border-black/30 border-t-black dark:border-white/30 dark:border-t-white" />
    </div>
  );
}
