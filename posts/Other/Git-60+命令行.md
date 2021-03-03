## 60+ Git常用命令行

### ⭐ 配置操作
```bash
# 全局配置
git config --global user.name 'your name'
git config --global user.email 'your email'

# 当前仓库配置
git config --local user.name 'your name'
git config --local user.email 'your email'


# 查看 global 配置
git config --global --list

# 查看当前仓库配置
git config --local --list

# 删除 global 配置
git config --unset --global TO_BE_DELETED_CONFIG

# 删除 当前仓库 配置
git config --unset --local TO_BE_DELETED_CONFIG
```

### ⭐ 本地操作
```bash
# 查看变更情况
git status

# 将当前目录及其自目录下所有变更都加入到暂存区
git add .

# 将仓库内所有变更添加到暂存区
git add -A

# 将指定文件添加到暂存区
git add 文件1 文件2 文件3

# 比较工作区和暂存区的所有差异
git diff

# 比较某文件工作区和暂存区的差异
git diff 文件1

# 比较暂存区和 HEAD 的所有差异
git diff --cached

# 比较 某文件 暂存区和 HEAD 的差异
git diff --cached 文件1

# 比较某文件 工作区 和 HEAD 的差异
git diff HEAD 文件1

# 创建 commit 
git commit

# 将工作区指定文件 恢复成 和 暂存区一致
git checkout 文件1 文件2 文件3

# 将 暂存区 指定文件 恢复成和 HEAD 一致
git reset 文件1 文件2 文件3

# 将暂存区和工作区所有文件恢复成和 HEAD 一样
git reset --hard

# 用 difftool 比较任意两个 commit的差异
git difftool commit1 commit2

# 查看哪些文件没被 Git 管控
git ls-files --others

# 将未处理完的变更先保存到 stash 中
git stash

# 临时任务处理完后继续之前的工作
git stash pop  # 不保留 stash
git stash apply # 保留 stash

# 查看所有 stash
git stash list

# 取回某次 stash 的变更
git stash pop stash@{数字n}

# 优雅修改最后一次 commit
git add .
git commit --amend
```

### ⭐ 分支操作
```bash
# 查看当前工作分支及本地分支
git branch -v

# 查看本地和远端分支
git branch -av

# 查看院端分支
git branch -rv

# 切换到指定分支
git checkout branch_name

# 基于当前分支创建新分支
git branch new_branch

# 基于指定分支创建新分支
git branch new_branch origin_branch

# 基于某个 commit 创建分支
git branch new_branch some_commit_id

# 基于当前分支创建并切换到该分支
git checkout -b new_branch

# 安全删除本地某分支
git branch -d to_delete_branch

# 强行删除本地某分支
git branch -D to_delete_branch

# 删除已合并到master分支的所有本地分支
git branch --merged master | grep -v '^\*\| master' | xargs -n 1 git branch -d

# 删除 远端origin 已不存在的所有本地分支
git remote prune origin

# 将A分支和入到当前分支且为merge创建commit
git merge branch_A

# 将A分支合入到B分支且为merge创建commit
git merge branch_A branch_B

# 将当前分支基于B分支做rebase, 以便将B分支合入到当前分支
git rebase branch_B

# 将A分支基于B分支做reabse, 以便将B分支合入到A分支
git rebase branch_B branch_A
```

### ⭐ 变更历史
```bash
# 当前分支各个 commit 用一行显示
git log --oneline

# 显示就近的 n 个 commit
git log -n

# 用图示显示所有分支的历史
git log --oneline --graph --all

# 查看涉及到某文件变更的所有 commit
git log 文件

# 某文件各行最后修改对应的 commit 以及作者
git blame 文件
```

### ⭐ 标签操作
```bash
# 查看已有标签
git tag

# 新建标签
git tag new_tag  # git tag v1.0

# 新建带备注标签
git tag -a v1.0 -m "leslie"

# 给指定的commit 打标签
git tag v1.0 commit_id

# 推送一个本地标签
git push origin v1.0 # v1.0是目标tag

# 推送全部未推送过的本地标签
git push origin --tags

# 删除一个本地标签
git tag -d v1.0 # v1.0是目标tag

# 删除一个远端标签
git push origin :refs/tags/v1.0 # v1.0是目标tag
```

### ⭐ 远端交互
```bash
# 查看所有远端仓库
git remote -v

# 添加远端仓库
git remote add url

# 删除远端仓库
git remote remove remote_name

# 重命名远端仓库
git remote rename old_name new_name

# 将远端所有分支和标签的变更都拉到本地
git fetch remote

# 把远端分支的变更拉到本地, 且 merge 到本地分支
git pull origin branch_name

# 把本地分支push到远端
git push origin branch_name

# 删除远端分支
git push remote --delete remote_branch_name
git push remote: remote_branch_name
```