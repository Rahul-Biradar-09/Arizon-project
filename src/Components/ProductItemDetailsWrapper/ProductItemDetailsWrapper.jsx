import { useParams } from 'react-router-dom'
import ProductItemDetails from './ProductItemDetails'

const ProductItemDetailsWrapper = () => {
  const { id } = useParams()
  return <ProductItemDetails productId={id} />
}

export default ProductItemDetailsWrapper