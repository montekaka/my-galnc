import React from 'react';
import { useAtom } from 'jotai';
import { Modal, Button } from '@douyinfe/semi-ui';
import {setModalAtom} from '../../jotais'
import {WidgetBuilder} from '../widget-builder'

const ModalBody = ({handleSave, profileId}) => {

  const [modal, setModal] = useAtom(setModalAtom);
  const {type} = modal;

  if(type === 'add-widget') {
    return (
      <div>
        <WidgetBuilder setModal={setModal} handleSave={handleSave}/>
      </div>
    )
  }

  return null;
}

export default ModalBody;