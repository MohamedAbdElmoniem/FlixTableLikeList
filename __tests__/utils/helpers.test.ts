import {SortDirection} from '../../src/utils/enums/SortDirection';
import {
  changeSortDirection,
  findValueInObject,
  sortArray,
} from '../../src/utils/helpers';

import * as _ from 'lodash';

describe('Utils Helpers functions', () => {
  describe('sortArray', () => {
    it('should sort the array in ascending order based on the specified column', () => {
      const arr = [
        {age: 1, name: 'Matthew'},
        {age: 2, name: 'Alexander'},
        {age: 3, name: 'Samuel'},
      ];
      const columnTitle = 'name';
      const direction = 'asc';

      const sortedArray = sortArray(arr, columnTitle, direction);

      expect(sortedArray).toEqual(_.orderBy(arr, columnTitle, direction));
    });

    it('should sort the array in descending order based on the specified column', () => {
      const arr = [
        {age: 1, name: 'Alexander'},
        {age: 2, name: 'Matthew'},
        {age: 3, name: 'Samuel'},
      ];
      const columnTitle = 'age';
      const direction = 'desc';

      const sortedArray = sortArray(arr, columnTitle, direction);

      expect(sortedArray).toEqual(_.orderBy(arr, columnTitle, direction));
    });

    it('should return an empty array if the input array is empty', () => {
      const arr = [];
      const columnTitle = 'name';
      const direction = 'asc';

      const sortedArray = sortArray(arr, columnTitle, direction);

      expect(sortedArray).toEqual([]);
    });
  });

  describe('changeSortDirection', () => {
    it('should return "desc" when the input direction is "asc"', () => {
      const direction = SortDirection.asc;
      const changedDirection = changeSortDirection(direction);

      expect(changedDirection).toBe(SortDirection.desc);
    });

    it('should return "asc" when the input direction is "desc"', () => {
      const direction = SortDirection.desc;
      const changedDirection = changeSortDirection(direction);

      expect(changedDirection).toBe(SortDirection.asc);
    });

    it('should return "asc" when the input direction is invalid', () => {
      const direction = 'invalidDirection';
      const changedDirection = changeSortDirection(direction);

      expect(changedDirection).toBe(SortDirection.asc);
    });
  });

  describe('findValueInObject', () => {
    it('should return true if the search value exists in the object', () => {
      const obj = {
        name: 'Matthew Doe',
        age: 25,
        address: '123 Main Street',
      };
      const searchValue = 'matthew';

      expect(findValueInObject(obj, searchValue)).toBe(true);
    });

    it('should return false if the search value does not exist in the object', () => {
      const obj = {
        name: 'Matthew Doe',
        age: 25,
        address: '123 Main Street',
      };
      const searchValue = 'Amer';

      expect(findValueInObject(obj, searchValue)).toBe(false);
    });

    it('should return false if the object is empty', () => {
      const obj = {};
      const searchValue = 'test';

      expect(findValueInObject(obj, searchValue)).toBe(false);
    });
  });
});
