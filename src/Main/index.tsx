import Button from '../components/Button';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Menu from '../components/Menu';
import TableModal from '../components/TableModal';
import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';
import { useState , useEffect} from 'react';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import { api } from '../utils/api';


export function Main()
{
  const [isTableModalVisible , setIsTableModalVisible] = useState(false);
  const [selectedTable , setSelectedTable] = useState('');

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const [products , setProducts] = useState<Product[]>([]);
  const [categories , setCategories] = useState<Category[]>([]);


  useEffect(()=>{

    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse,productResponse])=>{
      
      setCategories(categoriesResponse.data);
      setProducts(productResponse.data);
      setIsLoading(false);
    });


  },[]);

  async function handleSelectCategory(categoryId: string)
  {
    const route = !categoryId?'products': `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);
    const {data} = await  api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);

  }

  function handleSaveTable(table:string)
  {
    setSelectedTable(table);
  } 

  function handleResetOrder()
  {
    setSelectedTable('');
    setCartItems([]);
  }


  function handleAddToCart(product: Product)
  {
    if(!selectedTable){
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIdex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if(itemIdex < 0)
      {
        return prevState.concat({
          quantity:1,
          product,
        });
      }
      
      const newCartItems = [...prevState];
      const item = newCartItems[itemIdex];

      newCartItems[itemIdex] = {...item, quantity: item.quantity + 1 };
      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product)
  {
    setCartItems((prevState) => {

      const itemIdex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
      const item = prevState[itemIdex];
      const newCartItems = [...prevState];
      
      if(item.quantity === 1)
      {
        newCartItems.splice(itemIdex, 1);

        return newCartItems;
      }

      newCartItems[itemIdex] = {...item, quantity: item.quantity - 1 };

      return newCartItems;

    });
  }

  return(
    <>
      <Container>
        {
          isLoading && (
            <CenteredContainer>
              <ActivityIndicator color="#D73035" size="large" />
            </CenteredContainer>
          )
        }
   
        <Header 
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />
        {
          !isLoading && (
            <>
              <CategoriesContainer>
                <Categories 
                  categories={categories}
                  onSelectCategory={handleSelectCategory}
                />
              </CategoriesContainer>

              {
                isLoadingProducts ? (
                  <CenteredContainer>
                    <ActivityIndicator color="#D73035" size="large" />
                  </CenteredContainer>
                ):(
                     
                  products.length > 0 ? (
                    <MenuContainer>
                      <Menu 
                        onAddToCart={handleAddToCart}
                        products={products}
                      />
                    </MenuContainer>
                  ):(
                    <CenteredContainer>
                      <Empty/>
                      <Text
                        color='#666'
                        style={{marginTop: 24}}
                      >
                     Nenhum produto foi encontrado
                      </Text>
                    </CenteredContainer>
                  )
                )
              }
           
            </>
          )
        }

      </Container>
      <FooterContainer>
        <Footer>
          {
            !selectedTable && (
              <Button 
                onPress={()=> setIsTableModalVisible(true)}
                disabled={isLoading}
              >
               Novo Pedido
              </Button>
            )
            
          }
          {
            selectedTable && (
              <Cart 
                cartItems={cartItems}
                onAdd={handleAddToCart}
                onDecrement={handleDecrementCartItem}
                onConfirmOrder={handleResetOrder}
                selectedTable={selectedTable}
              />
            )
          }
        </Footer>
      </FooterContainer>

      <TableModal 
        visible={isTableModalVisible}
        onClose={()=>setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}