import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, makeStyles } from '@mui/styles'
import { IProduct } from '../models/productModal';
import moment from 'moment';
import { Link } from 'react-router-dom';

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

  powericonon:{
    color: "#72B25B",
  },

  powericonoff:{
    color: '#fff',
  },
});



interface Props{
  data: Array<IProduct>,
}

export default function BasicTable(props: Props) {

  const { data } = props;
  const [priceStatus, setPriceStatus] = React.useState(true);
  const [checkboxStatus, setCheckBoxStatus] = React.useState(false);

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

  const handleSelectAll = ()=>{
    setCheckBoxStatus(!checkboxStatus);
  }
  const classes = useSelectStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><input type="checkbox" name="select-all" id="select-all" onChange={handleSelectAll} /></TableCell>
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
          {data?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <input checked={checkboxStatus} type="checkbox" name={row.id} id={row.id} />
              </TableCell>
              <TableCell align="left"><PowerSettingsNewIcon className={row.enabled === '0' ? classes.powericonoff : classes.powericonon}/></TableCell>
              <TableCell align="left">
                <span className='text-wrap-2'>{row.sku}</span>
              </TableCell>
              <TableCell align="left">
                <Link to={`/detailProduct/${row.id}`} className="text-wrap-2 link" >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell align="left">
                <span className='text-wrap-2'>{row.category}</span>
              </TableCell>
              <TableCell align="left">
                <input className='item__price price' type="text" value={formatPrice(row.price)} onClick={handleChangePrice}/> 
              </TableCell>
              <TableCell align="left">
                <input className='item__price stock' type="text" value={row.amount} onClick={handleChangePrice}/>
              </TableCell>
              <TableCell align="left">
                <a href="" className='text-wrap-1 link'>{row.vendor}</a>
              </TableCell>
              <TableCell align="left" sx={{width: '114px'}}>{handleConvertDate(row.arrivalDate)}</TableCell>
              <TableCell align="left">
                <div>
                  <button className='custom-button'>
                    <DeleteIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
