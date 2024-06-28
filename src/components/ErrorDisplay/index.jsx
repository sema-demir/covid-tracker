import { IoWarningSharp } from "react-icons/io5";

const ErrorDisplay = ({ message, retry }) => {
  return (
    <>
      <div className="bg-red-500 rounded-md p-5 flex items-center gap-4">
        <IoWarningSharp className="text-4xl" />
        <div>
          <h2>Üzgünüz Bir Hata Oluştu</h2>
          <p>{message}</p>
        </div>
      </div>
      <button
        onClick={retry}
        className="border text-gray-600 transition hover:bg-gray-100 p-2 rounded-md"
      >
        Tekrar Dene
      </button>
    </>
  );
};

export default ErrorDisplay;
