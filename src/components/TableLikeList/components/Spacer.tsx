import {StyleSheet, View} from 'react-native';
import React from 'react';

const Spacer = (): JSX.Element => {
  return <View style={styles.wrapper} />;
};

const styles = StyleSheet.create({wrapper: {height: 20}});

export default Spacer;
