const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Welcome to the Root Index</h1>
      <p className="text-lg text-gray-600 max-w-xl">
        This component renders when the URL is exactly <code className="bg-gray-200 p-1 rounded">/</code>.
      </p>
    </div>
  );
};

export default HomePage;
