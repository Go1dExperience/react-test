const express  = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
// Connect to mongoose
mongoose.connect(config.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDB();
})
.catch((err) => {
    console.log(err);
});
mongoose.set('useCreateIndex', true);
// App Init
const app = express();
// Body Parser
app.use(express.json());
// Routing
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
// Port
const PORT = process.env.PORT || 3001;
// Listening
app.listen(PORT, () => {
    console.log('Connected');
});