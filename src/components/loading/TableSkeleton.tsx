export default function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="h-14 animate-pulse rounded-lg bg-gray-200"
        />
      ))}
    </div>
  );
}