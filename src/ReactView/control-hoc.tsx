import React, { FC, useEffect, useState } from 'react';
import DataManager from './data-manager';

export default function ControlHOC(
  Com: FC<any>,
  slots: Record<string, (JSX.Element | null)[]>,
  id: string,
) {
  const [comProps, setComProps] = useState(DataManager.getData(id));

  useEffect(() => {
    DataManager.getData(id)['lifeCycle_onMounted']?.();
    return () => {
      DataManager.getData(id)['lifeCycle_onUnmount']?.();
    };
  }, []);

  DataManager.registerSet(id, setComProps);

  console.log(`JD==> render`, id);
  return <Com key={id} {...comProps} {...slots} />;
}
