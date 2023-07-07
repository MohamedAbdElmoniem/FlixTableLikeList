import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
  },
  tableValuesWrapper: {flexDirection: 'row', flexWrap: 'wrap'},
  tableValueWrapper: {
    width: 150,
    borderWidth: 1,
    padding: 10,
    backgroundColor: Colors.floralWhite,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-end',
    flex: 1,
    marginRight: 20,
    padding: 8,
    height: 40,
  },
  refresh: {
    width: 30,
    height: 30,
  },
});
