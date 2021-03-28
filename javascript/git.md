# Git

git 移动分支 git branch -f master HEAD^  将master分支往当前HEAD指针的上一个移动

git 移动HEAD git checkout HEAD^^   
**git cherry-pick 可以把任意提交放在当前HEAD下 比如 git cherry-pick c1 c2，就是将c1,c2移动到当前的HEAD指针下面  c1,c2是代表提交记录的哈希值**   


![](../.gitbook/assets/image%20%289%29.png)

git cherry-pick c1 c2

![](../.gitbook/assets/image%20%2810%29.png)

--------------------------------------------------------------------------------------------------------------------------------------------





**`git rebase -i HEAD~3  意思是  把HEAD指针前三个记录，在HEAD的第前三个指针为基准复制这个三个记录  
这三个记录的顺序，是否删除 都可以被选择`**  


![](../.gitbook/assets/image%20%283%29.png)

                                                                   **git rebase -i HEAD~2**   


![](../.gitbook/assets/image%20%2815%29.png)

--------------------------------------------------------------------------------------------------------------------------------------------





####  **`git rebase main  表示把当前的分支bugFix移动到main分支上面`** 

![](../.gitbook/assets/image%20%282%29.png)

get rebase main后

  


![](../.gitbook/assets/image%20%286%29.png)



