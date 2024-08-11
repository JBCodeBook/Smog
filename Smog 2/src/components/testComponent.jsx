const TestComponent = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <header className="bg-blue-600 text-white w-full py-4 mb-8">
        <h1 className="text-center text-3xl font-bold">Welcome to My Tailwind Page</h1>
      </header>

      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Card Title</h2>
        <p className="text-gray-700 mb-4">
          This is a simple card component. Tailwind CSS is applied to style this card with a shadow, padding, and rounded corners.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Click Me
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
