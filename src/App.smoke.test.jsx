import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App smoke test", () => {
  it("shows the main landing message on first load", () => {
    render(<App />);

    expect(screen.getByText(/Turning supermarket surplus into same-day meals\./i)).toBeVisible();
  });
});
