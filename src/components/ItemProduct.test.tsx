import { render, screen } from "@testing-library/react";
import { ItemProduct } from "./ItemProduct";

describe("Render ItemProduct", () => {
  it("Renders correctly", () => {
    render(
      <ItemProduct
        name="Test Product"
        price={200}
        category="Electronics"
        imageUrl="test.jpg"
      />
    );

    expect(screen.getByText("$200")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });
});
