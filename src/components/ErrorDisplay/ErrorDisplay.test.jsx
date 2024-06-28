import { render, screen } from "@testing-library/react";
import ErrorDisplay from ".";
import userEvent from "@testing-library/user-event";

test("Doğru mesajı gösterir", () => {
  const errorMessage = "404 Content was not found";
  render(<ErrorDisplay message={errorMessage} retry={() => {}} />);

  // Doğru hata mesajına sahip yazı var mı?
  //!!eleman varsa alır yoksa hata verir getBytext screen ile testi gecti
  screen.getByText(errorMessage);
});
test("Tekrar dene butonuna tıklanınca fonksiyon çalışır", async () => {
  // userı kur
  const user = userEvent.setup();

  // bir test / mock  fonksiyonu oluştur
  const retryMock = jest.fn();

  // bileşeni renderla
  render(<ErrorDisplay message={"xx"} retry={retryMock} />);

  // butonu çağır
  const button = screen.getByRole("button");

  // butona tıkla
  await user.click(button);

  // fonksiyon çağrıldımı kontrol et
  expect(retryMock).toHaveBeenCalled();
});
