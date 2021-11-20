import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import {themeAtom} from '../../jotais'
import WidgetOptions from './WidgetOptions'
import {initWidgetAtom} from '../../jotais'

const WidgetBuilder = () => {
  const [_, setWidget] = useAtom(initWidgetAtom)

  useEffect(() => {
    setWidget();
  }, [])

  return (
    <div>
      <WidgetOptions/>
    </div>
  )
}

export default WidgetBuilder;