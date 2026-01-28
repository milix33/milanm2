export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
        <p className="mt-4 text-gray-600">Učitavanje...</p>
      </div>
    </div>
  )
}
