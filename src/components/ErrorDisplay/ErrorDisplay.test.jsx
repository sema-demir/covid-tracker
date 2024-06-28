import { render, screen } from "@testing-library/react";
import ErrorDisplay from ".";
import userEvent from "@testing-library/user-event";

//!!Bir bilşenele alakalı 2 tane testimiz var describe yardımıyla bu testleri açıklayabiliyoruz gruplandırmak için

describe("error display bileşenine ait testler ", () => {
  test("Doğru mesajı gösterir", () => {
    const errorMessage = "404 Content was not found";
    render(<ErrorDisplay message={errorMessage} retry={() => {}} />);

    // Doğru hata mesajına sahip yazı var mı?
    //!!eleman varsa alır yoksa hata verir getBytext screen ile testi gecti
    screen.getByText(errorMessage);
  });
  test("Tekrar dene butonuna tıklanınca fonksiyon çalışır", async () => {
    // User ı kur
    const user = userEvent.setup();

    //Burada  test  mock  fonksiyonu oluştur
    const retryMock = jest.fn();

    // Bileşeni renderla
    render(<ErrorDisplay message={"xx"} retry={retryMock} />);

    // Butonu çağır
    const button = screen.getByRole("button");

    // Butona tıkla
    await user.click(button);

    // Fonksiyon çağrıldımı kontrol et
    expect(retryMock).toHaveBeenCalled();
  });
});
