#Erlang

## インストール

apt一発で色々インストールされます。

```
$ sudo apt-get update
$ sudo apt-get install erlang
```

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
