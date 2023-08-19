import "./About.scss"
import Banner from '../Banner/Banner'
import { useEffect, useState } from 'react';
import axios from "axios"

export default function About() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('https://api.pujakaitem.com/api/products');
                const productData = response.data;
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        })();
    }, []);

    return (
        <div className='aboutSection'>
            <div className="aboutContent">
                <div className="heroBanner">
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                    <Banner heading={"Babsu Ecommerce"} />
                </div>
            </div>
        </div>
    )
}
