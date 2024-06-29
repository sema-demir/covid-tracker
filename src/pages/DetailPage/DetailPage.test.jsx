import { render, screen } from "@testing-library/react";
import DetailPage from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import { thunk } from "redux-thunk";
import { storeData } from "../../constants";
//test ortamındaki store un kurulumunu yap thunk middleware in kullandığımızı söyle
const mockStore = configureStore([thunk]);

it("Yüklenme durumunda doğru bileşenler ekrana basılır", () => {
  const store = mockStore({
    isLoading: true,
    error: false,
    data: null,
  });
  // Bileşeni gerekli kapsayıcıları tanımlayarak renderla
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );
  //Loader ekrana geliyormu kontrol et
  screen.getAllByTestId("card-loader");
  screen.getByTestId("header-loader");
});

it("hata gelme durumunda hata bileşeni ekrana basılır", () => {
  //store un hata durumundaki verisini simüle ediyoruz
  const store = mockStore({
    isLoading: false,
    error: "Cannot read properties of undefined (reading region)",
    data: null,
  });
  //Test edilecek bileşeni renderla
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );
  //Hatanın mesajını gösteren bileşen ekerana basıldı mı
  screen.getByText(/Cannot read properties/i);
});

it("veri gelme durumunda dogru kartlar ekrana basılır", () => {
  const store = mockStore(storeData);
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );
  //Ülke bayrağı ekrana basılıyormu
  const image = screen.getByRole("img");

  //Resmin kaynağı doğrumu
  expect(image).toHaveProperty("src", "https://flagcdn.com/tr.svg");

  //Ülke Başlğı ekrana geliyormu
  const title = screen.getByTestId("title");

  //Başlığın içeriğ doğrumu
  expect(title).toHaveTextContent("Turkey");

  //Kartlar ekrana geliyormu

  //Covid nesnesini bileşende oldugu gibi diziye cevirdik
  const covidData = Object.entries(storeData.data.covid);

  //Dizideki her bir eleman için key ve value değerleri ekrana basılıyormu
  covidData.forEach((item) => {
    //Başlıklar doğru geldi mi
    screen.getAllByText(item[0].split("_").join(" "), { exact: false });

    //Değerler dogru geldi mi
    screen.getAllByText(item[1]);
  });
});
