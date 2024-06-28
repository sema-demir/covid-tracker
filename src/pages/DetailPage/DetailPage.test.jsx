import { render, screen } from "@testing-library/react";
import DetailPage from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import { thunk } from "redux-thunk";

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

it("hata gelme durumunda hata bileşeni ekrana basılır", () => {});

it("veri gelme durumunda dogru kartlar ekrana basılır", () => {});
