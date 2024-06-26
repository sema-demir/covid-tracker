import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../redux/action";
import { IoIosArrowBack } from "react-icons/io";
import InfoCard from "../../components/InfoCard.jsx";
const DetailPage = () => {
  const { data, error, isLoading } = useSelector((store) => store);
  //ülkeyi parametre olarak gönderdik
  const { country } = useParams();
  //console.log(param);

  //dispatch kurulumu
  const dispatch = useDispatch();

  //asenkron thunk aksiyonunu dispatch edip country parametresi ile  tetkliyoruz
  useEffect(() => {
    dispatch(getData(country));
  }, []);

  return (
    <div className="h-[calc(100vh-75px)] bg-zinc-800 text-white p-6 grid place-items-center ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
        {/* Üst içerik */}
        <div className="flex gap-5 justify-between items-center mb-6">
          <Link
            className="bg-gray-700 py-2 px-4 flex items-center rounded-md gap-2 hover:bg-gray-800"
            to={"/"}
          >
            <IoIosArrowBack />
            Back
          </Link>
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <div></div>
            ) : (
              !error && (
                <>
                  <img
                    className="w-12 h-12 rounded-md"
                    src={data.country.flags.svg}
                  />
                  <h1 className="text-3xl font-bold text-gray-900">
                    {data.country.name.common}
                  </h1>
                </>
              )
            )}
          </div>
        </div>
        {/* Detaylar */}
        <InfoCard />
      </div>
    </div>
  );
};

export default DetailPage;
