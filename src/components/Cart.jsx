'use strict'

import React, { useRef, useState, useContext } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'

import { delToCart, clearToCart, delPoint, addPoint } from '../actions'
import { ShopContext } from '../store'

const cartClass = {
  margin: '2rem',
  display: 'grid',
  justifyContent: 'center',
  borderTop: '1px solid #d0d0d0',
  paddingTop:'1rem'
}
const dialogClass = {
  textAlign: 'center',
  fontWeight: 'bold',
  mx: 0.5,
  fontSize: 16,
}
class Sale {
  constructor(state) {
    this.cartItems = state.cart
    this.userPoint = state.point
    this.totalPrices = this.cartItems.map((item) => item.totalPrice).reduce((a, b) => a + b, 0)
  }
  calcTotalPrices(checked) {
    const result = checked? this.totalPrices - this.userPoint : this.totalPrices
    return (0 > result)? 0 : result
  }
  calcPoint(checked) {
    const result = checked? (this.userPoint - this.totalPrices) : this.userPoint
    return (0 > result)? 0 : result
  }
  dispatchWrap(dispatch, checked) {
    if (checked) {
      dispatch(delPoint(this.totalPrices))
    } else {
      dispatch(addPoint(Math.floor(this.totalPrices/10)))
    }
    dispatch(clearToCart())
  }
}
class TextValidation {
  constructor() {
    [this.value, this.setValue] = useState('');
    [this.error, this.setError] = useState(false)

    // https://react.dev/learn/manipulating-the-dom-with-refs#getting-a-ref-to-the-node
    //
    // Usually, you will access refs from event handlers. If you want to do something with a ref,
    // but there is no particular event to do it in, you might need an Effect.
    // We will discuss effects on the next pages.
    this.ref = useRef(null)
  }
  validateText() {
    const v = this.ref.current.validity.valid
    this.setError(!v)
    return(v)
  }
  handleChange(e) {
    this.setValue(e.target.value)
    return this.validateText()
  }
  helpText() {
    return this.error && this.ref.current.validationMessage
  }
}
export const Cart = () => {
  const {state, dispatch} = useContext(ShopContext)

  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const [message, setMessage] = useState('')

  const sale = new Sale(state)
  const mailAddr = new TextValidation()
  const recipentAddr = new TextValidation()

  const initUi = () => {
    setChecked(false)
    setOpen(false)
  }
  const handleOk = () => {
    const validate = () => {
      let v = mailAddr.validateText()
      v &&= recipentAddr.validateText()
      return v
    }
    if (!validate()) {
      return
    }
    sale.dispatchWrap(dispatch,checked)
    initUi()
    setMessage('Thanks for your purchase.(This is a Demo Program.)')
  }

  if (sale.cartItems.length === 0) {
    return (
      <Container sx={{...cartClass}}>
        <Dialog open={message !== ''} onClose={() => setMessage('')}>
          <DialogTitle>Complete</DialogTitle>
          <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent>
          <DialogActions>
            <Button onClick={() => setMessage('')} color='primary'>Close</Button>
          </DialogActions>
        </Dialog>
        There are no items in your cart.
      </Container>
    )
  }
  const cart = sale.cartItems.map((item) => (
    <Container
      key={item.id}
      sx={{display: 'flex',alignItems: 'center',margin: '0.1rem'}}>
      <img src={item.imageUrl} width='45px' height='45px' alt='{item.title}' />

      <Container sx={{width: '600px',marginLeft: '0.2rem'}}>
        <p className='cart_item'>{item.title}</p>
        <p className='cart_price'>${item.price}</p>
      </Container>
      <p className='cart_artist'>{item.artist}</p>
      <p className='cart_stock'>{item.stock}</p>
      <Button variant='outlined' color='primary' size='small' onClick={() => {dispatch(delToCart(item))}}>
        Delete
      </Button>
    </Container>))

  return (
    <Container sx={cartClass}>
      <p className='cart_title'>In your cart</p>
      <Container>{cart}</Container>
      <Container
        sx={{marginTop: '1.0rem',fontSize: '1.2rem',color: 'red',display: 'flex',justifyContent: 'flex-end'}}>
        Total Amount: ${sale.totalPrices}
        <Button variant='outlined' color='primary' onClick={() => setOpen(true)} sx={{marginLeft: '2.0rem'}}>
          Purchase
        </Button>
      </Container>
      <Dialog open={open} onClose={() => initUi()}>
        <DialogTitle>{'Confirm'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{...dialogClass}}>
            <span style={{ color: '#1976d2'}}> Your Point: ${sale.calcPoint(checked)} </span>
            <FormControlLabel sx={{ paddingLeft: '1rem' }} disabled={(0 >= sale.userPoint)}
              control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} name='points' />}
              label='Use Points' />
          </DialogContentText>
          <FormGroup sx={{marginLeft: '0.5rem'}}>
            <TextField
              id='email-address'
              label='Email'
              margin='dense'
              sx={{m: 1, width: '50ch'}}
              type='email'
              variant='standard'
              inputRef={mailAddr.ref}
              value={mailAddr.value}
              error={mailAddr.error}
              helperText={mailAddr.helpText()}
              inputProps={{required: true}}
              onChange={(e) => {mailAddr.handleChange(e)}}
              required/>
            <TextField
              id='recipent-address'
              label='Address'
              margin='dense'
              sx={{m: 1, width: '50ch'}}
              variant='standard'
              inputRef={recipentAddr.ref}
              value={recipentAddr.value}
              error={recipentAddr.error}
              helperText={recipentAddr.helpText()}
              inputProps={{required: true}}
              onChange={(e) => {recipentAddr.handleChange(e)}}
              required/>
          </FormGroup>
        </DialogContent>
        <DialogContent>
          <DialogContentText sx={{...dialogClass, color: 'success.dark'}}>
            Total Amount: ${sale.calcTotalPrices(checked)}
          </DialogContentText>
          <DialogContentText sx={{marginTop: '1.5rem', textAlign: 'center'}}>
            Would you like to buy?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => initUi()} >Cancel</Button>
          <Button onClick={handleOk} >OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
