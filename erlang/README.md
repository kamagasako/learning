# Erlang

## インストール

apt一発で色々インストールされます。

```
$ sudo apt-get update
$ sudo apt-get install erlang
```

### 最新版のインストール

2016/08/19現在、Debian testingのErlangは最新の19ではなく18で、Debian公式パッケージではexperimentalのみが19です。
そこで、Erlang Solutionsが公開しているパッケージを導入してみましょう。

```
$ wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
$ sudo dpkg -i erlang-solutions_1.0_all.deb
(ダイアログにDebianのバージョンを入力。stableならjessie, testingならstretch, 等)
$ sudo apt-get update
$ sudo apt-get install erlang

$ erl
Erlang/OTP 19 [erts-8.0] [source] [64-bit] [smp:8:8] [async-threads:10] [kernel-poll:false]

Eshell V8.0  (abort with ^G)
1> 
```

無事に19がインストールされました。
ちなみに`apt-cache show erlang`してみると、メンテナはDebian Erlang Packagersってなってます。

確認していませんが、同じ手順でstable (jessie)にもインストールできると思います。

## Emacs設定

1. `M-x list-package`からerlangをインストール
2. ~/.emacs.d/init.elで設定

```
(setq erlang-root-dir "/usr/local/lib/erlang") ; パスは環境に合わせる, debianでは不要
(setq exec-path (cons "/usr/local/lib/erlang/bin" exec-path)) ; 同上
(setq erlang-electric-commands '(erlang-electric-newline))
(require 'erlang-start)
```

`C-c C-z`でバッファを分割してErlangシェル起動、`C-c C-k`でコンパイル、等、便利に使えます。詳細は[erlang-modeのドキュメント](http://erlang.org/doc/man/erlang.el.html)を参照して下さい。

erlang-modeで起動したErlangシェルを終了させる方法ですが、そのままではシェルから抜ける`C-g`はEmacsに取られてしまいます。`C-g`の前に`C-q`を入力してから`C-g [return]`でシェルから抜けて`q`で終了できます。

## ビルドツール rebar3

REPLでは必要ありませんが、Erlangでアプリを実装する場合はビルドツールがあった方が便利です。
私はrebar3を利用しています。Debianのrebarパッケージは3ではなく2ですので、自前でインストールする必要があります。

### インストール

私は下記ページを参考にソースからインストールし、適宜 `rebar3 local upgrade` で更新しています。

https://github.com/erlang/rebar3

### 使い方

http://www.rebar3.org/docs

