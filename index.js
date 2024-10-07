import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 2100;
const shop_name = process.env.STORE_NAME;
const token = process.env.API_KEY;

app.post('/product', async (req, res) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://${shop_name}.myshopify.com/admin/api/2023-10/products.json`,
      headers: {
        'X-Shopify-Access-Token' : `${token}`
       }
    };
    
    const response = await axios.request(config);
    const result = await response.data;
    try{
        res.send({
            Status: "Success",
            Data: result
        })
    }catch(error){
        res.send({
            Status:"Failed",
            Message: error.message
        })
    }   
});

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
