import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// createStackNavigator => Possue cabeçalho e poder voltar para tela anterior
// createBottomTabNavigator => Cria uma navegação por tabs
// createMaterialTopTabNavigator => Cria uma navegação por abas no estilo do material
// createDrawerNavigator => Cria um menu lateral

import Login from './pages/Login';
import Main from './pages/Main';

// createAppContainer wrapper obrigatório, pois em um app pode-se ter mais de um tipo de navegação
export default createAppContainer(
  // Cria uma navegação entre duas telas sem nenhum tipo de feedback visual, não cria uma pilha de telas simplesmente a tela anterior deixa de existir
  // Exemplo => Não vai ter animação, cabeçalho, abas, o usuário não vai poder navegar atraves de gestos e etc...
  createSwitchNavigator({
    Login,
    Main
  })
);