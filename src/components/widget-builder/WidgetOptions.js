import React from "react";
import { useAtom } from 'jotai';
import { Tabs, TabPane, RadioGroup, Radio } from '@douyinfe/semi-ui';
import { IconFile, IconGlobe, IconHelpCircle } from '@douyinfe/semi-icons';
import {themeAtom, widgetOptionsAtom, initWidgetIdxAtom, setWidgetInputValue} from '../../jotais'
import OptionForm from './OptionForm'

const WidgetOptions = (props) => {

  const [widgetOptions] = useAtom(widgetOptionsAtom);
  const [widgetIdx, setWidgetIdx] = useAtom(initWidgetIdxAtom);

  return (
    <div>
      <Tabs
        style={{ width: '60%', margin: '20px' }}
        tabPosition="left" 
        type="line"
        // collapsible
        onTabClick={(ak) => {
          setWidgetIdx(Number(ak - 1));
        }}
      >               
        {
          widgetOptions.map((x) => {  
            const {idx, name} = x;          
            
            return (
              <TabPane
                  tab={
                      <span>
                        {name}
                      </span>
                  }
                  key={(idx+1).toString()}
                  itemKey={(idx+1).toString()}
              >
                <div style={{ padding: '0 24px' }}>
                  <h3>{name}</h3>
                  <OptionForm/>
                  {props.children}
                </div>                
              </TabPane>  
          )})
        }
      </Tabs>
    </div>
  )
}

export default WidgetOptions;