;;; ~/.emacs.el
(setq user-full-name "kamagasako")
(setq user-mail-address "kamagasako@example.com")

; lang
(set-language-environment "Japanese")
(prefer-coding-system 'utf-8)
(set-terminal-coding-system 'utf-8)
(set-keyboard-coding-system 'utf-8)
(set-buffer-file-coding-system 'utf-8)
(set-selection-coding-system 'utf-8)
(setq default-buffer-file-coding-system 'utf-8)
(setq default-file-name-coding-system 'utf-8)
(setq default-process-coding-system '(utf-8 . utf-8))

; misc
(auto-compression-mode t)
(line-number-mode t)
(column-number-mode t)
(tool-bar-mode 0)
(setq ring-bell-function 'ignore)

; 論理行で移動
(setq line-move-visual nil)
; 折り返し
(setq truncate-lines nil)
(setq truncate-partial-width-windows nil)

; frame
(setq initial-frame-alist
      (append (list
	       '(foreground-color . "green")
	       '(background-color . "black")
	       '(border-color     . "black")
	       '(mouse-color      . "white")
	       '(cursor-color     . "red")
	       '(cursor-type      . box)
	       '(width . 120) ;; ウィンドウ幅
	       '(height . 48) ;; ウィンドウの高さ
	       )
	      initial-frame-alist))

; key
(global-set-key "\C-h" 'delete-backward-char)

; color
(global-font-lock-mode t)
; hl-line
(require 'hl-line)
(global-hl-line-mode t)
(cond (window-system
       (make-face 'my-hl-line-face)
       (set-face-background 'region "gray20")
       (set-face-background 'my-hl-line-face "gray10")
       (setq hl-line-face 'my-hl-line-face))
      (t
       (setq hl-line-face 'bold)))

; tab, indent
(setq-default indent-tabs-mode nil)
(setq-default tab-width 8)
(setq-default c-basic-offset 4)

; package
(require 'package)
(add-to-list 'package-archives '("melpa" . "http://melpa.org/packages/"))
(package-initialize)
(when (not package-archive-contents)
  (package-refresh-contents))

; c
(add-hook 'c-mode-hook
          '(lambda ()
             (setq c-basic-offset 2)))

; ensime
(require 'ensime)
(add-hook 'scala-mode-hook 'ensime-scala-mode-hook)
(setq ensime-startup-notification nil)

; erlang
(require 'erlang-start)
(setq erlang-electric-commands '(erlang-electric-newline))

; scheme
(setq scheme-program-name "gosh -i")
(autoload 'scheme-mode "cmuscheme" "Major mode for Scheme." t)
(autoload 'run-scheme "cmuscheme" "Run an inferior Scheme process." t)

; web-mode
(require 'web-mode)
(add-to-list 'auto-mode-alist '("\\.html\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.js\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.php\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.scala\\.html\\'" . web-mode))
(setq web-mode-engines-alist
      '(("razor"    . "\\.scala\\.html\\'")))
(defun my-web-mode-hook ()
  "Hooks for Web mode."
  (setq web-mode-markup-indent-offset 2)
  (setq web-mode-code-indent-offset 2)
  )
(add-hook 'web-mode-hook  'my-web-mode-hook)

; skk
(setq default-input-method "japanese-skk"
      skk-large-jisyo "/usr/share/skk/SKK-JISYO.L"
      skk-use-jisx0201-input-method t)
(global-unset-key "\C-xj")
(global-set-key "\C-x\C-j" 'skk-mode)
(add-hook 'isearch-mode-hook
          #'(lambda ()
              (when (and (boundp 'skk-mode)
                         skk-mode
                         skk-isearch-mode-enable)
                (skk-isearch-mode-setup))))
(add-hook 'isearch-mode-end-hook
          #'(lambda ()
              (when (and (featurep 'skk-isearch)
                         skk-isearch-mode-enable)
                (skk-isearch-mode-cleanup))))
(setq dired-bind-jump nil) ; prevent to start dired

;; malabar-mode
;; http://qiita.com/toshikiw/items/389430db19561307d037
(require 'cedet)
(require 'semantic)
(load "semantic/loaddefs.el")
(semantic-mode 1)
(add-to-list 'load-path "~/.emacs.d/site-lisp/malabar-1.5-SNAPSHOT/lisp")
(require 'malabar-mode)
(when (require 'malabar-mode nil t)
  (setq malabar-groovy-lib-dir (concat user-emacs-directory "site-lisp/malabar-1.5-SNAPSHOT/lib"))
  (add-to-list 'auto-mode-alist '("\\.java\\'" . malabar-mode))
  (setq malabar-import-excluded-classes-regexp-list
        (append '("^java\\.awt\\.*$"
                  "^com\\.sun\\.*$"
                  "^org\\.omg\\.*$")
                malabar-import-excluded-classes-regexp-list))
  (add-hook 'malabar-mode-hook
            (lambda () 
              (setq indent-tabs-mode nil)
              (add-hook 'after-save-hook 'malabar-compile-file-silently
                        nil t)))
  )

; customize
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(column-number-mode t)
 '(tool-bar-mode nil))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(default ((t (:family "東風明朝" :foundry "unknown" :slant normal :weight normal :height 120 :width normal)))))
