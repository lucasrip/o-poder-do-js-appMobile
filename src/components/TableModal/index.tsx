import { Modal, Platform, TouchableOpacity } from 'react-native';
import Button from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Body, Form, Header, Input, Overlay } from './styles';
import {useState} from 'react';

interface Props
{
  visible: boolean;
  onClose: () => void;
  onSave: (table:string) => void;
}

export default function TableModal({ visible , onClose, onSave}:Props)
{
  const [table,setTable] = useState('');
  
  function handleSave()
  {
    onSave(table);
    onClose();
    setTable('');
  }


  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={Platform.OS === 'android'?'height':'padding'}>
        <Body>
          <Header>
            <Text weight='600'>
              Informe a mesa
            </Text>

            <TouchableOpacity onPress={()=> onClose()}>
              <Close color='#666'/>
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da Mesa'
              placeholderTextColor="#666"
              keyboardType='number-pad'
              onChangeText={setTable}
            />

            <Button onPress={handleSave} disabled={table.length === 0}>
              Salvar
            </Button>
          </Form>
        </Body>
      </Overlay>
    </Modal>
  );
}