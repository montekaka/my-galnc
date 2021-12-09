import React from 'react';
import { useAtom } from 'jotai';
import { Modal, Button } from '@douyinfe/semi-ui';
import {setModalAtom, newWidgetProfileIdAtom, widgetAtom, updateNotificationAtom} from '../../jotais'
import {WidgetBuilder} from '../widget-builder'
import {useCreateWidget} from '../../hooks'
import ModalBody from './ModalBody'
import { useEffect } from 'react/cjs/react.development';

const CustomModal = () => {

  const [profileId] = useAtom(newWidgetProfileIdAtom);
  const [widget] = useAtom(widgetAtom)
  const [modal, setModal] = useAtom(setModalAtom);
  const {title, visible, type, fullScreen} = modal;
  const [_, updateNotification] = useAtom(updateNotificationAtom);

  const [addNewWidget] = useCreateWidget()

  const handleCancel = () => {
    setModal({visible: false, type: null, fullScreen: false, title: null});
  }

  const handleOk = () => {
    if(type === 'add-widget' && profileId) {
      addNewWidget(profileId, widget)
    }    
  }

  return (
    <Modal
      style={{color: 'var(--semi-color-text-0)'}}
      title={title}
      visible={visible}
      maskClosable={false}
      fullScreen={fullScreen}
      cancelText={'Cancel'}
      onCancel={handleCancel}
      okText={"Save"}
      onOk={handleOk}
    >
      <ModalBody handleSave={handleOk}/>
    </Modal>
  )
}

export default CustomModal;