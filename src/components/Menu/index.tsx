import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { AddCartButton, ProductDetails, ProductImage, Separator, ProductContainer } from './styles';
import { useState } from 'react';
import { Product } from '../../types/Product';
import ProductModal from './../ProductModal/index';

interface Props
{
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export default function Menu({onAddToCart , products}:Props)
{
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct , setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product:Product)
  {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={()=> setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{marginTop: 32}}
        contentContainerStyle={{paddingHorizontal: 24}}
        ItemSeparatorComponent={Separator}
        keyExtractor={ product => product._id }
        renderItem={({ item: product }) => (
          <ProductContainer onPress={()=> handleOpenModal(product) }>
            <ProductImage
              source={{
                uri: `http://192.168.15.51:3001/uploads/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight='600'>{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }} >{product.description}</Text>
              <Text size={14} weight="600" >{formatCurrency(product.price)}</Text>

            </ProductDetails>

            <AddCartButton onPress={()=>onAddToCart(product)}>
              <PlusCircle/>
            </AddCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}