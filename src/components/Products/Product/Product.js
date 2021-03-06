import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'
import useStyles from './styles'

const Product = ({ product, onAddToCart }) => {
    // console.log(product)
    const classes = useStyles()
    console.log(product)
    return (
        <Card className={classes.root} >
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <NavLink to="product/:product.id">
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                    </NavLink>
                    <Typography variant="h5" >
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography variant="body2" color="textSecondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>

                <IconButton aria-label="Add To Cart" onClick={() => { onAddToCart(product.id, 1) }}>

                    <AddShoppingCart />
                </IconButton>

            </CardActions>
        </Card >
    )
}

export default Product
