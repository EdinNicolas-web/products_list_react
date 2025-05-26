import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsFilter from "./ProductsFilter";

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: "TV",
          price: 100,
          category: { name: "Electronics" },
          images: ["img.jpg"],
        },
      ]),
  })
) as jest.Mock;

describe("ProductsFilter", () => {
  it("renders product list after fetch", async () => {
    render(<ProductsFilter />);
    expect(screen.getByText(/cargando productos/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("TV")).toBeInTheDocument();
    });
  });

  it("filters product by text", async () => {
    render(<ProductsFilter />);

    await waitFor(() => {
      expect(screen.getByText("TV")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Buscar productos..."), {
      target: { value: "xyz" },
    });

    expect(
      screen.getByText("No se encontraron productos")
    ).toBeInTheDocument();
  });

  it("loads next page on button click", async () => {
    render(<ProductsFilter />);

    await waitFor(() => {
      expect(screen.getByText("TV")).toBeInTheDocument();
    });

    const button = screen.getByText("Cargar más");
    fireEvent.click(button);

    expect(button).toBeDisabled(); // loading state
  });
});
