# AWS Quick Start
此项目的主要目的是帮助中国用户快速了解AWS的服务，并且提供常用的快速部署方案。

[点击此处查看](https://chinalabs.github.io/quickstart-guide/)

## 如何提交文档

Quick Start 的主页是借助 [GitBook](https://github.com/GitbookIO/gitbook) 项目将 
Markdown 转化成html展示出来，因此只需要提交可正确显示的Markdown文件即可。

提交文档的步骤如下：

* **步骤1**: 将[Quick Start CN](https://github.com/chinalabs/quickstart-guide)主页项目, 
Fork到您的GitHub账号下，如之前已经Fork, 请直接进入步骤4.
* **步骤2**: 将您GitHub账号下的QuickStart Repo clone到本地.
* **步骤3**: 切换到 develop 分支, `git checkout develop`.
* **步骤4**: 从 develop 分支创建新的分支, `git branch <new-branch-name>`,  
请注意尽量取有意义的分支名称.
* **步骤5**: 切换到新创建的分支, `git checkout <new-branch-new>`.
* **步骤5**: 在新的分支下完成编辑，并提交到您的GitHub.
* **步骤6**: 在GitHub上发起 Pull Request，将您提交的内容合并到源Repo的 **develop** branch. 


### 关于图片

文章中的图片请先提交到您的 S3 或者其他图床，并设置成公开访问。当您的内容被合并到源repo 的
master branch后，图片会被下载并保存到统一的S3.


