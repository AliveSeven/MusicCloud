git add .

git commit -m "first commit"

git remote add origin https://github.com/AliveLeqi/My-Music-Cloud.git

git push -u origin master

git config --global --unset http.proxy
 
git config --global --unset https.proxy

git config --global http.sslVerify "false"
