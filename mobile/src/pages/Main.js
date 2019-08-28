import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';

// import { Container } from './styles';

export default function Main({ navigation }) {
  const id = navigation.getParam('user');
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(true);

  console.log(users)
  console.log(id)

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: id,
        }
      })

      setUsers(response.data);

      console.log(response)
    }

    loadUsers()
  }, [id])

  // Se conecta com o WebSocket
  // useEffect(() => {
  //   const socket = io('http://localhost:3333', {
  //     query: { user: id }
  //   });

  //   socket.on('match', dev => {
  //     setMatchDev(dev); // Informções reais do DEV
  //   })
  // }, [id])

  async function handleLike() {
    // Pegando o primeiro usuário e todo o restante e armazenado na variavel rest
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id }
    })

    // Passa o restante já retirando o primeiro index do array
    setUsers(rest)
  }

  async function handleDislike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id }
    })

    setUsers(rest)
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        {users.length === 0 ? <Text style={styles.empty}>Acabou :(</Text>
          : users.map((user, index) => (
            <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
              <Image style={styles.avatar} source={{ uri: user.avatar }} />
              <View style={styles.footer}>
                <Text styles={styles.name}>{user.name}</Text>
                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
              </View>
            </View>
          ))}
      </View>

      {users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Image source={dislike} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Image source={like} />
          </TouchableOpacity>
        </View>
      )}

      {matchDev && (
        <View styles={styles.matchContainer}>
          <Image source={itsamatch} />
          <Image source={{ uri: 'https://lh3.googleusercontent.com/-AC4z-7x_dUo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdla73xj-S4rAK5q3zRxVDctMnBxQ/photo.jpg?sz=46' }} />

          <Text styles={styles.matchName}>EU</Text>
          <Text styles={styles.matchBio}>blx</Text>

          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text style={styles.closeMatch}>Fecha</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    marginTop: 30
  },

  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold'
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500
  },

  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  avatar: {
    flex: 1,
    height: 300
  },

  footer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },

  bio: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
    lineHeight: 20
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    elevation: 2
  },

  matchContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0 , 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  matchAvatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#FFF',
    marginVertical: 30
  },

  matchName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF'
  }
})