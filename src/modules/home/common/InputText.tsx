import { String } from 'lodash';
import React from 'react';
import { IVendor } from '../models/vendorModals';

interface Props{
  text: string,
  data: Array<IVendor> | undefined,
  name: string,
  onChangeFilterInput(value: string): void
}

function InputText(props: Props) {
  const { text, data, name, onChangeFilterInput } = props;

  const [inputVendors, setInputVendors] = React.useState({ check: false, dBlock: '', inputText: '' });

  const onChangeSuggestInput = (e:any)=>{
    const test = data?.some(item=>{
      return item.name?.includes(e.target.value);
    })

    if(test){
      if(e.target.value == ''){
        setInputVendors({...inputVendors, inputText: e.target.value, dBlock: '', check: false}); 
      }else{
        setInputVendors({...inputVendors, inputText: e.target.value, dBlock: ' d-block', check: true});
      }
    }else{
      setInputVendors({...inputVendors, inputText: e.target.value, dBlock: '', check: false});
    }

    if(e.target.value == ''){
      onChangeFilterInput('');
    }
  };

  const handleChooseVendor = (e:any)=>{
    onChangeFilterInput((e.target.value).toString());
    setInputVendors({...inputVendors, dBlock: '', inputText: e.target.innerText});
  }

  return (
    <div className='suggest-input__wrap'>
      <input type="text" name={`${name}-input`} id={`${name}-input`} className='custom-input' placeholder={text} onChange={onChangeSuggestInput} value={inputVendors.inputText}/>
      <ul className={'suggest-input__list' + inputVendors.dBlock}>
        {
          inputVendors.check ? 
          (data?.map((item,index)=>{
            if(item.name?.includes(inputVendors.inputText)){
              return(
                <li key={index} className='suggest-input__item' onClick={handleChooseVendor} value={item.id}>{item.name}</li>
              )
            }
          })):(<li className='suggest-input__item'>No value</li>) 
        }
      </ul>
    </div>
  )
}

export default InputText
