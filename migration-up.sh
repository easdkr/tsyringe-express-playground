source .env.development

MIGRATION_DIR="./migrations"

export PGPASSWORD=$POSTGRES_PASSWORD

for dir in $MIGRATION_DIR/*; do
  # 'up.sql' is the migration script
  if [ -f "$dir/up.sql" ]; then
    echo "Running migration: $dir"

    docker exec pg mkdir -p /tmp/$dir
    docker cp $dir/up.sql pg:/tmp/$dir/up.sql
    docker exec -i pg psql -d $POSTGRES_DB -U $POSTGRES_USER -f tmp/$dir/up.sql
  fi
done

unset PGPASSWORD