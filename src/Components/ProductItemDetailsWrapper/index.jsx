import { useParams } from "react-router-dom";
import ProductItemDetails from "../ProductItemDetails";

const ProductItemDetailsWrapper = () => {
  const { productId } = useParams();

  return <ProductItemDetails productId={productId} />;
};

export default ProductItemDetailsWrapper;
