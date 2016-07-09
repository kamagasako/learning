# lyse
Learn You Some Erlang

## すごいErlangゆかいに学ぼう

* 書籍 <http://shop.ohmsha.co.jp/shop/shopdetail.html?brandcode=000000003873>
* オンライン版 <https://www.ymotongpoo.com/works/lyse-ja/>

オンライン版はtypoがあったりするので、気になる方は書籍がお薦めです。

## インストール

apt一発で色々インストールされます。

```
$ sudo apt-get update
$ sudo apt-get install erlang
```

## Emacs設定

1. M-x list-packageからerlangをインストール
2. ~/.emacs.d/init.elで設定

```
(setq erlang-root-dir "/usr/local/lib/erlang") ; パスは環境に合わせる
(setq exec-path (cons "/usr/local/lib/erlang/bin" exec-path)) ; パスは環境に合わせる
(setq erlang-electric-commands '(erlang-electric-newline))
(require 'erlang-start)
```

`C-c C-z`でバッファを分割してErlangシェル起動、`C-u C-k`でコンパイル、等、便利に使えます。詳細は[erlang-modeのドキュメント](http://erlang.org/doc/man/erlang.el.html)を参照して下さい。
