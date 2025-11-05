const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 









// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});