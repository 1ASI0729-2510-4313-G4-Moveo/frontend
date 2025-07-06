#!/bin/bash

# Install json-server globally if not installed
if ! command -v json-server &> /dev/null; then
    echo "Installing json-server..."
    npm install -g json-server
fi

# Start json-server with the database
echo "Starting Moveo API Server..."
echo "API will be available at: http://localhost:3000"
echo "Users endpoint: http://localhost:3000/users"
echo "Cars endpoint: http://localhost:3000/cars"
echo "Bookings endpoint: http://localhost:3000/bookings"
echo ""
echo "Press Ctrl+C to stop the server"

json-server --watch db.json --port 3000 --host 0.0.0.0
