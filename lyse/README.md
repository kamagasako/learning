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
(require 'erlang-start)
(setq erlang-electric-commands '(erlang-electric-newline))
```
