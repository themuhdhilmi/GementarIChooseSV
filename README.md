# DEPLOYMENT NOTES

git pull origin main

docker build -t ichoosesv .

docker run -p 3003:3000 --name ichoosesv -d --restart always ichoosesv