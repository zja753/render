import React, { FC, useMemo } from 'react';
import ControlHOC from './control-hoc';
import DataManager from './data-manager';
import { Element, ModulesMap, Schema } from './interface';

export default function ReactView(props: {
  schema: Schema;
  modulesMap: ModulesMap;
}) {
  const { modulesMap, schema } = props;

  const elementsMap = useMemo(() => {
    return schema.elements.reduce((pre, el) => {
      pre[el.id] = el;
      return pre;
    }, {} as Record<string, Element>);
  }, [schema]);

  const RenderComponent: FC<{ element?: Element }> = ({ element }) => {
    if (!element) return null;

    const { id, type } = element;

    const Com = modulesMap[type];

    const slots = Object.entries(schema.layout.structures[id] || {}).reduce(
      (pre, [slotName, elementIds]) => {
        pre[slotName] = elementIds.map((id) => (
          <RenderComponent key={id} element={elementsMap[id]} />
        ));
        return pre;
      },
      {} as Record<string, JSX.Element[]>,
    );

    return ControlHOC(Com, slots, id);
  };

  const rootElement = schema.elements.find(
    ({ id }) => id === schema.layout.root,
  );

  return (
    <div>
      <RenderComponent key={schema.layout.root} element={rootElement} />
    </div>
  );
}

export { DataManager };

export type { Element, ModulesMap, Schema } from './interface';
