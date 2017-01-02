# Scala開発環境

## sbt ビルドコマンド

```
$ sudo echo 'deb https://dl.bintray.com/sbt/debian /' >> /etc/apt/sources.list.d/sbt.list
$ sudo apt-get update
$ sudo apt-get install sbt
```

### sbt-coursier

```
$ mkdir -p ~/.sbt/0.13/plugins
$ echo 'addSbtPlugin("io.get-coursier" % "sbt-coursier" % "1.0.0-M15")' >> ~/.sbt/0.13/plugins/build.sbt
```

## ENSIME 統合開発環境

```
$ emacs ~/.emacs.d/init.el

; package
(require 'package)
(add-to-list 'package-archives
             '("melpa" . "http://melpa.org/packages/") t)
(package-initialize)
(when (not package-archive-contents)
  (package-refresh-contents))
```

`M-x list-packages` でパッケージリストを取得、ensime行で `I` でインストールのマークを付け、 `x' でインストール。

```
$ emacs ~/.emacs.d/init.el

; ensime
(require 'ensime)
(setq ensime-startup-notification nil
      ensime-startup-snapshot-notification nil)
```

```
$ echo 'import org.ensime.EnsimeCoursierKeys._' >> ~/.sbt/0.13/global.sbt
$ echo 'ensimeServerVersion in ThisBuild := "2.0.0-SNAPSHOT"' >> ~/.sbt/0.13/global.sbt
$ echo 'addSbtPlugin("org.ensime" % "sbt-ensime" % "1.12.4")' >> ~/.sbt/0.13/plugins/plugins.sbt
$ cd プロジェクトのルートディレクトリ
```

### 設定ファイル生成

```
$ sbt
...
$ ensimeConfig
...
$ exit
```

Emacsでプロジェクト内の拡張子 `.scala` のファイルを開き、 `M-x ensime`
