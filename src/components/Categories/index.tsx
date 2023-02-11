import {useState} from 'react';
import { FlatList } from 'react-native';
// import { categories } from '../../mocks/categories';
import { Category } from '../../types/Category';
import { Text } from '../Text';
import { CategoryContainer, Icon } from './styles';

interface Props
{
   categories:Category[];
   onSelectCategory: (categoryId: string) => Promise<void>;
}

export default function Categories({categories , onSelectCategory}:Props)
{
  const [selectedCategory , setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string)
  {
    const category = selectedCategory === categoryId ? '': categoryId;
    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList 
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{paddingRight:24}}
      keyExtractor={category => category._id}
      renderItem={({item: category}) => {
         
        const isSelected = selectedCategory === category._id;

        return (
          <CategoryContainer onPress={()=> handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected? 1 : 0.5}>
                {category.icon}
              </Text>
            </Icon>
            <Text 
              size={14}
              weight="600"
              opacity={isSelected? 1 : 0.5}
            >
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
    />
  );
}