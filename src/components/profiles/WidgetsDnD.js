import React from "react";
import { Form, Button, Col, Row, List} from '@douyinfe/semi-ui';
import { IconHandle, IconDelete } from '@douyinfe/semi-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const WidgetsDnD = (props) => {
  const {items, addNewItem, removeItem, updateItem} = props;

  const hanleAddNewItem = () => {
    
  }

  const handleDeleteItem = (idx) => {
    console.log(idx);
    const _items = [...items];
    _items.splice(idx, 1);
    updateItem(_items)
  }

  const handleOnDragEnd = (result) => {
    if(!result.destination) return; // handle dragging out of the dnd area
    const _items = [...items];
    const [reorderedItem] = _items.splice(result.source.index, 1);
    _items.splice(result.destination.index, 0, reorderedItem);
    updateItem(_items)
  }

  return (
    <div style={{paddingTop: 40}}>
      <Row type="flex" justify="center" style={{marginBottom: '20px'}}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Button block theme="solid"  type="primary" >New Widget</Button>      
        </Col>            
      </Row>
      <Row type="flex" justify="center">        
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div style={{ padding: 12, border: '1px solid var(--semi-color-border)'}}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="widgets">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {
                      items.map((item, idx) => {
                        return (
                          <Draggable 
                            index={idx} 
                            key={`widget-${idx+1}`} 
                            draggableId={`dnd-widget-${idx+1}`}>
                              {(provided) => (
                                <div {...provided.draggableProps}                                
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <div style={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    padding: 12, 
                                    border: '1px solid var(--semi-color-border)',
                                    marginBottom: '10px'
                                  }}>
                                    <IconHandle className={`list-item-drag-handler`} style={{ marginRight: 4 }} />
                                    <div style={{flexGrow: 1}}>{item.name}</div>
                                    <IconDelete 
                                      className={`list-item-delete`} 
                                      style={{ marginLeft: 4, cursor: 'pointer' }} 
                                      onClick={() => {
                                        handleDeleteItem(idx)
                                      }}
                                    />
                                  </div>
                                </div>
                              )}

                          </Draggable>
                        )
                      })                      
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Col>        
        </Row>
      {props.children}
    </div>    
  )
}

export default WidgetsDnD;