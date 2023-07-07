import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Table from './src/screens/Table';
import {Colors} from './src/theme';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Table />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default App;
