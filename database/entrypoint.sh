#!/bin/sh

# Check if PB_ADMIN_PASSWORD is SET then create a new admin user
/pb/pocketbase admin delete admin@admin.local > /dev/null 2>&1

if [ -n "$PB_ADMIN_PASSWORD" ]; then
    echo "Creating admin user..."
    /pb/pocketbase admin create admin@admin.local $PB_ADMIN_PASSWORD
else
    echo "PB_ADMIN_PASSWORD is not set. Skipping admin user creation."
fi

/pb/pocketbase serve --http=0.0.0.0:8080 --automigrate --migrationsDir=/pb/pb_migrations
