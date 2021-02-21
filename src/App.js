import './App.css';
import 'antd/dist/antd.css';
import CustomSelectDropdown from './CustomSelectDropdown';
import { useEffect, useState } from 'react';

const renderedData = {
  Colours: ['red', 'yellow', 'green', 'blue'],
  Components: [
      {
          'title': 'Button', 'path': 'demo-button', 'value': 'Button', 'label': 'Button'
      },
      {
          'title': 'Selection Control', 'path': 'demo-selection-control', 'value': 'Selection Control', 'label': 'Selection Control'
      },
      {
          'title': 'Input', 'path': 'demo-input', 'value': 'Input', 'label': 'Input'
      },
      {
          'title': 'Snackbar', 'path': 'demo-snackbar', 'value': 'Snackbar', 'label': 'Snackbar'
      },
      {
          'title': 'Chips', 'path': 'demo-chips', 'value': 'Chips', 'label': 'Chips'
      },
      {
          'title': 'Progress Tabs', 'path': 'demo-vertical-tabs', 'value': 'Progress Tabs', 'label': 'Progress Tabs'
      },
      {
          'title': 'Typography', 'path': 'demo-wip', 'value': 'Typography', 'label': 'Typography'
      },
      {
          'title': 'Card', 'path': 'demo-wip', 'value': 'Card', 'label': 'Card'
      },
      {
          'title': 'Pagination', 'path': 'demo-wip', 'value': 'Pagination', 'label': 'Pagination'
      }
  ]
}

const App = () => {

  const [defaultOptions, setDefaultOptions] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const formatData = data => {
    let returnObj = {};
    Object.keys(data).forEach(obj => {
      const itemArr = data[obj];
      if(typeof itemArr[0] === 'object') {
        const newItemArr = itemArr.map(item => {
          return item.title;
        })
        returnObj[obj] = newItemArr;
      }
      else {
        returnObj[obj] = itemArr;
      }
    })
    return returnObj;
  }

  useEffect(() => {
    const defaultOptions = Object.keys(renderedData).map(item => {
       return {label: item, value: item} 
    })
    const data = formatData(renderedData);
    setDropdownOptions(data)
    setDefaultOptions(defaultOptions)
  }, []);

  return (
    <div className='custom-select-container'>
      <h3 style={{fontWeight: 900, color: 'black'}}>Dropdown with search</h3>
      <CustomSelectDropdown 
        data={dropdownOptions} 
        defaultOptions={defaultOptions} 
        searchable={true} 
        multiselect={true}
        defaultValue={'Colours'}
      />
    </div>
  );
}

export default App;
