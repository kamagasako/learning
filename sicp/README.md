# sicp

Structure And Interpretation of Computer Programs

## 計算機プログラムの構造と解釈

* 書籍 <http://www.shoeisha.co.jp/book/detail/9784798135984>
* オンライン版
  * 本家 <https://mitpress.mit.edu/sicp/full-text/book/book.html>
  * 邦訳 <http://sicp.iijlab.net/fulltext/>
  * 非公式邦訳 <https://github.com/minghai/sicp-pdf>
* サポートサイト
  * 英語 <https://mitpress.mit.edu/sicp/>
  * 日本語 <http://sicp.iijlab.net/>

## インストール

Scheme処理系は多数ありますが、SICPで学ぶことが目的であればどの処理系でも大差ありません。
ここではgaucheを入れておきます。

```
$ sudo apt-get update
$ sudo apt-get install gauche
```

Macならhomebrewでインストールします。

```
$ brew update
$ brew install gauche
```

### rlwrap

後述のEmacsを使う時は気にしなくてよいのですが、ターミナルでgauche (gosh)を実行する場合、そのままではCtrlキーによる履歴の参照やカーソルの移動などができません。そこでrlwrapをインストールします。

```
$ sudo apt-get install rlwrap
or
$ brew install rlwrap
```

使い方は簡単で、goshの前にrlwrapを置くだけです。

```
$ rlwrap gosh
```

rlwrapがgoshをラップして、コマンドライン履歴やカーソル移動などができるようになります。

## Emacs設定

scheme-modeはデフォルトでインストールされているっぽいです。
~/.emacs.d/init.elを編集します。

```
(setq default-process-coding-system '(utf-8 . utf-8))

(setq scheme-program-name "gosh -i")
(autoload 'scheme-mode "cmuscheme" "Major mode for Scheme." t)
(autoload 'run-scheme "cmuscheme" "Run an inferior Scheme process." t)

```

この設定だけではgosh (gauche)を起動している *scheme*バッファが開きませんのでご注意を。
