# elixir

## インストール

```
$ sudo apt-get update
$ sudo apt-get install elixir
```

### 最新版インストール

2016/08/19時点で、ElixirのDebian公式パッケージはstretch (testing)からの登場のようで、現stableのjessieにはelixirパッケージが存在しないみたいです。
更に、stretch/sidともにバージョンが1.2.6とちょっと古めです。
Erlang同様、Erlang Solutionsの最新パッケージをインストールしてみましょう。手順はまったく同じです。

```
$ wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
$ sudo dpkg -i erlang-solutions_1.0_all.deb
(ダイアログにDebianのバージョンを入力。stableならjessie, testingならstretch, 等)
$ sudo apt-get update
$ sudo apt-get install erlang

$ iex
Erlang/OTP 19 [erts-8.0] [source] [64-bit] [smp:8:8] [async-threads:10] [kernel-poll:false]

Interactive Elixir (1.3.2) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> 
```

確認していませんが、同じ手順でstable (jessie)にもインストールできると思います。
また、細かいことですが、Erlang Solutions版のElixirは`/usr/local`以下にインストールされます。

## Emacs

`M-x list-package` してelixir-modeをインストール。
Emacsを立ち上げ直してElixirのソースファイル(拡張子 `.ex`)を開くと自動的にelixir-modeになる。

