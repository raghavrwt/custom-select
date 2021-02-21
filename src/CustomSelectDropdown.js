import React, { useState, useEffect } from 'react';
import { Select, Input, Checkbox } from 'antd';
import './App.css'
import _ from 'lodash';

const { Option } = Select;

const CheckboxGroup = Checkbox.Group;

const CustomSelectDropdown = ({
    data,
    defaultOptions,
    searchable,
    multiselect,
    defaultValue
}) => {
    const [checkboxOptions, setCheckboxOptions] = useState();
    const [checkedList, setCheckedList] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [ekVal, setEkVal] = useState(defaultValue);
    const [resultValue, setResultValue] = useState();

    const generateOptionField = (options) => {
        return options.map(item => {
            return <Option key={item.value} value={item.value}>{item.label}</Option>
        });
    }

    useEffect(() => {
        setCheckboxOptions(data[defaultValue]);
    }, [data])

    const onHandleChange = (value) => {
        setEkVal(value);
        setCheckboxOptions(data[value]);
        setResultValue();
        setCheckAll(false);
        setIndeterminate(false);
        setCheckedList([])
    }

    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < data[ekVal].length);
        setCheckAll(list.length === data[ekVal].length);
      };
    
    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? data[ekVal] : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const onInputChange = (e) => {
        const { value } = e.target;
        if(data[ekVal]) {
            const itemFiltered = data[ekVal].map(item => {
                if (item.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    return item;
                }
            }).filter(i => i !== undefined);
            setCheckboxOptions(itemFiltered);
        }
    }

    const onSubmit = () => {
        const resultString = Array.isArray(checkedList) ? checkedList.join(',') : checkedList;
        const resultValue = `${ekVal} - ${resultString}`;
        setResultValue(resultValue);
    }

    const singleClick = (value) => {
        setCheckedList(value);
    }

    const generateDivElements = (data) => {
        if(data) {
            return (
                <div className='checkboxGroup'>
                    {data.map((item, index) => {
                        return <div key={index} className='ant-checkbox-group-item' onClick={() => singleClick(item)} style={{ cursor: 'pointer'}}>{item}</div>
                    })}
                </div>
            )
        }
    }

    return (
        <div>
            <div style = {{paddingTop: '20px', lineHeight: '2.5rem'}}>
                <div>
                    <label>Default</label>
                </div>
                <div>
                    <Select defaultValue={defaultValue} style={{ width: 200 }} onChange={onHandleChange}>
                        {generateOptionField(defaultOptions)}
                    </Select>
                </div>
            </div>
            <div style = {{paddingTop: '20px', lineHeight: '2.5rem'}}>
                <div>
                    <label>Dropdown</label>
                </div>
                {searchable && <div>
                    <Input placeholder="Search" style={{width: 200, height: 40}} onChange={onInputChange}/>
                </div>}
                <div className='checkbox-container'>
                    { multiselect ?
                    <>
                    <Checkbox style={{width: 200, height: 40,borderBottom: '1.5px solid #EEEEEE', paddingLeft: 10}} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}/>
                    <CheckboxGroup className='checkboxGroup' style={{display: 'flex', flexDirection: 'column', width: 200, lineHeight: 'inherit'}} options={checkboxOptions} onChange={onChange} value={checkedList} />
                    </>
                    :
                    generateDivElements(checkboxOptions)
                    }<div style={{ borderTop: '1.5px solid #eeeeee', display: "flex", justifyContent: 'flex-end', alignItems: "center", height: 60, paddingRight: 10}}>
                        <div style={{paddingRight: 30, cursor: 'pointer'}}>Clear</div>
                        <div style={{color: "#6CC69D", fontWeight: 900, cursor: 'pointer'}} onClick={onSubmit}>Submit</div>
                    </div>
                </div>
            </div>
            <div style = {{paddingTop: '20px', lineHeight: '2.5rem'}}>
                <div>
                    <label>Result</label>
                </div>
                <Input style={{width: 200, textOverflow: 'ellipsis'}} value={resultValue}/>
            </div>
        </div>
        
    )
}

export default CustomSelectDropdown