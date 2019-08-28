import React from 'react';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'unrecognized WebSocket'
])

import Routes from './routes';

// import { Container } from './styles';

export default function App() {
  return (
    <Routes />
  );
}
