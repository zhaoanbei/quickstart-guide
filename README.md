# 弃用声明

Lab798 启用了新的目录结构，原内容已移至 [lab798/index](https://github.com/lab798/index) 项目中。

[https://quickstart.org.cn](https://quickstart.org.cn) 访问域名保持不变。


## AWS Quick Start
此项目的主要目的是帮助中国用户快速了解AWS的服务，并且提供常用的快速部署方案。

[点击此处查看](https://quickstart.org.cn)

## 如何提交文档

Quick Start 的主页是借助 [GitBook](https://github.com/GitbookIO/gitbook) 项目将 
Markdown 转化成html展示出来，因此只需要提交可正确显示的Markdown文件即可。

> 注意：必须在[SUMMARY.md](https://github.com/lab798/quickstart-guide/blob/develop/SUMMARY.md)下创建索引，才能在网页中显示出来！

### 提交步骤

* **步骤1**: 将[Quick Start CN](https://github.com/lab798/quickstart-guide)主页项目, 
Fork 到您的 GitHub 账号下，如之前已经 Fork, 请直接进入步骤4.

* **步骤2**: 将您 GitHub 账号下的 QuickStart Repo clone 到本地.

* **步骤3**: 切换到 develop 分支, `git checkout develop`.

* **步骤4**: 从 develop 分支创建新的分支, `git branch <new-branch-name>`, 请尽量使用有意义的分支名称.

* **步骤5**: 切换到新创建的分支, `git checkout <new-branch-new>`.

* **步骤5**: 在新的分支下完成编辑，并提交到您的GitHub.

* **步骤6**: 登录GitHub, 选择Fork出来的Repo, 点击 **New Pull request** 或者 **Compare & pull request**.
  ![](http://cdn.quickstart.org.cn/assets/HowToContribute/new-pull-request.png)
  
* **步骤7**: 选择 **base repository** 为 **lab798/quickstart-guide** 的 **develop** 
分支,选择 **head repository** 为您新创建的分支.
  ![](http://cdn.quickstart.org.cn/assets/HowToContribute/create-pull-request.png)
    
* **步骤8**: 添加 **Pull Request** 描述.

* **步骤9**: 点击 **Create pull request**.


### 如何将源repo下的内容合并到Fork出来的repo下

> 建议每次在新创建分支前，都从源repo获得最新的更新

* **步骤1**: 登录GitHub, 选择您Fork出来的Repo, 点击 **New Pull request**

* **步骤2**: 选择 **base repository** 您的 repo 下的 **develop** 分支,
选择 **head repository** 为 **lab798/quickstart-guide** 的 **develop** 分支。
您可能需要点击 **compare cross forks** 来选择正确的分支。
  ![](http://cdn.quickstart.org.cn/assets/HowToContribute/cross-fork.png)

* **步骤3**: 创建Pull Request, 并Merge.

### 关于图片

文章中的图片请先提交到您的 S3 或者其他图床，并设置成公开访问。当您的内容被合并到源repo 的
master branch后，图片会被下载并保存到统一的S3.
