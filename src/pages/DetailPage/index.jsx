import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../redux/action";
import { IoIosArrowBack } from "react-icons/io";
import InfoCard from "../../components/InfoCard.jsx";
import Loader from "../../components/Loader/index.jsx";
import ErrorDisplay from "../../components/ErrorDisplay/index.jsx";
import HeaderLoader from "../../components/Loader/HeaderLoader.jsx";
const DetailPage = () => {
  const { data, error, isLoading } = useSelector((store) => store);
  //ülkeyi parametre olarak gönderdik
  const { country } = useParams();
  //console.log(param);

  //dispatch kurulumu
  const dispatch = useDispatch();

  //verileri alacak fonksiyon
  const fetchData = () => {
    dispatch(getData(country));
  };

  //asenkron thunk aksiyonunu dispatch edip country parametresi ile  tetkliyoruz
  useEffect(() => {
    fetchData();
  }, []);
  //covid bilgilerini diziye cevir
  //nesneyi diziye cevirmek istersek Object.entries metodunu kullanıyoruz

  const covidData = Object.entries(data?.covid || {});
  console.log(covidData);

  return (
    <div className="min-h-[calc(100vh-75px)] bg-zinc-800 text-white p-6 grid place-items-center ">
      <div className="bg-white min-h-[80vh] rounded-lg shadow-lg p-8 max-w-3xl">
        {/* Üst içerik */}
        <div className="flex gap-5 justify-between items-center mb-6">
          <Link
            className="bg-gray-700 py-2 px-4 flex items-center rounded-md gap-2 hover:bg-gray-800"
            to={"/"}
          >
            <IoIosArrowBack />
            Geri
          </Link>
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <HeaderLoader />
            ) : (
              !error &&
              data && (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Detaylar */}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorDisplay message={error} retry={fetchData} />
          ) : (
            covidData.map((item, key) => <InfoCard key={key} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
