'use strict'

// fix. ReferenceError: React is not defined when npm test
import React, {useEffect, useState, useContext } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

import { addToCart } from '../actions/cartAction'
import { ShopContext, CartContext } from '../store'

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  zIndex: theme.zIndex.tooltip + 1,
  ['& .MuiTooltip-tooltip']: {
    maxWidth: '200px',
    fontFamily: 'Helvetica',
    fontSize: '12px',
    backgroundColor: 'rgba(255,255,255)',
    margin: '4px',
    padding: '8px',
    whiteSpace: 'pre-line'
  }
}))

const tooltipTop = {
  '& .MuiTooltip-tooltip': {
    border: 'solid skyblue 1px',
    color: 'black'
  }
}

export const Shop = () => {
  const state = useContext(ShopContext).state
  const dispatch = useContext(CartContext).dispatch
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [work, setWork] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(state.jsonfile)
      const jsonData = await response.json()
      setData(jsonData)
    }
    fetchData()
  }, [state.jsonfile])

  return (
    <Container sx={{height: '405px', overflowY: 'auto',}}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{paddingBottom: 0}}>{work.title}</DialogTitle>
        <DialogContentText sx={{marginLeft: '2.0rem', fontSize: 14}}>{work.artist}</DialogContentText>
        <DialogContent>
          <Stack direction='row' spacing={2}>
            <Box component="img" sx={{maxWidth: '320px', maxHeight: '320px'}} alt={work.title} src={work.imageUrl}/>
            <DialogContentText sx={{ fontSize: 12 }}>{work.description}</DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>Close</Button>
        </DialogActions>
      </Dialog>
      <Grid container rowSpacing={1}>
        {
          data.map((item) => (
            <Grid item xs={2} key={item.id}>
              <Box
                sx={{padding: '0.5rem',borderBottom: '1px solid #d0d0d0',boxShadow: '1px 1px 3px #b1b1b1',textAlign: 'center'}}>
                <StyledTooltip arrow title={'Please click'} placement="bottom" sx={tooltipTop}>
                  <Box component="img" sx={{width: '120px', height: '120px'}} alt={item.title} src={item.imageUrl} onClick={() => {setWork(item); setOpen(true)}}/>
                </StyledTooltip>
                <Stack direction='row' sx={{marginTop: '0.2rem',alignItems:'center',justifyContent: 'center'}}>
                  <p className='shop_price'>${item.price}</p>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    sx={{marginLeft: '1.8rem'}}
                    startIcon={<AddShoppingCart />}
                    onClick={() => {dispatch(addToCart(item))}}>
                    Cart
                  </Button>
                </Stack>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}
