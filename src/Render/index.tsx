import { get } from 'lodash';
import React, { useMemo } from 'react';
import { DataManager, ReactView, Schema } from 'render';
import modulesMap from './modules-map';
import demoSchema from './schema';
import VariableManager from './variable-manager';

function execute(method: { mode: 'expression'; expression: string }) {
  if (method.mode === 'expression') {
    const pattern = /\{\{([^}]+)\}\}/g; // 匹配双花括号内的内容
    const connectedVariables: string[] = [];
    const value = method.expression.replace(pattern, (match, key) => {
      connectedVariables.push(key.split('.')[0]);
      // 使用 key 在 data 中查找对应的值
      return get(VariableManager.data, key);
    });

    return { value, connectedVariables };
  }
}

/**

  1. 绑定关系
  2. 设置值
  3. 都得在初始化时执行

 */

export default function Render(props: {
  schema: Schema;
  initialVariablesData: Record<string, any>;
}) {
  const { schema = demoSchema, initialVariablesData = {} } = props;

  /** 注册变量和实际组件之间的链接 */
  useMemo(() => {
    VariableManager.reset();
    schema.elements.forEach((el) => {
      Object.entries(el.props).forEach(([propName, val]) => {
        if (val.$$__type === 'subscription') {
          // 注册变量和实际组件之间的链接
          execute(val.$$__body)!.connectedVariables.forEach((variableName) => {
            VariableManager.registerSet(variableName, (variableValue) => {
              DataManager.setData(el.id, {
                ...DataManager.getData(el.id),
                [propName]: execute(val.$$__body)!.value,
              });
            });
          });
        }
      });
    });
  }, []);

  /** 设置元素初始值 */
  useMemo(() => {
    schema.elements.forEach((el) => {
      DataManager.setData(el.id, el.props);
    });
  }, []);

  /** 设置变量初始值 */
  useMemo(() => {
    schema.managedVariables.forEach((variable) => {
      const value =
        get(initialVariablesData, variable.name) || variable.defaultValue;

      if (variable.type === 'Array' || variable.type === 'Object') {
        VariableManager.setData(variable.name, JSON.parse(value));
      } else if (variable.type === 'Number') {
        VariableManager.setData(variable.name, Number(value));
      } else if (variable.type === 'String') {
        VariableManager.setData(variable.name, String(value));
      }
    });
  }, []);

  return (
    <div>
      <ReactView schema={schema} modulesMap={modulesMap} />
    </div>
  );
}
