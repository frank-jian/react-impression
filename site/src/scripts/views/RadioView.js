import React, { Component } from 'react';
import { Row, Col, Card, Radio, RadioGroup, Form, Breadcrumb } from '../components/impression';
import { CommenTable, Highlight } from '../components';

export default class RadioView extends Component{
    onChangeHandle(value, event){
        // console.log(value);
    }
    render(){
        let radioArray = [{
            id: 1,
            name: 'First'
        }, {
            id: 2,
            name: 'Second'
        }, {
            id: 3,
            name: 'Third'
        }];

        return (
            <div>
                <Breadcrumb divider="arrow" routes={this.props.routes}/>
                <Card block noborder>
                    <h5>Radio</h5>
                    <Card>
                       <Card block noborder>
                        <Row>
                            <Col>
                                <Card block>
                                    <Form>
                                        <Form.Group>
                                            <label>Radio</label>
                                            <RadioGroup defaultValue={1} onChange={this.onChangeHandle}>
                                               { radioArray.length > 0 && radioArray.map((item, index) =>
                                                    <Radio key={index} value={item.id}>{item.name}</Radio>
                                                )}
                                            </RadioGroup>
                                        </Form.Group>
                                    </Form>
                                </Card>
                            </Col>
                            <Col>
                                <Card block>
                                    <Form>
                                        <Form.Group>
                                            <label>Disabled</label>
                                            <RadioGroup disabled>
                                                <Radio defaultChecked>Yes</Radio>
                                                <Radio>No</Radio>
                                            </RadioGroup>
                                        </Form.Group>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                        </Card>
                        <Highlight>
                            {`import { Radio, RadioGroup } from 'impression-react';\n\n<RadioGroup defaultValue={1} ><Radio value={1}>First</Radio>...</RadioGroup>\n<RadioGroup disabled><Radio defaultChecked>Yes</Radio>...</RadioGroup> `}
                        </Highlight>
                    </Card>
                    <h5 className="text-secondary">Radio API</h5>
                    <CommenTable
                        data = {[
                            ['name', '名称', 'any', ''],
                            ['value', '返回值', 'any', ''],
                            ['checked', '是否选中', 'boolean', ''],
                            ['defaultChecked', '默认是否选中', 'boolean', ''],
                            ['disable', '是否可以点击', 'boolean', 'false'],
                            ['onChange', '状态变更回调函数', 'function', ''],
                            ['className', '自定义样式', 'string', ''],
                        ]}
                    ></CommenTable>
                    <h5 className="text-secondary">RadioGroup API</h5>
                    <CommenTable
                        data = {[
                            ['value', '设置默认是否选中', 'any', ''],
                            ['onChange', '状态变更回调函数', 'function', ''],
                            ['disabled', '是否可以点击', 'boolean', 'false'],
                            ['name', '设置名称', 'string', ''],
                            ['direction', '排列方向，可选值为 row、column', 'string', 'row'],
                            ['className', '自定义样式', 'string', ''],
                        ]}
                    ></CommenTable>
                </Card>
            </div>
        );
    }
}

RadioView.title = 'Radio';