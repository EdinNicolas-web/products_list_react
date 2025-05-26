type ProductProps = {
  name: string;
  price: number;
  category: string;
  imageUrl: string;
};

export const ItemProduct = ({
  price,
  name,
  category,
  imageUrl,
}: ProductProps) => {
  return (
    <div className="w-full h-96 rounded-sm bg-blue-100 p-2">
      <img className="w-full h-60 rounded-xl mb-2" src={imageUrl} alt={name} />
      <p>${price}</p>
      <p>{name}</p>
      <p>{category}</p>
    </div>
  );
};
