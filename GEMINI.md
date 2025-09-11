# Gemini カスタマイズファイル
## プロジェクト概要
- **目的と種類**: 従業員のシフト管理とスケジューリングを効率化するWebアプリケーション
- **主要な機能**: 
  - ユーザー認証・認可システム
  - シフト作成・編集・削除機能
  - リアルタイム通知システム
  - レポート生成機能
  - モバイル対応UI
## 技術スタック
- **言語**: Python 3.11, TypeScript 5.0, JavaScript ES2022
- **フレームワーク/ライブラリ**: 
  - フロントエンド: React 18, Next.js 14, Tailwind CSS
  - バックエンド: FastAPI, SQLAlchemy, Pydantic
- **パッケージ管理**: poetry (Python), pnpm (Node.js)
- **データベース**: PostgreSQL 15, Redis 7.0 (キャッシュ)
- **環境**: Docker Compose (開発), Kubernetes (本番)
## コーディング規約
- **スタイルガイド**: PEP 8 (Python), Airbnb JavaScript Style Guide
- **フォーマッター**: black (Python), prettier (TypeScript/JavaScript)
- **リンター**: ruff (Python), ESLint (JavaScript/TypeScript)
- **型チェック**: mypy (Python), TypeScript compiler
- **命名規則**: 
  - Python: snake_case (変数・関数), PascalCase (クラス)
  - JavaScript/TypeScript: camelCase (変数・関数), PascalCase (コンポーネント)
## よく使うコマンド
- **依存関係のインストール**: `poetry install && pnpm install`
- **開発サーバーの起動**: `docker-compose up -d && pnpm dev`
- **テストの実行**: `pytest tests/ && pnpm test`
- **ビルド/コンパイル**: `pnpm build`
- **コードのフォーマット/リンティング**: `ruff check . && black . && pnpm lint:fix`
## プロジェクト構造
- **主要なディレクトリ**:
  - `src/client/`: フロントエンドコード（React/Next.js）
  - `src/server/`: バックエンドコード（FastAPI）
  - `tests/`: テストファイル（unit, integration, e2e）
  - `docs/`: API仕様書とプロジェクトドキュメント
  - `config/`: 環境設定ファイル
- **設定ファイル**:
  - `pyproject.toml`: Python依存関係とツール設定
  - `package.json`: Node.js依存関係とスクリプト
  - `docker-compose.yml`: 開発環境設定
## 特定の指示/注意事項
- **開発ワークフロー**: 
  - 新機能: feature/xxx ブランチで開発 → PR作成 → コードレビュー → main マージ
  - バグ修正: fix/xxx ブランチで修正 → テスト実行 → PR作成
- **セキュリティの考慮事項**:
  - 全入力にバリデーション実装必須
  - JWT認証でセッション管理
  - CORS設定の適切な管理
  - SQLインジェクション対策（SQLAlchemy使用）