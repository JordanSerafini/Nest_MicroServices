
function Page404() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100 flex-col">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <p className="mt-4">La page recherchée n'existe pas</p>
      </div>
        <a href="/" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          Retour accueil
        </a>
    </div>
  );
}

export default Page404;
