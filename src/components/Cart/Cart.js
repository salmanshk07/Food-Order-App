import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const hasItem = cartCtx.items.length > 0

    const cartItemAddHandler=(item)=>{
        cartCtx.addItem(item);
    }

    const cartItemRemoveHandler=(id)=>{
         cartCtx.removeItem(id);
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((value) =>
            (<CartItem
                key={value.key}
                name={value.name}
                amount={value.amount}
                price={value.price}
                onRemove={cartItemRemoveHandler.bind(null,value.id)}
                onAdd={cartItemAddHandler.bind(null,value)}
            />)
            )}
        </ul>
    );
    return <Modal onClose={props.onClose} >
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt ']} onClick={props.onClose}>Close</button>
            {hasItem && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
}
export default Cart;