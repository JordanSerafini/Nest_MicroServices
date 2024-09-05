interface LoaderProps {
  css?: string;
}

function Loader({css}: LoaderProps) {
  return (
    <button
      type="button"
      className={`font-bold py-2 px-4 rounded inline-flex items-center w-full justify-center sm:text-sm sm:leading-5 h-full ${css}`}
      disabled
    >
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25 text-black"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.313 2.687 6 6 6v-2.709z"
        ></path>
      </svg>
      Chargement...
    </button>
  );
}

export default Loader;
