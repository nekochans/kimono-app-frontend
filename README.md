# kimono-app-frontend
![ci-master](https://github.com/nekochans/kimono-app-frontend/workflows/ci-master/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/nekochans/kimono-app-frontend/badge.svg?branch=master)](https://coveralls.io/github/nekochans/kimono-app-frontend?branch=master)

着物アプリのフロントエンド（仮）

## Storybookについて

CSF（Component Story Format）で記載します。

書き方に関しては下記のドキュメントを参照して下さい。

https://storybook.js.org/docs/formats/component-story-format/

## 環境変数

`.env`を作成し、下記を設定してください。

```
NEXT_PUBLIC_USER_POOL_ID="ローカル環境用のUserPool ID"
NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID="ローカル環境用のUserPoolClientID"
```
