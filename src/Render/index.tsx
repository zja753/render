import { get } from 'lodash';
import React, { useMemo } from 'react';
import { DataManager, ReactView, Schema } from 'render';
import modulesMap from './modules-map';
import demoSchema from './schema';
import VariableManager from './variable-manager';

function executeExpression(expression: string) {
  console.log(`expression JD==> `, expression);
  const pattern = /\{\{([^}]+)\}\}/g; // 匹配双花括号内的内容
  const connectedVariables: string[] = [];
  const value = expression.replace(pattern, (match, key) => {
    connectedVariables.push(key.split('.')[0]);
    // 使用 key 在 data 中查找对应的值
    return get(VariableManager.data, key);
  });
  return { value, connectedVariables };
}

export default function Render(props: {
  schema: Schema;
  initialVariablesData?: Record<string, any>;
}) {
  const { schema = demoSchema, initialVariablesData = {} } = props;

  /** 注册变量和实际组件之间的链接 */
  useMemo(() => {
    schema.elements.forEach((el) => {
      Object.entries(el.props).forEach(([propName, val]) => {
        if (
          val.$$__type === 'subscription' &&
          val.$$__body.mode === 'expression'
        ) {
          // 注册变量和实际组件之间的链接
          executeExpression(
            val.$$__body.expression,
          )!.connectedVariables.forEach((variableName) => {
            VariableManager.registerSet(variableName, (variableValue) => {
              DataManager.setData(el.id, {
                ...DataManager.getData(el.id),
                [propName]: executeExpression(val.$$__body.expression)!.value,
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

  /** 解析所有方法，传给对应组件 */
  useMemo(() => {
    schema.elements.forEach((el) => {
      // 转化所有属性配置里的 builtin 函数为真实JS函数
      Object.entries(el.props).forEach(([propName, val]) => {
        if (
          val.$$__type === 'Builtin.Function' &&
          val.$$__body.mode === 'function'
        ) {
          DataManager.setData(el.id, {
            ...DataManager.getData(el.id),
            [propName]: () =>
              new Function('VariableManager', val.$$__body.code)(
                VariableManager,
              ),
          });
        }
      });
      // 转化所有生命周期里的 builtin 函数为真实JS函数
      el.lifeCycle &&
        Object.entries(el.lifeCycle).forEach(([propName, val]) => {
          if (
            val.$$__type === 'Builtin.Function' &&
            val.$$__body.mode === 'function'
          ) {
            DataManager.setData(el.id, {
              ...DataManager.getData(el.id),
              [`lifeCycle_${propName}`]: () =>
                new Function('VariableManager', val.$$__body.code)(
                  VariableManager,
                ),
            });
          }
        });
    });
  }, []);

  return (
    <div>
      <ReactView schema={schema} modulesMap={modulesMap} />
    </div>
  );
}
