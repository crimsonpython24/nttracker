```
psql -h myhost -d mydb -U myuser
```

```
\dt
\l
\connect DBNAME
```

```
brew services restart postgresql

brew uninstall postgresql
brew install postgresql@13
brew services start postgresql@13
brew link postgresql@13 --force

psql -d template1;
template1=# CREATE DATABASE warrenwang TEMPLATE template0;
```
