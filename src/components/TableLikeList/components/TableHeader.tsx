import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Icons} from '../../../theme';
import {SortDirection} from '../../../utils/enums/SortDirection';

type TableHeaderCellProps = {
  title: string;
  sort: SortDirection;
  onPress: () => void;
};

type TableHeaderProps = {
  cells: TableHeaderCellProps[];
};

const TableHeaderCell = ({
  title,
  sort,
  onPress,
}: TableHeaderCellProps): JSX.Element => {
  const formattedTitle = String(title.charAt(0).toUpperCase() + title.slice(1));
  return (
    <Pressable onPress={onPress} style={styles.headerCellWrapper}>
      <Text style={styles.title}>{formattedTitle}</Text>
      <View style={styles.wrapper}>
        <Image source={Icons.arrowUp} style={styles.arrowUp(sort)} />
        <Image source={Icons.arrowDown} style={styles.arrowDown(sort)} />
      </View>
    </Pressable>
  );
};

const TableHeader = ({cells}: TableHeaderProps): JSX.Element => {
  return (
    <View style={styles.mainWrapper}>
      {cells.map(cell => (
        <TableHeaderCell {...cell} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create<any>({
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCellWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: 150,
    borderWidth: 1,
    backgroundColor: Colors.lavender,
  },
  arrowUp: (sort: SortDirection) => ({
    height: 16,
    width: 16,
    marginHorizontal: 4,
    opacity: [SortDirection.asc, SortDirection.none].includes(sort) ? 0.2 : 1,
  }),
  arrowDown: (sort: SortDirection) => ({
    height: 16,
    width: 16,
    marginHorizontal: 4,
    opacity: [SortDirection.desc, SortDirection.none].includes(sort) ? 0.2 : 1,
  }),
  title: {fontSize: 18, marginRight: 8, fontWeight: 'bold'},
});

export default TableHeader;
