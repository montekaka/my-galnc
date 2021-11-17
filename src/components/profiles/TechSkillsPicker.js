import React from "react";
import { Form, Button, Col, Row, Select} from '@douyinfe/semi-ui';

const list = [
  { value: 'angular', label: 'Angular', name: 'Angular', icon_name: 'angular' },
  { value: 'ant-design', label: 'Ant Design', name: 'Ant Design', icon_name: 'ant-design' },
  { value: 'apache', label: 'Apache', name: 'Apache', icon_name: 'apache' },
  { value: 'aws-lambda', label: 'AWS Lambda', name: 'AWS Lambda', icon_name: 'aws-lambda' },
  { value: 'aws-s3', label: 'AWS S3', name: 'AWS S3', icon_name: 'aws-s3' },
  { value: 'azure', label: 'Azure', name: 'Azure', icon_name: 'azure' },
  { value: 'bootstrap', label: 'Bootstrap', name: 'Bootstrap', icon_name: 'bootstrap' },    
  { value: 'django', label: 'Django', name: 'Django', icon_name: 'django' },
  { value: 'firebase', label: 'Firebase', name: 'Firebase', icon_name: 'firebase' },
  { value: 'flask', label: 'Flask', name: 'Flask', icon_name: 'flask' },
  { value: 'flutter', label: 'Flutter', name: 'Flutter', icon_name: 'flutter' },
  { value: 'html5', label: 'HTML5', name: 'HTML5', icon_name: 'html5' },
  { value: 'jquery', label: 'jQuery', name: 'jQuery', icon_name: 'jquery' },
  { value: 'json', label: 'JSON', name: 'JSON', icon_name: 'json' },
  { value: 'kotlin', label: 'Kotlin', name: 'Kotlin', icon_name: 'kotlin' },
  { value: 'mongo', label: 'Mongo', name: 'Mongo', icon_name: 'mongo' },
  { value: 'my-sql', label: 'MySQL', name: 'MySQL', icon_name: 'my-sql' },
  { value: 'nginx', label: 'Nginx', name: 'Nginx', icon_name: 'nginx' },
  { value: 'python', label: 'Python', name: 'Python', icon_name: 'python' },
  { value: 'react-js', label: 'React.js', name: 'React.js', icon_name: 'react-js' },
  { value: 'redis', label: 'Redis', name: 'Redis', icon_name: 'redis' },
  { value: 'swift', label: 'Swift', name: 'Swift', icon_name: 'swift' },
  { value: 'tailwindcss', label: 'Tailwindcss', name: 'Tailwindcss', icon_name: 'tailwindcss' },
  { value: 'typescript', label: 'Typescript', name: 'Typescript', icon_name: 'typescript' },
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