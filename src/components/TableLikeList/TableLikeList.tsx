import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './TableLikeList.styles';
import TableHeader from './components/TableHeader';
import {SortDirection} from '../../utils/enums/SortDirection';
import {
  changeSortDirection,
  findValueInObject,
  sortArray,
} from '../../utils/helpers';
import {Icons} from '../../theme';
import Spacer from './components/Spacer';
import {debounce, set} from 'lodash';
import EmptyTable from './components/EmptyTable';

type TableLikeListProps = {
  datasource: any[];
  onRefreshTable?: () => void;
};

const TableLikeList = ({
  datasource,
  onRefreshTable,
}: TableLikeListProps): JSX.Element => {
  const [searchedDataSource, setSearchedDataSource] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.none,
  );
  const [sortColumn, setSortColumn] = useState<string>('');
  const tableHasValues = searchedDataSource.length;
  const searchInputRef = React.useRef<TextInput>(null);

  useEffect(() => {
    if (datasource?.length) {
      setSortColumn(Object.keys(datasource[0])[0]);
      setSearchedDataSource(datasource);
    }
  }, [datasource]);

  const renderTableHeader = () => {
    const tableHeaderTitles = Object.keys(datasource[0]);
    return (
      (tableHeaderTitles && (
        <TableHeader
          cells={tableHeaderTitles.map(cell => ({
            sort: sortColumn === cell ? sortDirection : SortDirection.none,
            title: cell,
            onPress: () => onSortColumn(cell),
          }))}
        />
      )) ||
      null
    );
  };

  const onSortColumn = (cellTitle: any) => {
    const newSortDirection = changeSortDirection(sortDirection);

    const sortedDataSource = sortArray(
      searchedDataSource,
      cellTitle,
      newSortDirection,
    );

    setSortDirection(newSortDirection);
    setSortColumn(cellTitle);
    setSearchedDataSource(sortedDataSource);
  };

  const renderTableContent = () => (
    <>
      {searchedDataSource.map(item => (
        <View style={styles.tableValuesWrapper}>
          {Object.keys(item).map((key: any) => (
            <View style={styles.tableValueWrapper}>
              <Text>{item[key]}</Text>
            </View>
          ))}
        </View>
      ))}
    </>
  );

  const renderTopSection = () => (
    <View style={styles.topSection}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#000"
        onChangeText={onTableSearch}
        ref={searchInputRef}
      />
      <Pressable onPress={onRefresh}>
        <Image source={Icons.refresh} style={styles.refresh} />
      </Pressable>
    </View>
  );

  const onRefresh = async () => {
    searchInputRef.current?.clear();
    setSortDirection(SortDirection.none);
    await onRefreshTable?.();
  };

  const onTableSearch = debounce((text: string) => {
    if (!text) {
      setSortDirection(SortDirection.none);
      setSearchedDataSource(datasource);
      return;
    }

    const filteredData = datasource.filter(dataRow =>
      findValueInObject(dataRow, text),
    );

    setSearchedDataSource(filteredData);
  }, 500);

  return (
    <View style={styles.wrapper}>
      {renderTopSection()}
      <Spacer />
      <ScrollView horizontal bounces={false}>
        <View>
          {(tableHasValues && renderTableHeader()) || null}
          {(tableHasValues && renderTableContent()) || <EmptyTable />}
        </View>
      </ScrollView>
    </View>
  );
};

export default TableLikeList;
