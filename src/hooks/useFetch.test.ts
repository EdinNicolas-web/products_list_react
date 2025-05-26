import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: "Product 1",
          price: 100,
          category: { name: "cat" },
          images: ["img.jpg"],
        },
      ]),
  })
) as jest.Mock;

describe("useFetch", () => {
  it("fetches ans sets products data", async () => {
    const { result } = renderHook(() => useFetch());
    await waitFor(() => {
      expect(result.current.listProducts.length).toBeGreaterThan(0);
      expect(result.current.loadingProducts).toBe(false);
    });
  });

  it("filters products by query", async () => {
    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      act(() => {
        result.current.handleChangeQuery("product");
      });

      expect(result.current.filteredProducts.length).toBeGreaterThan(0);
    });
  });

  it("handles fetch error", async () => {
    (globalThis.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      expect(result.current.error).toBe("Error al cargar productos");
    });
  });
});
