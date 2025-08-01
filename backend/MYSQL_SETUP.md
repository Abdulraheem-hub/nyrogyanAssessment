# MySQL Setup Instructions

This guide will help you set up MySQL for the Healthcare Website project.

## Option 1: Install MySQL Server Locally

### Windows:
1. Download MySQL from https://dev.mysql.com/downloads/mysql/
2. Install MySQL Server
3. During installation, set a root password (you can leave it empty for development)
4. Start MySQL service

### Using MySQL Command Line:
```bash
# Connect to MySQL
mysql -u root -p

# Create the database
CREATE DATABASE healthcare_db;

# Exit MySQL
exit
```

### Update .env file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=healthcare_db
DB_PORT=3306
```

## Option 2: Use Docker (Recommended for Development)

1. Install Docker Desktop
2. Run MySQL in a container:

```bash
# Run MySQL container
docker run --name healthcare-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=healthcare_db -p 3306:3306 -d mysql:8.0

# Or use docker-compose (create docker-compose.yml):
```

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    container_name: healthcare-mysql
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: healthcare_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

Then run:
```bash
docker-compose up -d
```

Update your .env file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=healthcare_db
DB_PORT=3306
```

## Option 3: Use Online MySQL Service

Services like:
- PlanetScale
- Railway
- AWS RDS
- Google Cloud SQL

Get connection details and update your .env file accordingly.

## Initialize Database

Once MySQL is running:

```bash
# Navigate to backend directory
cd backend

# Initialize database
npm run init-db

# Start the server
npm run dev
```

## Troubleshooting

1. **Connection Refused**: Make sure MySQL is running
2. **Access Denied**: Check your username and password in .env
3. **Database doesn't exist**: Run the init-db script
4. **Port already in use**: Change the port in .env or stop other services using port 3306

## Quick Test

You can test if MySQL is running:

```bash
# Test connection
mysql -h localhost -u root -p

# Or using telnet
telnet localhost 3306
```
