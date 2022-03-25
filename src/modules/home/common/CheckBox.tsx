import React from 'react'

interface Props{
    type: string,
    onChange(checkStatus: boolean, type: string): void 
}

function CheckBox(props: Props) {
    const { type, onChange } = props;
    const [checkStatus, setCheckStatus] = React.useState(false);

    const convertType = ()=>{
        if(type === 'Full description'){
            return 'des';
        }else if(type === 'Name'){
            return 'name';
        }else{
            return 'sku'
        }
    }


    const handleChangeFilterSearch = (e:any)=>{
        setCheckStatus(!checkStatus);
        onChange(!checkStatus,convertType());
    }
  return (
    <>
        
    </>
  )
}

export default CheckBox