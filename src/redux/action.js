//API lardan bayrak ve ülke covid verisini alacak ve slice 'a aktaracak asenkron thunk aksiyonu yazalım

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../constants";

export const getData = createAsyncThunk("countryData", async (isoCode) => {
  const params = { iso: isoCode };

  //API den covid  bilgilerini al
  const req1 = axios.get(
    ` https://covid-19-statistics.p.rapidapi.com/reports`,
    { params, headers }
  );

  //2. API dan ülke detaylarını al
  const req2 = axios.get(`https://restcountries.com/v3.1/name/${isoCode}`);

  //Her iki Api istegiini senkron bir paralel şeklinde gönder
  const responses = await Promise.all([req1, req2]);
  //covid bilgilerindeki region nesnesini covid nesnesi içerine dagıt
  const covid = {
    ...responses[0].data.data[0],
    ...responses[0].data.data[0].region,
  };

  //gereksiz değerleri kaldır
  delete covid.region;
  delete covid.cities;

  console.log(covid);

  //payloadı return edecegiz
  return {
    covid,
    country: responses[1].data[0],
  };
});
