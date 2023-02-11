import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface Props
{
  visible: boolean;
  onOk: ()=> void;
}

export default function OrderConfirmedModal({visible , onOk}:Props)
{
  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <Container>
        <CheckCircle/>

        <Text size={20} weight="600" color='#fff' style={{ marginTop: 12}}>
          Pedido confirmado
        </Text>
        <Text color='#fff' opacity={0.9} style={{ marginTop: 4}}>
          O pedido Já entrou na fila de produção
        </Text>
        
        <OkButton onPress={onOk}>
          <Text color='#D73035' weight='600'>
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}