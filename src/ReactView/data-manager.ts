import { cloneDeep, merge } from 'lodash';

export default class DataManager {
  static data: Record<string, any> = {};
  static sets: Record<string, React.Dispatch<any>> = {};

  static registerSet(key: string, fn: React.Dispatch<any>) {
    DataManager.sets[key] = fn;
  }

  static setData(key: string, value: Record<string, any>) {
    console.log(`key, value JD==> `, key, value);
    DataManager.data[key] = value;
    DataManager.sets[key]?.(value);
  }

  static mergeData(key: string, value: Record<string, any>) {
    // TODO: cloneDeep 会有性能问题，有空可以修复一下
    const nextValue = merge(cloneDeep(DataManager.data[key]), value);
    DataManager.data[key] = nextValue;
    DataManager.sets[key]?.(nextValue);
  }

  static getData(key: string) {
    return DataManager.data[key];
  }
}
