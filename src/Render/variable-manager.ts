import { cloneDeep, merge } from 'lodash';

export default class VariableManager {
  static data: Record<string, any> = {};
  static sets: Record<string, ((val: any) => void)[]> = {};

  static reset() {
    VariableManager.data = {};
    VariableManager.sets = {};
  }

  // 一个变量可能会绑定多个组件
  static registerSet(key: string, fn: (val: any) => void) {
    VariableManager.sets[key] = VariableManager.sets[key] || [];
    VariableManager.sets[key].push(fn);
  }

  static setData(key: string, value: any) {
    VariableManager.data[key] = value;
    VariableManager.sets[key]?.forEach((setFn) => setFn(value));
  }

  static mergeData(key: string, value: Record<string, any>) {
    // TODO: cloneDeep 会有性能问题，有空可以修复一下
    const nextValue = merge(cloneDeep(VariableManager.data[key]), value);
    VariableManager.setData(key, nextValue);
  }

  static getData(key: string) {
    return VariableManager.data[key];
  }
}

// @ts-ignore
window.VariableManager = VariableManager;
