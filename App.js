import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/modules/context/authState';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import LoginScreen from './src/modules/modulo 1/LoginScreen';
import TemplateScreen from './src/Template/TemplateScreen';
import Screen1 from './src/modules/modulo 1/Screen1';
import AddReporte from './src/modules/modulo 1/AddReporte';
import ListReportes from './src/modules/modulo 1/ListReportes';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import ScreenResumen from './src/modules/modulo 1/ScreenResumen';
import ScreenDetalle from './src/modules/modulo 1/ScreenDetalle';
import { SSRProvider } from '@react-aria/ssr';
const Stack = createNativeStackNavigator();
function MyStack() {
  return (

    <Stack.Navigator screenOptions={{
      headerShown: false,
    }
    }>
      <Stack.Screen name="Login"
        component={LoginScreen}
      />
      <Stack.Screen name="Home"
        component={Screen1} />
      <Stack.Screen name="Add"
        component={AddReporte} />
      <Stack.Screen name="Resumen"
        component={ScreenResumen}
      />
      <Stack.Screen name="List"
        component={ListReportes} />
      <Stack.Screen name="Detalle"
        component={ScreenDetalle} />



    </Stack.Navigator>
    //Psuehando
  )
}


export default function App() {

  return (
    <AuthProvider>
      <SSRProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
              <MyStack />
            </ApplicationProvider>
          </NavigationContainer>
        </NativeBaseProvider>
      </SSRProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
