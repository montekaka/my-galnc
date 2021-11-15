import React from "react";
import { Form, Button, Col, Row, Select} from '@douyinfe/semi-ui';

const list = [
  { value: 'angular', label: 'Angular', name: 'Angular', icon_name: 'angular' },
  { value: 'ant-design', label: 'Ant Design', name: 'Ant Design', icon_name: 'ant-design' },
  { value: 'aws-lambda', label: 'AWS Lambda', name: 'AWS Lambda', icon_name: 'aws-lambda' },
  { value: 'aws-s3', label: 'AWS S3', name: 'AWS S3', icon_name: 'aws-s3' },
  { value: 'azure', label: 'Azure', name: 'Azure', icon_name: 'azure' },
  { value: 'bootstrap', label: 'Bootstrap', name: 'Bootstrap', icon_name: 'bootstrap' },    
];

const TechSkillsPicker = (props) => {

  const {items, updateSkills} = props;
  const onChange = (skills) => {

    const dict = {};
    for(let i = 0; i < list.length; i++) {
      const key = list[i]["value"];
      const {name, icon_name} = list[i];
      dict[key] = {name, icon_name, id: (new Date()) * -1}
    }

    const techSkills = skills.map((item) => dict[item]);

    updateSkills(skills, techSkills)
  }

  return (
    <div style={{paddingTop: 40}}>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Select 
            multiple 
            placeholder='Tech skills' 
            optionList={list}
            value={items}
            onChange={onChange}
            style={{width: "100%"}}
          />
        </Col>
      </Row>
      {props.children}   
    </div>     
  )
}

export default TechSkillsPicker;