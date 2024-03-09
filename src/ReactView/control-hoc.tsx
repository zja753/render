import React, { FC, useState } from 'react';
import DataManager from './data-manager';

export default function ControlHOC(
  Com: FC<any>,
  slots: Record<string, (JSX.Element | null)[]>,
  id: string,
) {
  const [comProps, setComProps] = useState(DataManager.getData(id));

  DataManager.registerSet(id, setComProps);

  console.log(`JD==> render`, id);
  return <Com key={id} {...comProps} {...slots} />;
}
