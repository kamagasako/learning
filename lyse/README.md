# lyse
Learn You Some Erlang

## すごいErlangゆかいに学ぼう
* 書籍 <http://shop.ohmsha.co.jp/shop/shopdetail.html?brandcode=000000003873>
* オンライン版 <https://www.ymotongpoo.com/works/lyse-ja/>

## Emacs設定

1. M-x list-packageからerlangをインストール
2. ~/.emacs.d/init.elで設定

```
(require 'erlang-start)
(setq erlang-electric-commands '(erlang-electric-newline))
```
