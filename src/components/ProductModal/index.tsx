import { Modal, FlatList } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Body, CloseButton, Footer, FooterContainer, Header, Image, Ingredient, IngredientsContainer, PriceContainer } from './styles';

interface Props
{
  visible: boolean;
  onClose: ()=> void;
  product: Product | null;
  onAddToCart: (product: Product) => void;

}

export default function ProductModal({ visible , onClose, product , onAddToCart}:Props)
{
  if(!product) return null;
  
  function handleAddTocart()
  {
    onAddToCart(product!);
    onClose();
  }


  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image 
        source={{
          uri: `http://192.168.15.51:3001/uploads/${product.imagePath}`,
        }}
      />
      <CloseButton onPress={onClose} >
        <Close/>
      </CloseButton>
      <Body>
        <Header>
          <Text size={24} weight="600">{product.name}</Text>
          <Text color='#666' style={{marginTop: 8}}>
            {product.description}
          </Text>
        </Header>
        {
          product.ingredients.length > 0 ?
            (
              <IngredientsContainer>
                <Text weight='600' color='#666'>
               Ingredientes
                </Text>
  
                <FlatList
                  data={product.ingredients}
                  keyExtractor={ingredient => ingredient._id}
                  showsVerticalScrollIndicator={false}
                  style={{ marginTop: 16}}
                  renderItem={({item:ingredient})=>(
                    <Ingredient>
                      <Text>{ingredient.icon}</Text>
                      <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                        {ingredient.name
                        }</Text>
                    </Ingredient>
                  )}
                />
              </IngredientsContainer>
            ) : (
              <Text weight='600' color='#666' style={{marginTop: 16}}>
                  Sem ingredientes cadastrados para este Produto
              </Text>
            )
        }
      </Body>

      <FooterContainer>
        <Footer>
          <PriceContainer>
            <Text color='#666'>Preço </Text>
            <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button onPress={handleAddTocart}>
            Adicionar ao pedido
          </Button>
     
        </Footer>
      </FooterContainer>
     
    </Modal>
  );
}