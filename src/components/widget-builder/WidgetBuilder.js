import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import { Button } from '@douyinfe/semi-ui';
import WidgetOptions from './WidgetOptions'
import WidgetDemo from './WidgetDemo'
import {initWidgetAtom, initWidgetIdxAtom, setWidgetInputValueAtom} from '../../jotais'

const WidgetBuilder = ({handleSave, setModal}) => {
  const [widget, setWidget] = useAtom(initWidgetAtom);
  const [__, setWidgetIdx] = useAtom(initWidgetIdxAtom);
  const [_, setWidgetInputValue] = useAtom(setWidgetInputValueAtom);
  const {user_name, url} = widget;

  useEffect(() => {
    setWidget();
    setWidgetIdx(0);
    setWidgetInputValue('');
  }, [])

  const handleCancel = () => {
    setModal({visible: false, type: null, fullScreen: false, title: null});
  }  

  const handleSaveClick = () => {
    handleSave();
  }

  return (
    <div>
      <WidgetOptions>
        <div style={{marginTop: "40px", marginBottom: "40px"}}>
          <WidgetDemo/>
          <div style={{display: 'flex', gap: "10px", marginTop: "40px", justifyContent: 'flex-end'}}>
            <Button theme="tertiary" type="tertiary" onClick={handleCancel}>Cancel</Button>
            <Button theme="primary" type="primary" onClick={handleSaveClick}>Save</Button>
          </div>
        </div>
        <div>
          
        </div>
      </WidgetOptions>
    </div>
  )
}

export default WidgetBuilder;