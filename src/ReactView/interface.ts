import { FC } from 'react';

export type Element = {
  id: string;
  type: string;
  props: Record<string, any>;
};

export interface Schema {
  elements: Element[];
  layout: {
    root: string;
    structures: Record<string, Record<string, string[]>>;
  };
  managedVariables: Variable[];
}

type Variable = {
  name: string;
  type: 'String' | 'Number' | 'Object' | 'Array';
  defaultValue: string;
  children?: Omit<Variable, 'defaultValue'>[];
  item?: Omit<Variable, 'name' | 'defaultValue'>;
};

export type ModulesMap = Record<string, FC<any>>;
