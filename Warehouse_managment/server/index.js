const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const adminRoute = require('./routes/admin');
const courierRoute = require('./routes/couriers');
const customerRoute = require('./routes/customer');
const managerRoute = require('./routes/manager');
const storeKeeperRoute = require('./routes/storeKeepers');
const brandRoute = require('./routes/brands');
const categoryRoute = require('./routes/categories');
const goodsRoute = require('./routes/catalog/goods');
const tokensRoute = require('./routes/tokens');
const infoRoute = require('./routes/getInfo');
const orderRoute = require('./routes/cartAndOrders/orders');
const dotenv = require('dotenv');

const app = express();
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['https://unishop-admin.netlify.app', 'https://unishop-manager.netlify.app', 'https://gamepark-promo.netlify.app', 
             'https://unishop-courier.netlify.app', 'https://unishop-storemanager.netlify.app', 'http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003',
             'http://localhost:3004', 'http://localhost:3005']
}));

app.use(adminRoute);
app.use(tokensRoute);
app.use(courierRoute);
app.use(customerRoute);
app.use(storeKeeperRoute);
app.use(managerRoute);
app.use(brandRoute);
app.use(categoryRoute);
app.use(goodsRoute);
app.use(infoRoute);
app.use(orderRoute);


app.get('/', (req, res) => {
    res.send('App is running');
})

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
