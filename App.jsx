import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

 
// Change this to your home IPV4 address - Type IPCONGIG in your terminal to find it.
// This is required for the mobile app to connect to the local GraphQL server.

const client = new ApolloClient({
  uri: 'http://192.168.178.31:4000/graphql',  
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}

