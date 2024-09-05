import express from 'express'; 
import routes from './routes'; 
import path from 'path';       

// Create an instance of the Express application
const app = express();

// Define the port number on which the server will listen
const port = 3000;   

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up the view engine to use EJS for rendering templates
app.set('view engine', 'ejs');

// Set the directory where EJS templates are stored
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS, JavaScript, images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount the routes under the '/api' path
app.use('/api', routes);

// Define a route for the root URL that renders the home page
app.get('/', (req, res) => {
    res.render('home');
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
