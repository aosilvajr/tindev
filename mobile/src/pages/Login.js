import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";

// import { Container } from './styles';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [user, setUsers] = useState('');

  // useEffect(() => {
  //   AsyncStorage.getItem('user').then(user => {
  //     if (user) {
  //       navigation.navigate('Main', { user })
  //     }
  //   })
  // }, []);

  async function handleLogin() {
    // const response = await api.post('/devs', { username: user });

    // const { _id } = response.data;

    // await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main')
  }

  return (
    <View style={styles.container}>
      <Image source={logo} />
      <TextInput
        placeholder="Digite seu usuário no Github"
        style={styles.input}
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={user}
        onChangeText={setUsers}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style="styles.buttonText">Enviar</Text>
        <Text>{user}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});
