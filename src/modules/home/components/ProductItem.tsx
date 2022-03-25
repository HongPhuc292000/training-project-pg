import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct, IUpdateEnabled } from '../models/productModal';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import '../scss/home.scss';
import { ISellerDelete } from '../models/userModals';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { listDeleteProducts } from '../redux/selector';
import { setDeleteProducts } from '../redux/product';
import { fetchThunk } from '../../common/redux/thunk';


interface Props{
    data: IProduct,
    allStatus: boolean,
    onRefreshData(): void
}

const useSelectStyles = makeStyles({
    powericonon:{
        color: "#72B25B",
    },
    
    powericonoff:{
         color: '#fff',
    },
});

function ProductItem(props: Props) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const listDeletes = useSelector(listDeleteProducts);

    const { data, allStatus, onRefreshData } = props;
    const [priceStatus, setPriceStatus] = React.useState(true);
    const [checkboxStatus, setCheckboxStatus] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [infoUpdate, setInfoUpdate] = React.useState<Array<IUpdateEnabled>>();
    const [showModal, setShowModal] = React.useState(false);

    const updateProduct = React.useCallback(async(id: string, value: number)=>{
        setLoading(true);
        const json = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/products/edit','post', {params: [{id: id, enable: value}]}));
        setLoading(false);
    },[listDeletes])

    const handleChangePrice = ()=>{
        setPriceStatus(false);
    }

    const handleConvertDate = (dateString: string)=>{
        const dateConverted = moment(Number.parseInt(dateString) * 1000).format('ll');
        return dateConverted;
    }

    const formatPrice = (price: string)=>{
        const priceDot = price?.indexOf('.');
        const formatedPrice = price?.slice(0, priceDot + 3);
        return formatedPrice;
    }

    const handlChangeCheckboxStatus = ()=>{
        setCheckboxStatus(!checkboxStatus)
        let productIdAr: Array<ISellerDelete> | undefined = [];
        const check = checkboxStatus;
        if(check){
            productIdAr = listDeletes.filter(item=>{
            return item.id != data.id;
          })
        }
        else{
            productIdAr = [...listDeletes, {id: data.id, delete: 1}]
        }
        dispatch(setDeleteProducts(productIdAr));
    }

    React.useEffect(()=>{
        setCheckboxStatus(allStatus);
    },[allStatus])

    const handleChangeEnabled = ()=>{
        setShowModal(true);
    }

    const handleAcceptUpdateProduct = (e: any)=>{
        console.log(e.target.innerText)
        if(e.target.innerText === "YES"){
            if(parseInt(data.enabled) === 0){
                updateProduct(data.id, 1);
            }else{
                updateProduct(data.id, 0);
            }
            setShowModal(false);
        }else{
            setShowModal(false);
        }
        onRefreshData()
    }

    const classes = useSelectStyles();
    return (
        <>
            {
                showModal ? (
                    <div className='modal__acp-wrap'>
                        <div className='modal__acp-content'>
                            <p className='modal__acp-item'>Confirm Update</p>
                            <p className='modal__acp-item'>Do you want to update this product?</p>
                            <div className='modal__acp-item'>
                                <button className='custom-button accept md-btn' onClick={handleAcceptUpdateProduct}>Yes</button>
                                <button className='custom-button error md-btn' onClick={handleAcceptUpdateProduct}>No</button>
                            </div>
                        </div>
                    </div>
                ) : ''
            }
            <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={checkboxStatus ? "opc-05" : ""}
            >
                <TableCell component="th" scope="row">
                    <input 
                        checked={allStatus ? allStatus && checkboxStatus : checkboxStatus}
                        type="checkbox"
                        name={data.id}
                        id={data.id}
                        onChange={handlChangeCheckboxStatus}
                    />
                </TableCell>
                <TableCell align="left">
                    <button style={{backgroundColor: 'transparent', padding: '0', border: 'none', outline: 'none'}} onClick={handleChangeEnabled}>
                        <PowerSettingsNewIcon className={data.enabled === '0' ? classes.powericonoff : classes.powericonon}/>
                    </button>
                </TableCell>
                <TableCell align="left">
                    <span className='text-wrap-2'>{data.sku}</span>
                </TableCell>
                <TableCell align="left">
                <Link to={`/detailProduct/${data.id}`} className="text-wrap-2 link" >
                    {data.name}
                </Link>
                </TableCell>
                <TableCell align="left">
                    <span className='text-wrap-2'>{data.category}</span>
                </TableCell>
                <TableCell align="left">
                    <input className='item__price price' type="text" value={formatPrice(data.price)} onClick={handleChangePrice}/> 
                </TableCell>
                <TableCell align="left">
                    <input className='item__price stock' type="text" value={data.amount} onClick={handleChangePrice}/>
                </TableCell>
                <TableCell align="left">
                    <a href="" className='text-wrap-1 link'>{data.vendor}</a>
                </TableCell>
                <TableCell align="left" sx={{width: '120px'}}>{handleConvertDate(data.arrivalDate)}</TableCell>
                <TableCell align="left">
                    <div>
                        <button className='custom-button' onClick={handlChangeCheckboxStatus}>
                            <DeleteIcon />
                        </button>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ProductItem