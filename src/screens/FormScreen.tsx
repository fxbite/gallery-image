import { NativeBaseProvider } from 'native-base';
import FormInput from '../components/FormInput';

const FormScreen = () => {
  return (
    <NativeBaseProvider>
      <FormInput />
    </NativeBaseProvider>
  );
};

export default FormScreen;
