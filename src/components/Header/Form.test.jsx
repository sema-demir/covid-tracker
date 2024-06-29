import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

test("navigates to detail page on form submission", async () => {
  const user = userEvent.setup();
  const mockFn = jest.fn();

  const { getByPlaceholderText, getByRole } = render(
    <Form handleSubmit={mockFn} />
  );

  const input = getByPlaceholderText("Ülke ismine göre ara");
  await user.type(input, "Turkey");

  const submitButton = getByRole("button");
  await user.click(submitButton);

  expect(mockFn).toHaveBeenCalled();
});
