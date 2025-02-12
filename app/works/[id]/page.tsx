import { WorkDetail } from "./WorkDetail";

// 実績データ（実際の実装ではAPIから取得）
const cases = [
  {
    id: "case1",
    title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
    category: "new-business",
    date: "2024.03.15",
    client: "大手自動車メーカー",
    period: "2023年10月〜2024年3月",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    description: "カーシェアリング事業の新規立ち上げにあたり、コンセプト設計からブランディング、マーケティング戦略の構築まで包括的に支援し、サービスローンチを成功に導きました。",
    challenge: `
      • 既存の自動車販売ビジネスとの共存
      • 新しい顧客層（若年層・都市部居住者）の開拓
      • 競合他社との差別化
      • 社内の意思決定プロセスの複雑さ
    `,
    solution: [
      "徹底的な市場調査とターゲットユーザーの分析",
      "独自のブランドアイデンティティとコミュニケーション設計",
      "デジタルとリアルを組み合わせたマーケティング戦略の立案",
      "社内横断プロジェクトチームの組成とファシリテーション",
      "段階的なローンチプランの策定と実行",
    ],
    result: `
      【定量的な成果】
      • サービス開始3ヶ月で会員数10,000人を達成
      • 利用率は当初目標の150%を達成
      • アプリのユーザー評価4.5/5.0を維持
      
      【定性的な成果】
      • ブランド認知度の向上
      • 新規顧客層の開拓に成功
      • 社内の新規事業開発プロセスの確立
    `,
    content: `
      ## プロジェクトの背景

      自動車業界は大きな転換期を迎えており、所有から利用へと消費者の価値観が変化しています。
      このような環境下で、クライアント企業は新たな収益の柱としてカーシェアリング事業への参入を決定しました。

      ![市場調査データ](https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80)

      ## 具体的なアプローチ

      ### 1. 市場調査とターゲット分析

      • 競合分析：既存カーシェアリングサービスの強み・弱みを分析
      • ユーザーリサーチ：潜在顧客へのインタビューとアンケート調査を実施
      • データ分析：利用パターンと需要予測のモデリング

      ### 2. ブランド戦略の構築

      • コアバリューの定義
      • ブランドストーリーの作成
      • ビジュアルアイデンティティの開発

      ![ブランディング](https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80)

      ### 3. サービス設計

      • ユーザージャーニーマップの作成
      • アプリケーションのUX/UI設計
      • 料金体系の設計
      • 運用フローの確立

      > "既存の自動車メーカーの強みを活かしながら、新しい移動体験を提供することで、
      > 若い世代にも支持されるサービスを実現できました。"
      > ― プロジェクトマネージャー

      ### 4. マーケティング戦略

      • デジタルマーケティング施策
        - SNS運用設計
        - インフルエンサーマーケティング
        - SEO/MEO対策

      • オフラインマーケティング施策
        - イベント企画
        - 店舗プロモーション
        - 屋外広告

      ![マーケティング施策](https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80)

      ## 主要な施策例

      <div class="grid grid-cols-2 gap-4 my-8">
        <div>
          <h4>会員獲得キャンペーン</h4>
          • 初回利用無料キャンペーン
          • 紹介プログラムの実施
          • 期間限定特別プラン
        </div>
        <div>
          <h4>利用促進施策</h4>
          • リピーター向けポイントプログラム
          • 長時間利用割引の導入
          • 季節限定モデルの提供
        </div>
      </div>

      ## プロジェクトを通じて得られた知見

      1. 新規事業立ち上げにおける組織横断的な協力体制の重要性
      2. データドリブンな意思決定プロセスの確立
      3. アジャイルな開発・改善サイクルの実現
      4. ユーザーフィードバックの継続的な収集と反映

      <div class="bg-purple-50 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold mb-4">今後の展望</h3>
        <p>
          • サービスエリアの段階的拡大
          • 法人向けプランの開発
          • 電気自動車の導入拡大
          • モビリティサービスとの連携強化
        </p>
      </div>
    `
  },
  {
    id: "case2",
    title: "BtoBマーケティング戦略で受注率35%アップ！製造業の成功事例",
    category: "organization",
    date: "2024.03.10",
    client: "大手IT企業",
    period: "2023年8月〜2024年2月",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
    description: "組織診断から人事制度の見直しまで、包括的な組織改革を支援し、生産性の向上を実現。",
    challenge: "急速な成長に伴う組織の歪みと、従業員エンゲージメントの低下が課題でした。",
    solution: [
      "組織診断と課題の可視化",
      "新人事制度の設計",
      "評価制度の見直し",
      "社内コミュニケーション施策の実施",
    ],
    result: "従業員満足度が30%向上し、離職率を半減することに成功しました。",
  },
  {
    id: "case3",
    title: "広告運用改善でCPA50%削減！アパレルECの実績報告",
    category: "recruitment",
    date: "2024.03.05",
    client: "成長中のベンチャー企業",
    period: "2023年9月〜2024年1月",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80",
    description: "採用戦略の立案から実行まで一貫して支援し、優秀な人材の確保に成功。",
    challenge: "急速な事業拡大に伴う人材確保と、採用体制の整備が課題でした。",
    solution: [
      "採用戦略の策定",
      "採用基準の明確化",
      "面接プロセスの設計",
      "採用担当者の育成支援",
    ],
    result: "6ヶ月で目標の採用数を達成し、定着率90%を実現しました。",
  },
  {
    id: "case4",
    title: "MEO対策で来店客数2倍！飲食チェーンの集客改善事例",
    category: "new-business",
    date: "2024.03.01",
    client: "アパレルD2Cブランド",
    period: "2023年7月〜2024年1月",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80",
    description: "新規顧客獲得とリピート率向上を実現する包括的なデジタルマーケティング戦略を構築。",
    challenge: "競争が激化するD2C市場での差別化と、顧客生涯価値の向上が課題でした。",
    solution: [
      "カスタマージャーニーの再設計",
      "パーソナライズ戦略の導入",
      "LTVを重視したマーケティング施策の展開",
      "CRMシステムの最適化",
    ],
    result: "新規顧客獲得コストを40%削減し、リピート率を25%向上させました。",
  },
  {
    id: "case5",
    title: "コンテンツマーケティングでCVR120%改善！SaaS企業の事例",
    category: "organization",
    date: "2024.02.28",
    client: "テクノロジースタートアップ",
    period: "2023年6月〜2024年2月",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    description: "海外展開に向けた組織体制の見直しと、グローバル人材の育成プログラムを策定。",
    challenge: "急速なグローバル展開に伴う組織体制の整備と、グローバル人材の育成が課題でした。",
    solution: [
      "グローバル組織構造の設計",
      "クロスカルチャーコミュニケーション研修",
      "グローバル人材育成プログラムの構築",
      "評価制度のグローバル標準化",
    ],
    result: "8ヶ国での事業展開を実現し、グローバル人材を50名育成しました。",
  }
];

// 静的パラメータを生成
export function generateStaticParams() {
  return cases.map((item) => ({
    id: item.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const currentCase = cases.find(c => c.id === params.id);
  if (!currentCase) return null;

  const currentIndex = cases.findIndex(c => c.id === params.id);
  const prevCase = cases[currentIndex - 1];
  const nextCase = cases[currentIndex + 1];

  return (
    <WorkDetail
      currentCase={currentCase}
      prevCase={prevCase}
      nextCase={nextCase}
    />
  );
}