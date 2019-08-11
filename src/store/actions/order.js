import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCES,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurderFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data.name)
            dispatch(purchaseBurgerSucces(response.data.name, orderData));
        })
        .catch( error => {
            dispatch(purchaseBurderFail(error))
        });
    };
};

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSucces = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCES,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSucces(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })
    }
}