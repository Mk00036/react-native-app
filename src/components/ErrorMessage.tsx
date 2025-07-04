import React from 'react';
import { View, Text } from 'react-native';

const ErrorMessage = ({ message }) => (
  <View style={{ padding: 20 }}>
    <Text style={{ color: 'red' }}>{message}</Text>
  </View>
);

export default ErrorMessage;
