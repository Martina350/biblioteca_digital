require('dotenv').config();

const libroRoutes = require('./routes/libroRoutes');
const authRoutes = require('./routes/authRoutes')
const prestamoRoutes = require('./routes/prestamoRoutes');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;
console.log('PORT from env:', process.env.PORT);
console.log('Using port:', port);
const path = require('path');

const { apiReference } = require('@scalar/express-api-reference');

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5000' || process.env.CORS_ORIGIN, 
    credentials: true
};

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API backend funcionando');
});
app.use('/api', libroRoutes);
app.use('/api', authRoutes);
app.use('/api', prestamoRoutes);
app.use('/docs', apiReference({
     theme: 'purple',
     layout: 'modern',
     spec: {
        url: '/api/openapi.yaml'
     },
     configuration: {
        showSidebar: true,
        hideDownloadButton: false,
        hideTryItPanel: false,
        authentication: {
            preferredSecurityScheme: 'bearerAuth',
            apiKey: {
                token: 'token'
            }
        }
     }
}))

app.get('/api/openapi.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    res.sendFile(path.join(__dirname, '../docs/openapi.yaml'));
})

app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`Documentacion disponible en: http://localhost:${port}/docs`);
});
