# Ranking Setup

## このリポジトリに入れるもの

- `schema.sql`: ランキング用DBテーブル
- `config.toml`: `ranking` Edge Functionを公開APIとして使う設定
- `functions/ranking/index.ts`: ランキング取得とスコア保存API

## 保存しないもの

- ユーザーID
- IPアドレス
- User-Agent
- 端末ID
- ブラウザ指紋
- メールアドレスなどの個人情報

## あなたがやること

1. Supabaseで新しいプロジェクトを作る
2. Supabase SQL Editorで `schema.sql` を実行する
3. Supabase CLIでプロジェクトに接続する

```sh
supabase login
supabase link --project-ref <project-ref>
```

4. Edge Functionの秘密情報を設定する

```sh
supabase secrets set \
  SUPABASE_URL=https://<project-ref>.supabase.co \
  SUPABASE_SERVICE_ROLE_KEY=<service-role-key> \
  APP_ORIGINS=https://24-105.github.io
```

5. Edge Functionをデプロイする

```sh
supabase functions deploy ranking
```

6. デプロイ後のURLを確認する

```txt
https://<project-ref>.supabase.co/functions/v1/ranking
```

このURLをフロント側につなぎます。

## 注意

`SUPABASE_SERVICE_ROLE_KEY` は絶対にGitHub Pagesやフロントエンドへ入れないでください。
フロントへ置いてよいのは、次の接続で使う公開用のFunction URLとPublishable keyだけです。
