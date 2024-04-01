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

import { addToCart } from '../actions'
import { ShopContext } from '../store'

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  zIndex: theme.zIndex.tooltip + 1,
  ['& .MuiTooltip-tooltip']: {
    maxWidth: 200,
    fontFamily: 'Helvetica',
    fontSize: '14px',
    backgroundColor: 'rgba(255,255,255)',
    margin: 4,
    padding: 8,
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

  const {state, dispatch} = useContext(ShopContext)
  const [data, setData] = useState([])

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
      <Grid container rowSpacing={1}>
        {
          data.map((item) => (
            <Grid item xs={2} key={item.id}>
              <Box
                sx={{padding: '0.5rem',borderBottom: '1px solid #d0d0d0',boxShadow: '1px 1px 3px #b1b1b1',textAlign: 'center'}}>
                <StyledTooltip title={item.description} placement="bottom" sx={tooltipTop}>
                  <img src={item.imageUrl} width='120px' height='120px' alt={item.title} />
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
