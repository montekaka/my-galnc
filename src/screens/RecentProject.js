import React, {useEffect, useState} from "react";
import {msParserApi} from '../apis';
import { useAtom } from "jotai";
import { Link } from 'react-router-dom'
import { Col, Row, Button} from '@douyinfe/semi-ui';
import { SingleWidgetForm} from '../components/widget-builder'
import {useFetchWidgets} from '../hooks'

const RecentProject = (props) => {
  const id = props.match.params.id;
  const [loading, saveChangedItems, widgets, setWidgets] = useFetchWidgets(id, 'header-pinned');
  // const [selectedSkills, setSelectedSkills] = useState([])
  const [url, setUrl] = useState('');

  useEffect(() => {
    if(widgets && widgets[0]) {
      const _url = widgets[0]['url']
      setUrl(_url)
    }    
  }, [widgets])
  

  const handleSave = () => {
    saveChangedItems(widgets)
  }

  const handleInputChange = (e) => {
    setUrl(e);
  }
  
  const handleRecentProjectTestButtonClick = async () => {
    // const url = recentProject.url;
    try {
      const res = await msParserApi.get(`/v1/url_parser?uri=${url}`)
      const {image, title} = res.data;
      const _widget = {...widgets[0]};

      setWidgets([{..._widget, url: url, image_url: image, post_title: title}])
    } catch (err) {
      console.log(err);
      // TODO: some notification that link does not work
    }

  }

  if(loading) return null;

  if(widgets && widgets[0]) {
    return (
      <>
        <Row type="flex" justify="center" style={{marginTop: "20px"}}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <SingleWidgetForm 
              url={url} 
              widget={widgets[0]} 
              handleInputChange={handleInputChange}
              handleUpdatePreview={handleRecentProjectTestButtonClick}
            />          
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{marginTop: "20px"}}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Button block type="warning" onClick={handleSave}>Save</Button>      
        </Col>                 
        </Row>  
        <Row type="flex" justify="center" style={{marginTop: "10px"}}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Link to="/" style={{ textDecoration: 'none' }}><Button block type="secondary">Cancel</Button></Link>
          </Col>                
        </Row>    
      </>  
      // <WidgetsDnD 
      //   items={widgets}
      //   updateItem={updateWidgets}
      // >
      //   <Row type="flex" justify="center" style={{marginTop: "20px"}}>
      //     <Col xs={24} sm={24} md={12} lg={12} xl={12}>
      //       <Button block type="warning" onClick={handleSave}>Save</Button>      
      //     </Col>                 
      //   </Row>  
      //   <Row type="flex" justify="center" style={{marginTop: "10px"}}>
      //     <Col xs={24} sm={24} md={12} lg={12} xl={12}>
      //       <Link to="/" style={{ textDecoration: 'none' }}><Button block type="secondary">Cancel</Button></Link>
      //     </Col>                
      //   </Row>
      // </WidgetsDnD>  
    )
  }
  

  return null;
}

export default RecentProject;