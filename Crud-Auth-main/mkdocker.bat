git fetch
git pull
docker stop zuhair-a3
docker rm zuhair-a3
cd C:\Users\Administrator\Documents\GitHub\Zuhair-WSP3\Crud-Auth-main
docker build -t zuhair-a3 .
docker run -d -p 1427:3000 --name zuhair-a3 zuhair-a3:latest
pause