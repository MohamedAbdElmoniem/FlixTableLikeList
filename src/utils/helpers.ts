import {Many, orderBy} from 'lodash';
import {SortDirection} from './enums/SortDirection';

const sortArray = (
  arr: any[],
  columnTitle: string,
  direction: Many<boolean | 'asc' | 'desc'> | undefined,
) => {
  return orderBy(arr, columnTitle, direction);
};

const changeSortDirection = (direction: string) => {
  return direction === SortDirection.asc
    ? SortDirection.desc
    : SortDirection.asc;
};

const findValueInObject = (obj: any, searchValue: string) => {
  let isValueExist = false;

  Object.keys(obj).forEach(key => {
    if (
      String(obj[key])
        .toLowerCase()
        .replaceAll(' ', '')
        .includes(String(searchValue).toLowerCase().replaceAll(' ', ''))
    ) {
      isValueExist = true;
    }
  });
  return isValueExist;
};
export {sortArray, changeSortDirection, findValueInObject};
