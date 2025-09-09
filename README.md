# Introduction
suppose to help me in future to setup postgres database and pgAdmin containers easily

### How to take backup from running container
```
# Create backup inside container
docker exec -t your-postgres-container-name \
  pg_basebackup -D /tmp/pg_backup -F tar -z -U replicator -P

# Copy backup from container to host
docker cp your-postgres-container-name:/tmp/pg_backup ./postgres_backup_$(date +%Y%m%d)

# Clean up inside container
docker exec -t your-postgres-container-name rm -rf /tmp/pg_backup
```

### How to restore
I am using DBeaver for resoration from backup