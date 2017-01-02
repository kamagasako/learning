# PlayFramework 2.5.x

従来のPlay Frameworkはactivatorを利用していましたが、sbt 0.13.13以降がインストールされている場合はactivatorなしで利用できるようです。

### 新しいプロジェクトファイルの生成

```
$ sbt new playframework/play-scala-seed.g8
...
This template generates a Play Scala project 

name [play-scala-seed]: プロジェクト名(enter)
organization [com.example]: FQDN(enter)
scala_version [2.11.8]: (enter)
scalatestplusplay_version [1.5.1]: (enter)
play_version [2.5.10]: (enter)

Template applied in ./プロジェクト名
```
