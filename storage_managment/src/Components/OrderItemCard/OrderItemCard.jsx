import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Card, Avatar } from "@material-ui/core"
import { Add, Remove } from "@material-ui/icons";

import { increaseGoods, decreaseGoods } from "../../Actions/orders";

import useStyles from './styles';

const OrderItemCard = ({ item, darkMode, number, countTotalPrice, orderItem, setBlockButton }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [quantityColor, setQuantityColor] = useState('')


    useEffect(() => {
        if (item?.quantity > item?.quantityOnStorage) {
            setQuantityColor('red')
            setBlockButton(true)
        } else {
            setQuantityColor('green')
            setBlockButton(false)
        }
    },[item?.quantity, item?.quantityOnStorage, setBlockButton])

    const increase = () => {
        dispatch(increaseGoods(item._id))
    }

    const decrease = () => {
        item?.quantity > 1 && dispatch(decreaseGoods(item._id))
    }

    return (
        <Card className={classes.orderProduct}
              style={darkMode ? {backgroundColor: 'rgb(26, 32, 46)', color: '#fff'} : {backgroundColor: '#fff'}}>
            <Avatar className={classes.orderProductImage} src={`data:image/jpg;base64,${item?.avatar}`}/>
            <Box className={classes.productDetails}>
                <Box component="span" className={classes.cartProductName}>
                    <b>Товар:</b> {item?.name}
                </Box>
                <Box component="span" className={classes.cartProductId}>
                    <b>Артикул:</b> {item?._id}
                </Box>
            </Box>
            <Box className={classes.orderProductsAmount}>
                <Box component="span" className={classes.cartProductName}>
                        <b>Кол-во в заказе:</b>
                </Box>
                <Box className={classes.orderProductAmountContainer}>
                    <Add onClick={() => increase()}/>
                    <Box className={classes.orderProductAmmount}>
                        {item?.quantity}
                    </Box>
                    <Remove onClick={() => decrease()}/>
                    </Box>
                </Box>
                <Box className={classes.orderProductsAmount}>
                    <Box component="span" className={classes.cartProductName}>
                        <b>Кол-во на складе:</b>
                    </Box>
                    <Box className={classes.orderProductAmountContainer} style={{ color: `${quantityColor}` }}>
                        <Box className={classes.orderProductAmmount}>
                            {item?.quantityOnStorage}
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.orderProductsAmount}>
                    <Box component="span" className={classes.cartProductName}>
                        <b>Цена за 1 шт:</b>
                    </Box>
                    <Box className={classes.orderProductAmountContainer}>
                        <Box className={classes.orderProductAmmount}>
                            {item?.price}
                        </Box>
                    </Box>
                </Box>
        </Card>
    )
}

export default OrderItemCard