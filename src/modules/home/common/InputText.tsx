import React from 'react';
import { IVendor } from '../models/vendorModals';

interface Props{
  text: string,
  data: Array<IVendor> | undefined,
  name: string,
  onChangeFilterInput(type: string,value: string): void
}

function InputText(props: Props) {
  const { text, data, name, onChangeFilterInput } = props;

  const [inputVendors, setInputVendors] = React.useState({ check: false, dBlock: '', inputText: '' });


  const onChangeInput = (e:any)=>{
    onChangeFilterInput(e.target.placeholder,e.target.value);
  }

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
  };

  return (
    <>
      {
        data != undefined && data.length > 0?
        (
          <div className='suggest-input__wrap'>
            <input type="text" name={`${name}-input`} id={`${name}-input`} className='custom-input' placeholder={text} onChange={onChangeSuggestInput}/>
            <ul className={'suggest-input__list' + inputVendors.dBlock}>
              {
                inputVendors.check ? 
                (data.map(item=>{
                  if(item.name?.includes(inputVendors.inputText)){
                    return(
                      <li key={item.id} className='suggest-input__item'>{item.name}</li>
                    )
                  }
                })):(<li className='suggest-input__item'>No value</li>) 
              }
            </ul>
          </div>
        ):
        (<input type="text" name={`${name}-input`} id={`${name}-input`} className='custom-input' placeholder={text} onChange={onChangeInput}/>)
      }
    </>
  )
}

export default InputText
