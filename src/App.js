import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Products, Navbar, Cart, Checkout } from './components'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const fetchProducts = async () => {
        const { data } = await commerce.products.list()

        setProducts(data)
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve()
        setCart(cart)
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }
    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart)
    }
    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    return (
        <div>
            <Router>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route path="/" exact>
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route path="/cart">
                        <Cart cart={cart}

                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route path="/checkout">
                        <Checkout cart={cart} />

                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;


const Container = styled.div`
width:1140px;
margin:0 auto;
`