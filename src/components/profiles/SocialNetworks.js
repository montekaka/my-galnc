import React from "react";
import { Form, Button, Col, Row} from '@douyinfe/semi-ui';
import FormInput from './FormInput'

const options = [  
  {icon_name: 'twitter', name: "Twitter", label: 'Twitter', value: 'twitter'}, 
  {icon_name: 'linkedin', name: "Linkedin", label: 'Linkedin', value: 'linkedin'},
  {icon_name: 'github', name: "Github", label: 'Github', value: 'github'},
  {icon_name: 'medium', name: "Medium", label: 'Medium', value: 'medium'},
  {icon_name: 'hashnode', name: "Hashnode", label: 'Hashnode', value: 'hashnode'},
  {icon_name: 'dev', name: "Dev", label: 'Dev', value: 'dev'},
  {icon_name: 'behance', name: "Behance", label: 'Behance', value: 'behance'},
  {icon_name: 'dribbble', name: "Dribbble", label: 'Dribbble', value: 'dribbble'},
  {icon_name: 'facebook', name: "Facebook", label: 'Facebook', value: 'facebook'},
  {icon_name: 'linkedin', name: "LinkedIn", label: 'LinkedIn', value: 'linkedin'},
  {icon_name: 'product-hunt', name: "ProductHunt", label: 'ProductHunt', value: 'product-hunt'},
  {icon_name: 'youtube', name: "Youtube", label: 'Youtube', value: 'youtube'},
  {icon_name: 'website', name: "Website", label: 'Website', value: 'website'},
]

const SocialNetworks = (props) => {
  const {items, addNewItem, removeItem, updateItem} = props;

  const hanleAddNewItem = () => {
    const {icon_name, name} = options[0];
    const newId = (new Date()) * -1;
    addNewItem({
      id: newId,
      icon_name, 
      name,
      url: ""
    });
  }

  return (
    <div style={{paddingTop: 40}}>
      <Row type="flex" justify="center" style={{marginBottom: '20px'}}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Button block theme="solid"  type="primary" onClick={hanleAddNewItem}>New Link</Button>      
        </Col>            
      </Row>
      {
        items && items.map((item, idx) => {
          const {url, name, icon_name} = item;
          return (
            <FormInput
              idx={idx}
              url={url}
              name={name}
              icon_name={icon_name}
              key={idx}
              options={options}
              onChange={updateItem}
              onRemoveClick={removeItem}
            />  
            )
          }      
        )
      }

      {props.children}
    </div>    
  )
}

export default SocialNetworks;