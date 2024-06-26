import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../../redux/action";

const DetailPage = () => {
  //ülkeyi parametre olarak gönderdik
  const { country } = useParams();
  //console.log(param);
  const dispatch = useDispatch();

  //asenkron thunk aksiyonunu dispatch edip country parametresi ile  tetkliyoruz
  useEffect(() => {
    dispatch(getData(country));
  }, []);

  return (
    <div className="h-[calc(100vh-75px)] bg-zinc-800 text-white p-6">
      Detail Page
    </div>
  );
};

export default DetailPage;
