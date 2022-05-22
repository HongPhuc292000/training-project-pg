import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles'
import { IProduct } from '../models/productModal';
import ProductItem from './ProductItem';
import { ISellerDelete } from '../models/userModals';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { setDeleteProducts } from '../redux/product';

const useSelectStyles = makeStyles({
  root: {
    backgroundColor: '#323259',
    padding: '0',
    '&::-webkit-scrollbar':{
      width: '4px',
    },
    '&::-webkit-scrollbar-track':{
      backgroundColor: '#13132B',
    },
    '&::-webkit-scrollbar-thumb':{
      background: '#AD88FA',
      borderRadius: '4px',
      transition: 'color linear 0.5s'
    },
    '&::-webkit-scrollbar-thumb:hover':{
      background: '#c6acfd',
    },
  },
  table:{
    
    '& thead':{
      '& th':{
        fontSize: '15px',
        fontWeight: '600',
      },
    },

    '& th, td':{
      color: '#fff',
      borderBottom: '1px solid #1B1B38',
      padding: '10px 16px',
      '&:nth-child(1)':{
        paddingRight: '10px',
        '& input[type="checkbox"]':{
          marginTop: '8px',
        },
      },
      '&:nth-child(2)':{
        paddingLeft: '0',
        '& svg':{
          paddingLeft: '10px',
          paddingRight: '10px',
          fontSize: '44px',
          borderLeft: '1px solid #fff',
          borderRight: '1px dashed #fff',
          '&:hover':{
            cursor: 'pointer',
          },
        },
      },
    },

    '& tbody':{
      '& tr':{
        '&:hover .item__price':{
          backgroundColor: '#AD88FA',
        },
      },

      '& td:last-child':{
        paddingLeft: '0',
        '& div':{
          paddingLeft: '16px',
          borderLeft: '1px dashed #fff',
        },
      },
    },
  },
});


interface Props{
  data: Array<IProduct> | undefined,
  onRefreshData(): void
}

export default function BasicTable(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const { data, onRefreshData } = props;
  const [allCheckboxStatus, setAllCheckboxStatus] = React.useState(false);

  React.useEffect(()=>{
    setAllCheckboxStatus(false)
  },[data])

  const handleSelectAll = ()=>{
    setAllCheckboxStatus(!allCheckboxStatus);
    let productIdAr: Array<ISellerDelete> | undefined =  [];
    const check = allCheckboxStatus;
    if(check){
      productIdAr = [];
    }else{
      productIdAr = data?.map(item=>{
        return {id: item.id, delete: 1};
      })
    }
    dispatch(setDeleteProducts(productIdAr));
  } 

  const handleRefreshTable = ()=>{
    onRefreshData();
  }

  const classes = useSelectStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><input checked={allCheckboxStatus} type="checkbox" name="select-all" id="select-all" onChange={handleSelectAll} /></TableCell>
            <TableCell></TableCell>
            <TableCell>SKU</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">In stock</TableCell>
            <TableCell align="left">Vendor</TableCell>
            <TableCell align="left">Arrival Date</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? data?.map((row) => (
            <ProductItem key={row.id} data={row} allStatus={allCheckboxStatus} onRefreshData={handleRefreshTable}/>
          )) : ''}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
