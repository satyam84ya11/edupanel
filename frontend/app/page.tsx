export default function Home() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">Kids Academy</h1>
        <p className="text-gray-600 mb-8">School Management System</p>
        <a
          href="/login"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
