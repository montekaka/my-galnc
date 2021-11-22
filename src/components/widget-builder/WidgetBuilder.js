import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import {themeAtom} from '../../jotais'
import WidgetOptions from './WidgetOptions'
import WidgetDemo from './WidgetDemo'
import {initWidgetAtom, initWidgetIdxAtom, setWidgetInputValueAtom} from '../../jotais'

const WidgetBuilder = () => {
  const [widget, setWidget] = useAtom(initWidgetAtom);
  const [__, setWidgetIdx] = useAtom(initWidgetIdxAtom);
  const [_, setWidgetInputValue] = useAtom(setWidgetInputValueAtom);
  const {user_name, url} = widget;

  useEffect(() => {
    setWidget();
    setWidgetIdx(0);
    setWidgetInputValue('');
  }, [])

  return (
    <div>
      <WidgetOptions>
        <div style={{marginTop: "40px", marginBottom: "40px"}}>
          <WidgetDemo/>
        </div>
        <div>
          
        </div>
      </WidgetOptions>
    </div>
  )
}

export default WidgetBuilder;