document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 問題データ ---
    const ALL_QUESTIONS = [
        { id: 1, sentence: "Sakamoto is a ___ of the convenience store.", choices: ["clerk", "doctor", "teacher", "pilot"], correct_answer: "clerk", japanese_translation: "店員", full_sentence_japanese: "坂本はコンビニの店員です。", grammar_info: "名詞。職業を表す。", source_info: "坂本がコンビニで働いていることから" },
        { id: 2, sentence: "Shin is a psychic who can ___ minds.", choices: ["run", "read", "jump", "eat"], correct_answer: "read", japanese_translation: "読む", full_sentence_japanese: "シンは人の心を読める超能力者です。", grammar_info: "動詞。ここでは「（心を）読む」という意味。", source_info: "シンのテレパシー能力から" },
        { id: 3, sentence: "They ___ at the ramen shop after school.", choices: ["study", "play", "meet", "sleep"], correct_answer: "meet", japanese_translation: "会う", full_sentence_japanese: "彼らは放課後、ラーメン屋で会います。", grammar_info: "動詞。「～に会う」は meet with ～ または meet ～。", source_info: "坂本たちがよくラーメン屋に集まることから" },
        { id: 4, sentence: "Lu is very good at ___ kung fu.", choices: ["making", "using", "taking", "drawing"], correct_answer: "using", japanese_translation: "使う", full_sentence_japanese: "ルーはカンフーを使うのがとても上手です。", grammar_info: "動詞。「～するのが上手だ」は be good at -ing。", source_info: "陸少糖（ルー・シャオタン）の戦闘スタイルから" },
        { id: 5, sentence: "He ordered a large ___ of french fries.", choices: ["bowl", "bunch", "plate", "bag"], correct_answer: "bag", japanese_translation: "袋", full_sentence_japanese: "彼はフライドポテトを大袋で注文しました。", grammar_info: "名詞。「a bag of ～」で「～一袋」。", source_info: "坂本がよくポテトを頼むことから" },
        { id: 6, sentence: "The store is ___ from 9 a.m. to 10 p.m.", choices: ["open", "close", "move", "start"], correct_answer: "open", japanese_translation: "開いている", full_sentence_japanese: "その店は午前9時から午後10時まで開いています。", grammar_info: "形容詞。「開いている」状態を表す。", source_info: "基本的な営業時間に関する表現" },
        { id: 7, sentence: "Aoi is a ___ student at school.", choices: ["kind", "fast", "new", "tall"], correct_answer: "kind", japanese_translation: "親切な", full_sentence_japanese: "葵は学校で親切な生徒です。", grammar_info: "形容詞。人の性格を表す。", source_info: "葵の優しい性格から" },
        { id: 8, sentence: "Natsuki is good at ___ information.", choices: ["gathering", "throwing", "breaking", "sending"], correct_answer: "gathering", japanese_translation: "集める", full_sentence_japanese: "夏生は情報を集めるのが得意です。", grammar_info: "動詞。「情報を集める」は gather information。", source_info: "元情報屋としての夏生の能力から" },
        // 新しく追加する単語 (ID 9-58)
        { id: 9, sentence: "Sakamoto always ___ milk at the convenience store.", choices: ["buy", "sell", "drink", "find"], correct_answer: "buy", japanese_translation: "買う", full_sentence_japanese: "坂本はいつもコンビニで牛乳を買います。", grammar_info: "動詞。物を購入する際に使う。", source_info: "英検4級頻出単語" },
        { id: 10, sentence: "Shin likes to ___ ramen with Sakamoto.", choices: ["eat", "cook", "smell", "see"], correct_answer: "eat", japanese_translation: "食べる", full_sentence_japanese: "シンは坂本とラーメンを食べるのが好きです。", grammar_info: "動詞。食事をする際に使う。", source_info: "英検4級頻出単語" },
        { id: 11, sentence: "Lu became a good ___ of Sakamoto and Shin.", choices: ["enemy", "friend", "teacher", "boss"], correct_answer: "friend", japanese_translation: "友達", full_sentence_japanese: "ルーは坂本とシンの良い友達になりました。", grammar_info: "名詞。親しい間柄の人。", source_info: "英検4級頻出単語" },
        { id: 12, sentence: "They often ___ to the public bath together.", choices: ["come", "stay", "go", "sleep"], correct_answer: "go", japanese_translation: "行く", full_sentence_japanese: "彼らはよく一緒に銭湯に行きます。", grammar_info: "動詞。場所へ移動する際に使う。", source_info: "英検4級頻出単語" },
        { id: 13, sentence: "Natsuki doesn't ___ noisy places.", choices: ["like", "hate", "visit", "clean"], correct_answer: "like", japanese_translation: "好き", full_sentence_japanese: "夏生は騒がしい場所が好きではありません。", grammar_info: "動詞。「～が好きではない」は don't like ～。", source_info: "英検4級頻出単語" },
        { id: 14, sentence: "Aoi wants to ___ delicious food for everyone.", choices: ["make", "buy", "throw", "hide"], correct_answer: "make", japanese_translation: "作る", full_sentence_japanese: "葵はみんなのために美味しい料理を作りたいと思っています。", grammar_info: "動詞。何かを創造する際に使う。", source_info: "英検4級頻出単語" },
        { id: 15, sentence: "He likes to ___ manga in his free time.", choices: ["write", "draw", "read", "watch"], correct_answer: "read", japanese_translation: "読む", full_sentence_japanese: "彼は暇な時間に漫画を読むのが好きです。", grammar_info: "動詞。本や文字を読む際に使う。", source_info: "英検4級頻出単語" },
        { id: 16, sentence: "You can ___ many strange people in Shinjuku.", choices: ["hear", "see", "touch", "smell"], correct_answer: "see", japanese_translation: "見る", full_sentence_japanese: "新宿では多くの奇妙な人々を見ることができます。", grammar_info: "動詞。目で何かを認識する際に使う。", source_info: "英検4級頻出単語" },
        { id: 17, sentence: "Even assassins need to ___ new skills.", choices: ["study", "play", "forget", "teach"], correct_answer: "study", japanese_translation: "勉強する", full_sentence_japanese: "暗殺者でさえ新しいスキルを勉強する必要があります。", grammar_info: "動詞。知識を習得する際に使う。", source_info: "英検4級頻出単語" },
        { id: 18, sentence: "Akira ___ to become a strong assassin like Sakamoto.", choices: ["wants", "hates", "tries", "needs"], correct_answer: "wants", japanese_translation: "欲しい", full_sentence_japanese: "晶は坂本のような強い暗殺者になりたいと思っています。", grammar_info: "動詞。「～したい」は want to ～。", source_info: "英検4級頻出単語" },
        { id: 19, sentence: "Sakamoto is very ___ at fighting.", choices: ["good", "bad", "slow", "weak"], correct_answer: "good", japanese_translation: "上手な", full_sentence_japanese: "坂本は戦うのがとても上手です。", grammar_info: "形容詞。「～が上手だ」は be good at ～。", source_info: "英検4級頻出単語" },
        { id: 20, sentence: "Shin has a special ___ to read minds.", choices: ["power", "car", "book", "food"], correct_answer: "power", japanese_translation: "力", full_sentence_japanese: "シンは人の心を読める特別な力を持っています。", grammar_info: "名詞。能力や権力を表す。", source_info: "英検4級頻出単語" },
        { id: 21, sentence: "Lu came to Japan from ___.", choices: ["China", "America", "Korea", "France"], correct_answer: "China", japanese_translation: "中国", full_sentence_japanese: "ルーは中国から日本に来ました。", grammar_info: "名詞。国名。", source_info: "英検4級頻出単語" },
        { id: 22, sentence: "They often ___ coffee at the cafe.", choices: ["drink", "make", "sell", "buy"], correct_answer: "drink", japanese_translation: "飲む", full_sentence_japanese: "彼らはよくカフェでコーヒーを飲みます。", grammar_info: "動詞。液体を摂取する際に使う。", source_info: "英検4級頻出単語" },
        { id: 23, sentence: "Aoi is a ___ girl.", choices: ["pretty", "ugly", "sad", "angry"], correct_answer: "pretty", japanese_translation: "かわいい", full_sentence_japanese: "葵はかわいい女の子です。", grammar_info: "形容詞。見た目を表す。", source_info: "英検4級頻出単語" },
        { id: 24, sentence: "Natsuki uses his ___ to find information.", choices: ["computer", "phone", "car", "bike"], correct_answer: "computer", japanese_translation: "コンピューター", full_sentence_japanese: "夏生は情報を探すためにコンピューターを使います。", grammar_info: "名詞。情報処理に使う機器。", source_info: "英検4級頻出単語" },
        { id: 25, sentence: "Sakamoto's ___ is very strong.", choices: ["punch", "kick", "voice", "hair"], correct_answer: "punch", japanese_translation: "パンチ", full_sentence_japanese: "坂本のパンチはとても強いです。", grammar_info: "名詞。拳で打つこと。", source_info: "英検4級頻出単語" },
        { id: 26, sentence: "Shin can ___ the future sometimes.", choices: ["see", "hear", "smell", "taste"], correct_answer: "see", japanese_translation: "見る", full_sentence_japanese: "シンは時々未来を見ることができます。", grammar_info: "動詞。目で認識する。", source_info: "英検4級頻出単語" },
        { id: 27, sentence: "They ___ a lot of money from their jobs.", choices: ["earn", "lose", "spend", "save"], correct_answer: "earn", japanese_translation: "稼ぐ", full_sentence_japanese: "彼らは仕事でたくさんのお金を稼ぎます。", grammar_info: "動詞。労働の対価として得る。", source_info: "英検4級頻出単語" },
        { id: 28, sentence: "Lu wants to ___ stronger.", choices: ["become", "stay", "feel", "look"], correct_answer: "become", japanese_translation: "なる", full_sentence_japanese: "ルーはもっと強くなりたいと思っています。", grammar_info: "動詞。「～になる」という意味。", source_info: "英検4級頻出単語" },
        { id: 29, sentence: "The convenience store is ___ the ramen shop.", choices: ["near", "far", "behind", "under"], correct_answer: "near", japanese_translation: "近い", full_sentence_japanese: "コンビニはラーメン屋の近くにあります。", grammar_info: "形容詞。距離が近いことを表す。", source_info: "英検4級頻出単語" },
        { id: 30, sentence: "Aoi helps Sakamoto ___ the store.", choices: ["clean", "open", "close", "build"], correct_answer: "clean", japanese_translation: "掃除する", full_sentence_japanese: "葵は坂本が店を掃除するのを手伝います。", grammar_info: "動詞。清潔にする。", source_info: "英検4級頻出単語" },
        { id: 31, sentence: "Natsuki has a very ___ memory.", choices: ["good", "bad", "short", "long"], correct_answer: "good", japanese_translation: "良い", full_sentence_japanese: "夏生はとても良い記憶力を持っています。", grammar_info: "形容詞。質が良いことを表す。", source_info: "英検4級頻出単語" },
        { id: 32, sentence: "Sakamoto used to be a ___ assassin.", choices: ["legendary", "weak", "new", "young"], correct_answer: "legendary", japanese_translation: "伝説的な", full_sentence_japanese: "坂本はかつて伝説的な暗殺者でした。", grammar_info: "形容詞。伝説になるほど有名な。", source_info: "英検4級頻出単語" },
        { id: 33, sentence: "Shin often ___ about his future.", choices: ["thinks", "sleeps", "eats", "plays"], correct_answer: "thinks", japanese_translation: "考える", full_sentence_japanese: "シンはよく自分の未来について考えます。", grammar_info: "動詞。思考する。", source_info: "英検4級頻出単語" },
        { id: 34, sentence: "They ___ to the mountains for training.", choices: ["went", "came", "stayed", "ran"], correct_answer: "went", japanese_translation: "行った", full_sentence_japanese: "彼らは訓練のために山へ行きました。", grammar_info: "動詞。goの過去形。", source_info: "英検4級頻出単語" },
        { id: 35, sentence: "Lu is learning Japanese ___.", choices: ["hard", "easy", "slowly", "quickly"], correct_answer: "hard", japanese_translation: "熱心に", full_sentence_japanese: "ルーは日本語を熱心に勉強しています。", grammar_info: "副詞。一生懸命に。", source_info: "英検4級頻出単語" },
        { id: 36, sentence: "The ramen is very ___.", choices: ["delicious", "bad", "cold", "hot"], correct_answer: "delicious", japanese_translation: "おいしい", full_sentence_japanese: "そのラーメンはとてもおいしいです。", grammar_info: "形容詞。味が良い。", source_info: "英検4級頻出単語" },
        { id: 37, sentence: "Aoi has a ___ heart.", choices: ["kind", "cold", "strong", "weak"], correct_answer: "kind", japanese_translation: "優しい", full_sentence_japanese: "葵は優しい心を持っています。", grammar_info: "形容詞。性格が優しい。", source_info: "英検4級頻出単語" },
        { id: 38, sentence: "Natsuki can ___ many languages.", choices: ["speak", "write", "read", "hear"], correct_answer: "speak", japanese_translation: "話す", full_sentence_japanese: "夏生は多くの言語を話すことができます。", grammar_info: "動詞。言葉を発する。", source_info: "英検4級頻出単語" },
        { id: 39, sentence: "Sakamoto is a very ___ person now.", choices: ["calm", "angry", "sad", "happy"], correct_answer: "calm", japanese_translation: "穏やかな", full_sentence_japanese: "坂本は今、とても穏やかな人です。", grammar_info: "形容詞。落ち着いている。", source_info: "英検4級頻出単語" },
        { id: 40, sentence: "Shin wants to ___ his master.", choices: ["find", "lose", "forget", "help"], correct_answer: "find", japanese_translation: "見つける", full_sentence_japanese: "シンは彼の師匠を見つけたいと思っています。", grammar_info: "動詞。何かを発見する。", source_info: "英検4級頻出単語" },
        { id: 41, sentence: "They ___ a new mission today.", choices: ["have", "don't have", "finish", "start"], correct_answer: "have", japanese_translation: "持っている", full_sentence_japanese: "彼らは今日、新しい任務を持っています。", grammar_info: "動詞。所有する。", source_info: "英検4級頻出単語" },
        { id: 42, sentence: "Lu is very ___ about her training.", choices: ["serious", "lazy", "funny", "sad"], correct_answer: "serious", japanese_translation: "真剣な", full_sentence_japanese: "ルーは訓練にとても真剣です。", grammar_info: "形容詞。真面目な。", source_info: "英検4級頻出単語" },
        { id: 43, sentence: "The store is always ___ with customers.", choices: ["busy", "empty", "quiet", "small"], correct_answer: "busy", japanese_translation: "忙しい", full_sentence_japanese: "その店はいつも客で忙しいです。", grammar_info: "形容詞。混雑している。", source_info: "英検4級頻出単語" },
        { id: 44, sentence: "Aoi likes to ___ in the kitchen.", choices: ["cook", "sleep", "read", "play"], correct_answer: "cook", japanese_translation: "料理する", full_sentence_japanese: "葵は台所で料理するのが好きです。", grammar_info: "動詞。食事を作る。", source_info: "英検4級頻出単語" },
        { id: 45, sentence: "Natsuki can ___ secrets very well.", choices: ["keep", "tell", "share", "forget"], correct_answer: "keep", japanese_translation: "保つ", full_sentence_japanese: "夏生は秘密をとても上手に保つことができます。", grammar_info: "動詞。「秘密を守る」は keep a secret。", source_info: "英検4級頻出単語" },
        { id: 46, sentence: "Sakamoto is a ___ father to Hana.", choices: ["loving", "strict", "bad", "young"], correct_answer: "loving", japanese_translation: "愛情深い", full_sentence_japanese: "坂本はハナにとって愛情深い父親です。", grammar_info: "形容詞。愛情がある。", source_info: "英検4級頻出単語" },
        { id: 47, sentence: "Shin has a ___ dream.", choices: ["big", "small", "bad", "funny"], correct_answer: "big", japanese_translation: "大きな", full_sentence_japanese: "シンは大きな夢を持っています。", grammar_info: "形容詞。サイズが大きい。", source_info: "英検4級頻出単語" },
        { id: 48, sentence: "They ___ to help people.", choices: ["try", "fail", "refuse", "forget"], correct_answer: "try", japanese_translation: "試みる", full_sentence_japanese: "彼らは人々を助けようとします。", grammar_info: "動詞。「～しようと試みる」は try to ～。", source_info: "英検4級頻出単語" },
        { id: 49, sentence: "Lu is very ___ about her future.", choices: ["hopeful", "sad", "angry", "tired"], correct_answer: "hopeful", japanese_translation: "希望に満ちた", full_sentence_japanese: "ルーは自分の未来にとても希望に満ちています。", grammar_info: "形容詞。希望を持っている。", source_info: "英検4級頻出単語" },
        { id: 50, sentence: "The city is very ___ at night.", choices: ["bright", "dark", "quiet", "cold"], correct_answer: "bright", japanese_translation: "明るい", full_sentence_japanese: "夜の街はとても明るいです。", grammar_info: "形容詞。光が多い。", source_info: "英検4級頻出単語" },
        { id: 51, sentence: "Sakamoto has a ___ family.", choices: ["happy", "sad", "small", "big"], correct_answer: "happy", japanese_translation: "幸せな", full_sentence_japanese: "坂本には幸せな家族がいます。", grammar_info: "形容詞。幸福な状態。", source_info: "英検4級頻出単語" },
        { id: 52, sentence: "Shin can ___ people's thoughts.", choices: ["hear", "see", "touch", "smell"], correct_answer: "hear", japanese_translation: "聞く", full_sentence_japanese: "シンは人々の考えを聞くことができます。", grammar_info: "動詞。音を耳で捉える。", source_info: "英検4級頻出単語" },
        { id: 53, sentence: "They ___ to the park every Sunday.", choices: ["go", "come", "stay", "run"], correct_answer: "go", japanese_translation: "行く", full_sentence_japanese: "彼らは毎週日曜日に公園に行きます。", grammar_info: "動詞。移動する。", source_info: "英検4級頻出単語" },
        { id: 54, sentence: "Lu wants to ___ her skills.", choices: ["improve", "forget", "hide", "lose"], correct_answer: "improve", japanese_translation: "向上させる", full_sentence_japanese: "ルーは自分のスキルを向上させたいと思っています。", grammar_info: "動詞。より良くする。", source_info: "英検4級頻出単語" },
        { id: 55, sentence: "The store sells many ___ things.", choices: ["useful", "useless", "old", "new"], correct_answer: "useful", japanese_translation: "役立つ", full_sentence_japanese: "その店は多くの役立つものを売っています。", grammar_info: "形容詞。役に立つ。", source_info: "英検4級頻出単語" },
        { id: 56, sentence: "Aoi is very ___ about her cooking.", choices: ["careful", "careless", "fast", "slow"], correct_answer: "careful", japanese_translation: "注意深い", full_sentence_japanese: "葵は料理にとても注意深いです。", grammar_info: "形容詞。慎重な。", source_info: "英検4級頻出単語" },
        { id: 57, sentence: "Natsuki has a ___ for finding things.", choices: ["talent", "problem", "hobby", "job"], correct_answer: "talent", japanese_translation: "才能", full_sentence_japanese: "夏生は物を見つける才能があります。", grammar_info: "名詞。特別な能力。", source_info: "英検4級頻出単語" },
        { id: 58, sentence: "Sakamoto is a ___ husband.", choices: ["good", "bad", "lazy", "busy"], correct_answer: "good", japanese_translation: "良い", full_sentence_japanese: "坂本は良い夫です。", grammar_info: "形容詞。質が良い。", source_info: "英検4級頻出単語" },
        { id: 59, sentence: "Shin often ___ about his past.", choices: ["dreams", "forgets", "remembers", "talks"], correct_answer: "dreams", japanese_translation: "夢を見る", full_sentence_japanese: "シンはよく自分の過去について夢を見ます。", grammar_info: "動詞。夢を見る。", source_info: "英検4級頻出単語" },
        { id: 60, sentence: "They ___ to the beach last summer.", choices: ["went", "came", "stayed", "played"], correct_answer: "went", japanese_translation: "行った", full_sentence_japanese: "彼らは去年の夏、ビーチへ行きました。", grammar_info: "動詞。goの過去形。", source_info: "英検4級頻出単語" },
        { id: 61, sentence: "Lu is very ___ to learn new things.", choices: ["eager", "unwilling", "afraid", "tired"], correct_answer: "eager", japanese_translation: "熱心な", full_sentence_japanese: "ルーは新しいことを学ぶのにとても熱心です。", grammar_info: "形容詞。意欲的な。", source_info: "英検4級頻出単語" },
        { id: 62, sentence: "The food at the ramen shop is always ___.", choices: ["hot", "cold", "old", "new"], correct_answer: "hot", japanese_translation: "熱い", full_sentence_japanese: "ラーメン屋の食べ物はいつも熱いです。", grammar_info: "形容詞。温度が高い。", source_info: "英検4級頻出単語" },
        { id: 63, sentence: "Aoi has a ___ smile.", choices: ["beautiful", "sad", "angry", "fake"], correct_answer: "beautiful", japanese_translation: "美しい", full_sentence_japanese: "葵は美しい笑顔を持っています。", grammar_info: "形容詞。見た目が良い。", source_info: "英検4級頻出単語" },
        { id: 64, sentence: "Natsuki can ___ many difficult problems.", choices: ["solve", "create", "ignore", "hide"], correct_answer: "solve", japanese_translation: "解決する", full_sentence_japanese: "夏生は多くの難しい問題を解決することができます。", grammar_info: "動詞。問題を解く。", source_info: "英検4級頻出単語" },
        { id: 65, sentence: "Sakamoto is a ___ father to Hana.", choices: ["caring", "strict", "lazy", "busy"], correct_answer: "caring", japanese_translation: "思いやりのある", full_sentence_japanese: "坂本はハナにとって思いやりのある父親です。", grammar_info: "形容詞。気遣いができる。", source_info: "英検4級頻出単語" },
        { id: 66, sentence: "Shin wants to ___ his past.", choices: ["change", "forget", "remember", "hide"], correct_answer: "change", japanese_translation: "変える", full_sentence_japanese: "シンは自分の過去を変えたいと思っています。", grammar_info: "動詞。変化させる。", source_info: "英検4級頻出単語" },
        { id: 67, sentence: "They ___ to work every morning.", choices: ["walk", "drive", "run", "fly"], correct_answer: "walk", japanese_translation: "歩く", full_sentence_japanese: "彼らは毎朝仕事に歩いて行きます。", grammar_info: "動詞。徒歩で移動する。", source_info: "英検4級頻出単語" },
        { id: 68, sentence: "Lu is very ___ about her future.", choices: ["positive", "negative", "sad", "angry"], correct_answer: "positive", japanese_translation: "前向きな", full_sentence_japanese: "ルーは自分の未来にとても前向きです。", grammar_info: "形容詞。肯定的。", source_info: "英検4級頻出単語" },
        // 50語追加 (ID 69-118)
        { id: 69, sentence: "Sakamoto arrived ___ in time to save Shin.", choices: ["just", "late", "early", "never"], correct_answer: "just", japanese_translation: "ちょうど", full_sentence_japanese: "坂本はシンを救うのにちょうど間に合った。", grammar_info: "副詞。「ちょうど」「まさに」という意味。", source_info: "英検4級頻出単語" },
        { id: 70, sentence: "Lu is learning the Japanese ___ very quickly.", choices: ["language", "food", "music", "history"], correct_answer: "language", japanese_translation: "言語", full_sentence_japanese: "ルーは日本語をとても早く学んでいる。", grammar_info: "名詞。「言語」という意味。", source_info: "英検4級頻出単語" },
        { id: 71, sentence: "Natsuki found a secret document in the city ___.", choices: ["library", "park", "store", "school"], correct_answer: "library", japanese_translation: "図書館", full_sentence_japanese: "夏生は市立図書館で秘密の書類を見つけた。", grammar_info: "名詞。「図書館」という意味。", source_info: "英検4級頻出単語" },
        { id: 72, sentence: "Gaku has a ___ sword.", choices: ["large", "small", "new", "old"], correct_answer: "large", japanese_translation: "大きい", full_sentence_japanese: "ガクは大きな刀を持っている。", grammar_info: "形容詞。「大きい」という意味。", source_info: "英検4級頻出単語" },
        { id: 73, sentence: "Hana goes to elementary ___ every day.", choices: ["school", "park", "store", "hospital"], correct_answer: "school", japanese_translation: "学校", full_sentence_japanese: "ハナは毎日小学校に通っている。", grammar_info: "名詞。「学校」という意味。", source_info: "英検4級頻出単語" },
        { id: 74, sentence: "Sakamoto sent a package from the ___.", choices: ["post office", "bank", "hospital", "restaurant"], correct_answer: "post office", japanese_translation: "郵便局", full_sentence_japanese: "坂本は郵便局から荷物を送った。", grammar_info: "名詞句。「郵便局」という意味。", source_info: "英検4級頻出単語" },
        { id: 75, sentence: "Shin waited for Lu at the train ___.", choices: ["station", "airport", "bus stop", "port"], correct_answer: "station", japanese_translation: "駅", full_sentence_japanese: "シンは駅でルーを待った。", grammar_info: "名詞。「駅」という意味。", source_info: "英検4級頻出単語" },
        { id: 76, sentence: "Sakamoto's secret ___ is collecting rare snacks.", choices: ["hobby", "job", "dream", "problem"], correct_answer: "hobby", japanese_translation: "趣味", full_sentence_japanese: "坂本の秘密の趣味は珍しいお菓子を集めることだ。", grammar_info: "名詞。「趣味」という意味。", source_info: "英検4級頻出単語" },
        { id: 77, sentence: "There are many ___ assassins in the world.", choices: ["other", "same", "few", "no"], correct_answer: "other", japanese_translation: "ほかの", full_sentence_japanese: "世界には他にも多くの暗殺者がいる。", grammar_info: "形容詞。「他の」という意味。", source_info: "英検4級頻出単語" },
        { id: 78, sentence: "Many ___ visit Sakamoto's convenience store.", choices: ["people", "animals", "cars", "trees"], correct_answer: "people", japanese_translation: "人々", full_sentence_japanese: "多くの人々が坂本のコンビニを訪れる。", grammar_info: "名詞。複数形。", source_info: "英検4級頻出単語" },
        { id: 79, sentence: "The fight will ___ soon.", choices: ["end", "start", "continue", "stop"], correct_answer: "end", japanese_translation: "終わる", full_sentence_japanese: "戦いはすぐに終わるだろう。", grammar_info: "動詞。「終わる」という意味。名詞で「終わり」という意味もある。", source_info: "英検4級頻出単語" },
        { id: 80, sentence: "This is the ___ piece of ramen.", choices: ["last", "first", "next", "only"], correct_answer: "last", japanese_translation: "最後の", full_sentence_japanese: "これが最後のラーメンだ。", grammar_info: "形容詞。「最後の」「この前の」という意味。", source_info: "英検4級頻出単語" },
        { id: 81, sentence: "What did Sakamoto ___ to Shin?", choices: ["say", "do", "go", "eat"], correct_answer: "say", japanese_translation: "言う", full_sentence_japanese: "坂本はシンに何と言った？", grammar_info: "動詞。「言う」という意味。", source_info: "英検4級頻出単語" },
        { id: 82, sentence: "They ___ about their mission every night.", choices: ["talk", "sing", "dance", "sleep"], correct_answer: "talk", japanese_translation: "話す", full_sentence_japanese: "彼らは毎晩任務について話す。", grammar_info: "動詞。「話す」という意味。", source_info: "英検4級頻出単語" },
        { id: 83, sentence: "Shin asked a difficult ___.", choices: ["question", "answer", "problem", "solution"], correct_answer: "question", japanese_translation: "質問", full_sentence_japanese: "シンは難しい質問をした。", grammar_info: "名詞。「質問」という意味。", source_info: "英検4級頻出単語" },
        { id: 84, sentence: "Sakamoto always ___ about his family.", choices: ["thinks", "forgets", "hates", "ignores"], correct_answer: "thinks", japanese_translation: "思う、考える", full_sentence_japanese: "坂本はいつも家族のことを考える。", grammar_info: "動詞。「思う」「考える」という意味。", source_info: "英検4級頻出単語" },
        { id: 85, sentence: "Sakamoto is a strong ___.", choices: ["father", "mother", "brother", "sister"], correct_answer: "father", japanese_translation: "父親", full_sentence_japanese: "坂本は強い父親だ。", grammar_info: "名詞。「父親」という意味。", source_info: "英検4級頻出単語" },
        { id: 86, sentence: "There are many strange ___ in the forest.", choices: ["animals", "plants", "rocks", "cars"], correct_answer: "animals", japanese_translation: "動物", full_sentence_japanese: "森には多くの奇妙な動物がいる。", grammar_info: "名詞。「動物」という意味。", source_info: "英検4級頻出単語" },
        { id: 87, sentence: "Please ___ my question.", choices: ["answer", "ask", "ignore", "forget"], correct_answer: "answer", japanese_translation: "答える", full_sentence_japanese: "私の質問に答えてください。", grammar_info: "動詞。「答える」という意味。名詞で「答え」という意味もある。", source_info: "英検4級頻出単語" },
        { id: 88, sentence: "That's the ___ way to fight.", choices: ["right", "wrong", "slow", "fast"], correct_answer: "right", japanese_translation: "正しい", full_sentence_japanese: "それが正しい戦い方だ。", grammar_info: "形容詞。「正しい」という意味。", source_info: "英検4級頻出単語" },
        { id: 89, sentence: "The fight was very ___.", choices: ["exciting", "boring", "sad", "calm"], correct_answer: "exciting", japanese_translation: "興奮させる", full_sentence_japanese: "その戦いはとても興奮させるものだった。", grammar_info: "形容詞。「興奮させる」という意味。", source_info: "英検4級頻出単語" },
        { id: 90, sentence: "The ___ is shining brightly today.", choices: ["sun", "moon", "star", "cloud"], correct_answer: "sun", japanese_translation: "太陽", full_sentence_japanese: "今日は太陽が明るく輝いている。", grammar_info: "名詞。「太陽」という意味。", source_info: "英検4級頻出単語" },
        { id: 91, sentence: "He learned a new English ___.", choices: ["word", "number", "song", "game"], correct_answer: "word", japanese_translation: "言葉", full_sentence_japanese: "彼は新しい英単語を学んだ。", grammar_info: "名詞。「言葉」「単語」という意味。", source_info: "英検4級頻出単語" },
        { id: 92, sentence: "I ___ what you mean.", choices: ["see", "hear", "feel", "taste"], correct_answer: "see", japanese_translation: "分かる", full_sentence_japanese: "あなたの言いたいことが分かります。", grammar_info: "動詞。「見る」の他に「分かる」「理解する」という意味もある。", source_info: "英検4級頻出単語" },
        { id: 93, sentence: "This manga is very ___.", choices: ["interesting", "boring", "difficult", "easy"], correct_answer: "interesting", japanese_translation: "面白い", full_sentence_japanese: "この漫画はとても面白い。", grammar_info: "形容詞。「面白い」という意味。", source_info: "英検4級頻出単語" },
        { id: 94, sentence: "Can you ___ his face?", choices: ["remember", "forget", "draw", "hide"], correct_answer: "remember", japanese_translation: "思い出す", full_sentence_japanese: "彼の顔を思い出せますか？", grammar_info: "動詞。「思い出す」「覚えている」という意味。", source_info: "英検4級頻出単語" },
        { id: 95, sentence: "Sakamoto Days is a very ___ manga.", choices: ["popular", "unpopular", "old", "new"], correct_answer: "popular", japanese_translation: "人気のある", full_sentence_japanese: "SAKAMOTO DAYSはとても人気のある漫画だ。", grammar_info: "形容詞。「人気のある」という意味。", source_info: "英検4級頻出単語" },
        { id: 96, sentence: "Shin can run very ___.", choices: ["fast", "slow", "loud", "quiet"], correct_answer: "fast", japanese_translation: "速い", full_sentence_japanese: "シンはとても速く走れる。", grammar_info: "形容詞・副詞。「速い」「速く」という意味。", source_info: "英検4級頻出単語" },
        { id: 97, sentence: "He is a ___ boy.", choices: ["kind", "mean", "lazy", "busy"], correct_answer: "kind", japanese_translation: "親切な", full_sentence_japanese: "彼は親切な少年です。", grammar_info: "形容詞。人の性格を表す。", source_info: "英検4級頻出単語" },
        { id: 98, sentence: "She has a ___ voice.", choices: ["beautiful", "ugly", "loud", "quiet"], correct_answer: "beautiful", japanese_translation: "美しい", full_sentence_japanese: "彼女は美しい声を持っています。", grammar_info: "形容詞。見た目や音の美しさを表す。", source_info: "英検4級頻出単語" },
        { id: 99, sentence: "They ___ to the park.", choices: ["walk", "run", "fly", "swim"], correct_answer: "walk", japanese_translation: "歩く", full_sentence_japanese: "彼らは公園へ歩いて行きます。", grammar_info: "動詞。徒歩で移動する。", source_info: "英検4級頻出単語" },
        { id: 100, sentence: "He can ___ English.", choices: ["speak", "write", "read", "hear"], correct_answer: "speak", japanese_translation: "話す", full_sentence_japanese: "彼は英語を話すことができます。", grammar_info: "動詞。言葉を発する。", source_info: "英検4級頻出単語" },
        { id: 101, sentence: "I ___ a new book.", choices: ["have", "don't have", "want", "need"], correct_answer: "have", japanese_translation: "持っている", full_sentence_japanese: "私は新しい本を持っています。", grammar_info: "動詞。所有する。", source_info: "英検4級頻出単語" },
        { id: 102, sentence: "She ___ to be a doctor.", choices: ["wants", "hates", "tries", "needs"], correct_answer: "wants", japanese_translation: "～したい", full_sentence_japanese: "彼女は医者になりたいと思っています。", grammar_info: "動詞。「～したい」は want to ～。", source_info: "英検4級頻出単語" },
        { id: 103, sentence: "He is very ___.", choices: ["tall", "short", "fat", "thin"], correct_answer: "tall", japanese_translation: "背が高い", full_sentence_japanese: "彼はとても背が高いです。", grammar_info: "形容詞。身長が高い。", source_info: "英検4級頻出単語" },
        { id: 104, sentence: "It is a ___ day.", choices: ["sunny", "rainy", "cloudy", "windy"], correct_answer: "sunny", japanese_translation: "晴れた", full_sentence_japanese: "晴れた日です。", grammar_info: "形容詞。天気を表す。", source_info: "英検4級頻出単語" },
        { id: 105, sentence: "She has a ___ cat.", choices: ["cute", "ugly", "big", "small"], correct_answer: "cute", japanese_translation: "かわいい", full_sentence_japanese: "彼女はかわいい猫を飼っています。", grammar_info: "形容詞。愛らしい。", source_info: "英検4級頻出単語" },
        { id: 106, sentence: "He is a ___ student.", choices: ["good", "bad", "lazy", "busy"], correct_answer: "good", japanese_translation: "良い", full_sentence_japanese: "彼は良い生徒です。", grammar_info: "形容詞。質が良い。", source_info: "英検4級頻出単語" },
        { id: 107, sentence: "She can ___ the piano.", choices: ["play", "sing", "dance", "read"], correct_answer: "play", japanese_translation: "演奏する", full_sentence_japanese: "彼女はピアノを演奏できます。", grammar_info: "動詞。楽器を演奏する。", source_info: "英検4級頻出単語" },
        { id: 108, sentence: "He is ___ in Japan.", choices: ["from", "to", "at", "in"], correct_answer: "from", japanese_translation: "～出身", full_sentence_japanese: "彼は日本出身です。", grammar_info: "前置詞。「～出身」は be from ～。", source_info: "英検4級頻出単語" },
        { id: 109, sentence: "She is ___ years old.", choices: ["ten", "twenty", "thirty", "forty"], correct_answer: "ten", japanese_translation: "10", full_sentence_japanese: "彼女は10歳です。", grammar_info: "数詞。年齢を表す。", source_info: "英検4級頻出単語" },
        { id: 110, sentence: "He has a ___ car.", choices: ["new", "old", "big", "small"], correct_answer: "new", japanese_translation: "新しい", full_sentence_japanese: "彼は新しい車を持っています。", grammar_info: "形容詞。新しい。", source_info: "英検4級頻出単語" },
        { id: 111, sentence: "She is ___ to school.", choices: ["going", "coming", "staying", "running"], correct_answer: "going", japanese_translation: "行っている", full_sentence_japanese: "彼女は学校に行っています。", grammar_info: "動詞。進行形。", source_info: "英検4級頻出単語" },
        { id: 112, sentence: "He is ___ a book.", choices: ["reading", "writing", "drawing", "eating"], correct_answer: "reading", japanese_translation: "読んでいる", full_sentence_japanese: "彼は本を読んでいます。", grammar_info: "動詞。進行形。", source_info: "英検4級頻出単語" },
        { id: 113, sentence: "She is ___ TV.", choices: ["watching", "listening", "playing", "eating"], correct_answer: "watching", japanese_translation: "見ている", full_sentence_japanese: "彼女はテレビを見ています。", grammar_info: "動詞。進行形。", source_info: "英検4級頻出単語" },
        { id: 114, sentence: "He is ___ to music.", choices: ["listening", "watching", "playing", "eating"], correct_answer: "listening", japanese_translation: "聞いている", full_sentence_japanese: "彼は音楽を聞いています。", grammar_info: "動詞。進行形。", source_info: "英検4級頻出単語" },
        { id: 115, sentence: "She is ___ a letter.", choices: ["writing", "reading", "drawing", "eating"], correct_answer: "writing", japanese_translation: "書いている", full_sentence_japanese: "彼女は手紙を書いています。", grammar_info: "動詞。進行形。", source_info: "英検4級頻出単語" },
        { id: 116, sentence: "He is ___ a picture.", choices: ["drawing", "writing", "reading", "eating"], correct_answer: "drawing", japanese_translation: "描いている", full_sentence_japanese: "彼は絵を描いています。", grammar_info: "動詞。進行形。", source_info: "英検4級頻出単語" },
        { id: 117, sentence: "She is ___ a song.", choices: ["singing", "dancing", "playing", "eating"], correct_answer: "singing", japanese_translation: "歌っている", full_sentence_japanese: "彼女は歌を歌っています。", grammar_info: "動詞。進行形。", source_info: "英検4級頻出単語" },
        { id: 118, sentence: "He is ___ a game.", choices: ["playing", "watching", "listening", "eating"], correct_answer: "playing", japanese_translation: "している", full_sentence_japanese: "彼はゲームをしています。", grammar_info: "動詞。進行形。", source_info: "英検4級頻出単語" },
        // 50語追加 (ID 119-168)
        { id: 119, sentence: "Sakamoto is a very ___ man.", choices: ["strong", "weak", "old", "young"], correct_answer: "strong", japanese_translation: "強い", full_sentence_japanese: "坂本はとても強い男です。", grammar_info: "形容詞。力がある。", source_info: "英検4級頻出単語" },
        { id: 120, sentence: "Shin has a ___ mind.", choices: ["sharp", "dull", "slow", "fast"], correct_answer: "sharp", japanese_translation: "鋭い", full_sentence_japanese: "シンは鋭い心を持っています。", grammar_info: "形容詞。頭の回転が速い。", source_info: "英検4級頻出単語" },
        { id: 121, sentence: "Lu wants to ___ her family.", choices: ["see", "forget", "hate", "leave"], correct_answer: "see", japanese_translation: "会う", full_sentence_japanese: "ルーは家族に会いたがっています。", grammar_info: "動詞。人に会う。", source_info: "英検4級頻出単語" },
        { id: 122, sentence: "They ___ to the city.", choices: ["travel", "stay", "sleep", "eat"], correct_answer: "travel", japanese_translation: "旅行する", full_sentence_japanese: "彼らは街へ旅行します。", grammar_info: "動詞。移動する。", source_info: "英検4級頻出単語" },
        { id: 123, sentence: "Aoi is a ___ cook.", choices: ["good", "bad", "slow", "fast"], correct_answer: "good", japanese_translation: "良い", full_sentence_japanese: "葵は良い料理人です。", grammar_info: "形容詞。質が良い。", source_info: "英検4級頻出単語" },
        { id: 124, sentence: "Natsuki can ___ many things.", choices: ["remember", "forget", "lose", "break"], correct_answer: "remember", japanese_translation: "覚えている", full_sentence_japanese: "夏生は多くのことを覚えています。", grammar_info: "動詞。記憶する。", source_info: "英検4級頻出単語" },
        { id: 125, sentence: "Sakamoto's ___ is very quiet.", choices: ["house", "car", "voice", "dog"], correct_answer: "house", japanese_translation: "家", full_sentence_japanese: "坂本の家はとても静かです。", grammar_info: "名詞。住居。", source_info: "英検4級頻出単語" },
        { id: 126, sentence: "Shin has a ___ heart.", choices: ["kind", "cold", "strong", "weak"], correct_answer: "kind", japanese_translation: "親切な", full_sentence_japanese: "シンは優しい心を持っています。", grammar_info: "形容詞。性格が優しい。", source_info: "英検4級頻出単語" },
        { id: 127, sentence: "They ___ a lot of fun.", choices: ["have", "don't have", "lose", "find"], correct_answer: "have", japanese_translation: "持っている", full_sentence_japanese: "彼らはとても楽しい時間を過ごします。", grammar_info: "動詞。「～を楽しむ」は have fun。", source_info: "英検4級頻出単語" },
        { id: 128, sentence: "Lu is very ___ about her mission.", choices: ["excited", "sad", "angry", "tired"], correct_answer: "excited", japanese_translation: "興奮した", full_sentence_japanese: "ルーは自分の任務にとても興奮しています。", grammar_info: "形容詞。感情を表す。", source_info: "英検4級頻出単語" },
        { id: 129, sentence: "The ramen shop is always ___.", choices: ["crowded", "empty", "quiet", "small"], correct_answer: "crowded", japanese_translation: "混雑した", full_sentence_japanese: "ラーメン屋はいつも混雑しています。", grammar_info: "形容詞。人が多い。", source_info: "英検4級頻出単語" },
        { id: 130, sentence: "Aoi likes to ___ new recipes.", choices: ["try", "forget", "hate", "ignore"], correct_answer: "try", japanese_translation: "試す", full_sentence_japanese: "葵は新しいレシピを試すのが好きです。", grammar_info: "動詞。試行する。", source_info: "英検4級頻出単語" },
        { id: 131, sentence: "Natsuki is a ___ detective.", choices: ["smart", "stupid", "lazy", "busy"], correct_answer: "smart", japanese_translation: "賢い", full_sentence_japanese: "夏生は賢い探偵です。", grammar_info: "形容詞。頭が良い。", source_info: "英検4級頻出単語" },
        { id: 132, sentence: "Sakamoto is a ___ father.", choices: ["loving", "strict", "bad", "young"], correct_answer: "loving", japanese_translation: "愛情深い", full_sentence_japanese: "坂本は愛情深い父親です。", grammar_info: "形容詞。愛情がある。", source_info: "英検4級頻出単語" },
        { id: 133, sentence: "Shin wants to ___ his power.", choices: ["control", "lose", "hide", "break"], correct_answer: "control", japanese_translation: "制御する", full_sentence_japanese: "シンは自分の力を制御したいと思っています。", grammar_info: "動詞。管理する。", source_info: "英検4級頻出単語" },
        { id: 134, sentence: "They ___ to the mountains for training.", choices: ["go", "come", "stay", "run"], correct_answer: "go", japanese_translation: "行く", full_sentence_japanese: "彼らは訓練のために山へ行きます。", grammar_info: "動詞。移動する。", source_info: "英検4級頻出単語" },
        { id: 135, sentence: "Lu is very ___ about her future.", choices: ["optimistic", "pessimistic", "sad", "angry"], correct_answer: "optimistic", japanese_translation: "楽観的な", full_sentence_japanese: "ルーは自分の未来にとても楽観的です。", grammar_info: "形容詞。前向きな。", source_info: "英検4級頻出単語" },
        { id: 136, sentence: "The food is very ___.", choices: ["delicious", "bad", "cold", "hot"], correct_answer: "delicious", japanese_translation: "おいしい", full_sentence_japanese: "その食べ物はとてもおいしいです。", grammar_info: "形容詞。味が良い。", source_info: "英検4級頻出単語" },
        { id: 137, sentence: "Aoi has a ___ personality.", choices: ["bright", "dark", "sad", "angry"], correct_answer: "bright", japanese_translation: "明るい", full_sentence_japanese: "葵は明るい性格をしています。", grammar_info: "形容詞。性格を表す。", source_info: "英検4級頻出単語" },
        { id: 138, sentence: "Natsuki can ___ many secrets.", choices: ["keep", "tell", "share", "forget"], correct_answer: "keep", japanese_translation: "保つ", full_sentence_japanese: "夏生は多くの秘密を保つことができます。", grammar_info: "動詞。「秘密を守る」は keep a secret。", source_info: "英検4級頻出単語" },
        { id: 139, sentence: "Sakamoto is a very ___ person.", choices: ["calm", "angry", "sad", "happy"], correct_answer: "calm", japanese_translation: "穏やかな", full_sentence_japanese: "坂本はとても穏やかな人です。", grammar_info: "形容詞。落ち着いている。", source_info: "英検4級頻出単語" },
        { id: 140, sentence: "Shin wants to ___ his master.", choices: ["find", "lose", "forget", "help"], correct_answer: "find", japanese_translation: "見つける", full_sentence_japanese: "シンは彼の師匠を見つけたいと思っています。", grammar_info: "動詞。何かを発見する。", source_info: "英検4級頻出単語" },
        { id: 141, sentence: "They ___ a new mission today.", choices: ["have", "don't have", "finish", "start"], correct_answer: "have", japanese_translation: "持っている", full_sentence_japanese: "彼らは今日、新しい任務を持っています。", grammar_info: "動詞。所有する。", source_info: "英検4級頻出単語" },
        { id: 142, sentence: "Lu is very ___ about her training.", choices: ["serious", "lazy", "funny", "sad"], correct_answer: "serious", japanese_translation: "真剣な", full_sentence_japanese: "ルーは訓練にとても真剣です。", grammar_info: "形容詞。真面目な。", source_info: "英検4級頻出単語" },
        { id: 143, sentence: "The store is always ___ with customers.", choices: ["busy", "empty", "quiet", "small"], correct_answer: "busy", japanese_translation: "忙しい", full_sentence_japanese: "その店はいつも客で忙しいです。", grammar_info: "形容詞。混雑している。", source_info: "英検4級頻出単語" },
        { id: 144, sentence: "Aoi likes to ___ in the kitchen.", choices: ["cook", "sleep", "read", "play"], correct_answer: "cook", japanese_translation: "料理する", full_sentence_japanese: "葵は台所で料理するのが好きです。", grammar_info: "動詞。食事を作る。", source_info: "英検4級頻出単語" },
        { id: 145, sentence: "Natsuki can ___ information very well.", choices: ["gather", "throw", "break", "send"], correct_answer: "gather", japanese_translation: "集める", full_sentence_japanese: "夏生は情報をとても上手に集めることができます。", grammar_info: "動詞。情報を集める。", source_info: "英検4級頻出単語" },
        { id: 146, sentence: "Sakamoto is a ___ father to Hana.", choices: ["loving", "strict", "bad", "young"], correct_answer: "loving", japanese_translation: "愛情深い", full_sentence_japanese: "坂本はハナにとって愛情深い父親です。", grammar_info: "形容詞。愛情がある。", source_info: "英検4級頻出単語" },
        { id: 147, sentence: "Shin has a ___ dream.", choices: ["big", "small", "bad", "funny"], correct_answer: "big", japanese_translation: "大きな", full_sentence_japanese: "シンは大きな夢を持っています。", grammar_info: "形容詞。サイズが大きい。", source_info: "英検4級頻出単語" },
        { id: 148, sentence: "They ___ to help people.", choices: ["try", "fail", "refuse", "forget"], correct_answer: "try", japanese_translation: "試みる", full_sentence_japanese: "彼らは人々を助けようとします。", grammar_info: "動詞。「～しようと試みる」は try to ～。", source_info: "英検4級頻出単語" },
        { id: 149, sentence: "Lu is very ___ about her future.", choices: ["hopeful", "sad", "angry", "tired"], correct_answer: "hopeful", japanese_translation: "希望に満ちた", full_sentence_japanese: "ルーは自分の未来にとても希望に満ちています。", grammar_info: "形容詞。希望を持っている。", source_info: "英検4級頻出単語" },
        { id: 150, sentence: "The city is very ___ at night.", choices: ["bright", "dark", "quiet", "cold"], correct_answer: "bright", japanese_translation: "明るい", full_sentence_japanese: "夜の街はとても明るいです。", grammar_info: "形容詞。光が多い。", source_info: "英検4級頻出単語" },
        { id: 151, sentence: "Sakamoto has a ___ family.", choices: ["happy", "sad", "small", "big"], correct_answer: "happy", japanese_translation: "幸せな", full_sentence_japanese: "坂本には幸せな家族がいます。", grammar_info: "形容詞。幸福な状態。", source_info: "英検4級頻出単語" },
        { id: 152, sentence: "Shin can ___ people's thoughts.", choices: ["hear", "see", "touch", "smell"], correct_answer: "hear", japanese_translation: "聞く", full_sentence_japanese: "シンは人々の考えを聞くことができます。", grammar_info: "動詞。音を耳で捉える。", source_info: "英検4級頻出単語" },
        { id: 153, sentence: "They ___ to the park every Sunday.", choices: ["go", "come", "stay", "run"], correct_answer: "go", japanese_translation: "行く", full_sentence_japanese: "彼らは毎週日曜日に公園に行きます。", grammar_info: "動詞。移動する。", source_info: "英検4級頻出単語" },
        { id: 154, sentence: "Lu wants to ___ her skills.", choices: ["improve", "forget", "hide", "lose"], correct_answer: "improve", japanese_translation: "向上させる", full_sentence_japanese: "ルーは自分のスキルを向上させたいと思っています。", grammar_info: "動詞。より良くする。", source_info: "英検4級頻出単語" },
        { id: 155, sentence: "The store sells many ___ things.", choices: ["useful", "useless", "old", "new"], correct_answer: "useful", japanese_translation: "役立つ", full_sentence_japanese: "その店は多くの役立つものを売っています。", grammar_info: "形容詞。役に立つ。", source_info: "英検4級頻出単語" },
        { id: 156, sentence: "Aoi is very ___ about her cooking.", choices: ["careful", "careless", "fast", "slow"], correct_answer: "careful", japanese_translation: "注意深い", full_sentence_japanese: "葵は料理にとても注意深いです。", grammar_info: "形容詞。慎重な。", source_info: "英検4級頻出単語" },
        { id: 157, sentence: "Natsuki has a ___ for finding things.", choices: ["talent", "problem", "hobby", "job"], correct_answer: "talent", japanese_translation: "才能", full_sentence_japanese: "夏生は物を見つける才能があります。", grammar_info: "名詞。特別な能力。", source_info: "英検4級頻出単語" },
        { id: 158, sentence: "Sakamoto is a ___ husband.", choices: ["good", "bad", "lazy", "busy"], correct_answer: "good", japanese_translation: "良い", full_sentence_japanese: "坂本は良い夫です。", grammar_info: "形容詞。質が良い。", source_info: "英検4級頻出単語" },
        { id: 159, sentence: "Shin often ___ about his past.", choices: ["dreams", "forgets", "remembers", "talks"], correct_answer: "dreams", japanese_translation: "夢を見る", full_sentence_japanese: "シンはよく自分の過去について夢を見ます。", grammar_info: "動詞。夢を見る。", source_info: "英検4級頻出単語" },
        { id: 160, sentence: "They ___ to the beach last summer.", choices: ["went", "came", "stayed", "played"], correct_answer: "went", japanese_translation: "行った", full_sentence_japanese: "彼らは去年の夏、ビーチへ行きました。", grammar_info: "動詞。goの過去形。", source_info: "英検4級頻出単語" },
        { id: 161, sentence: "Lu is very ___ to learn new things.", choices: ["eager", "unwilling", "afraid", "tired"], correct_answer: "eager", japanese_translation: "熱心な", full_sentence_japanese: "ルーは新しいことを学ぶのにとても熱心です。", grammar_info: "形容詞。意欲的な。", source_info: "英検4級頻出単語" },
        { id: 162, sentence: "The food at the ramen shop is always ___.", choices: ["hot", "cold", "old", "new"], correct_answer: "hot", japanese_translation: "熱い", full_sentence_japanese: "ラーメン屋の食べ物はいつも熱いです。", grammar_info: "形容詞。温度が高い。", source_info: "英検4級頻出単語" },
        { id: 163, sentence: "Aoi has a ___ smile.", choices: ["beautiful", "sad", "angry", "fake"], correct_answer: "beautiful", japanese_translation: "美しい", full_sentence_japanese: "葵は美しい笑顔を持っています。", grammar_info: "形容詞。見た目が良い。", source_info: "英検4級頻出単語" },
        { id: 164, sentence: "Natsuki can ___ many difficult problems.", choices: ["solve", "create", "ignore", "hide"], correct_answer: "solve", japanese_translation: "解決する", full_sentence_japanese: "夏生は多くの難しい問題を解決することができます。", grammar_info: "動詞。問題を解く。", source_info: "英検4級頻出単語" },
        { id: 165, sentence: "Sakamoto is a ___ father to Hana.", choices: ["caring", "strict", "lazy", "busy"], correct_answer: "caring", japanese_translation: "思いやりのある", full_sentence_japanese: "坂本はハナにとって思いやりのある父親です。", grammar_info: "形容詞。気遣いができる。", source_info: "英検4級頻出単語" },
        { id: 166, sentence: "Shin wants to ___ his past.", choices: ["change", "forget", "remember", "hide"], correct_answer: "change", japanese_translation: "変える", full_sentence_japanese: "シンは自分の過去を変えたいと思っています。", grammar_info: "動詞。変化させる。", source_info: "英検4級頻出単語" },
        { id: 167, sentence: "They ___ to work every morning.", choices: ["walk", "drive", "run", "fly"], correct_answer: "walk", japanese_translation: "歩く", full_sentence_japanese: "彼らは毎朝仕事に歩いて行きます。", grammar_info: "動詞。徒歩で移動する。", source_info: "英検4級頻出単語" },
        { id: 168, sentence: "Lu is very ___ about her future.", choices: ["positive", "negative", "sad", "angry"], correct_answer: "positive", japanese_translation: "前向きな", full_sentence_japanese: "ルーは自分の未来にとても前向きです。", grammar_info: "形容詞。肯定的。", source_info: "英検4級頻出単語" },
        // 50語追加 (ID 169-218)
        { id: 169, sentence: "Sakamoto is a ___ man.", choices: ["busy", "free", "lazy", "tired"], correct_answer: "busy", japanese_translation: "忙しい", full_sentence_japanese: "坂本は忙しい男です。", grammar_info: "形容詞。仕事などで手がいっぱいな状態。", source_info: "英検4級頻出単語" },
        { id: 170, sentence: "Shin has a ___ voice.", choices: ["loud", "quiet", "soft", "high"], correct_answer: "loud", japanese_translation: "大きい", full_sentence_japanese: "シンは大きな声を持っています。", grammar_info: "形容詞。音量が大きい。", source_info: "英検4級頻出単語" },
        { id: 171, sentence: "Lu wants to ___ her dream.", choices: ["achieve", "forget", "lose", "hide"], correct_answer: "achieve", japanese_translation: "達成する", full_sentence_japanese: "ルーは夢を達成したいと思っています。", grammar_info: "動詞。目標などを成し遂げる。", source_info: "英検4級頻出単語" },
        { id: 172, sentence: "They ___ to the mountains.", choices: ["climb", "swim", "fly", "drive"], correct_answer: "climb", japanese_translation: "登る", full_sentence_japanese: "彼らは山に登ります。", grammar_info: "動詞。高いところへ移動する。", source_info: "英検4級頻出単語" },
        { id: 173, sentence: "Aoi is a ___ girl.", choices: ["smart", "stupid", "lazy", "busy"], correct_answer: "smart", japanese_translation: "賢い", full_sentence_japanese: "葵は賢い女の子です。", grammar_info: "形容詞。頭が良い。", source_info: "英検4級頻出単語" },
        { id: 174, sentence: "Natsuki can ___ many things.", choices: ["find", "lose", "break", "hide"], correct_answer: "find", japanese_translation: "見つける", full_sentence_japanese: "夏生は多くのものを見つけることができます。", grammar_info: "動詞。何かを発見する。", source_info: "英検4級頻出単語" },
        { id: 175, sentence: "Sakamoto's ___ is very strong.", choices: ["body", "mind", "spirit", "voice"], correct_answer: "body", japanese_translation: "体", full_sentence_japanese: "坂本の体はとても強いです。", grammar_info: "名詞。身体。", source_info: "英検4級頻出単語" },
        { id: 176, sentence: "Shin has a ___ ability.", choices: ["special", "normal", "weak", "bad"], correct_answer: "special", japanese_translation: "特別な", full_sentence_japanese: "シンは特別な能力を持っています。", grammar_info: "形容詞。普通ではない。", source_info: "英検4級頻出単語" },
        { id: 177, sentence: "They ___ to help people.", choices: ["want", "hate", "refuse", "forget"], correct_answer: "want", japanese_translation: "～したい", full_sentence_japanese: "彼らは人々を助けたいと思っています。", grammar_info: "動詞。「～したい」は want to ～。", source_info: "英検4級頻出単語" },
        { id: 178, sentence: "Lu is very ___ about her training.", choices: ["serious", "lazy", "funny", "sad"], correct_answer: "serious", japanese_translation: "真剣な", full_sentence_japanese: "ルーは訓練にとても真剣です。", grammar_info: "形容詞。真面目な。", source_info: "英検4級頻出単語" },
        { id: 179, sentence: "The store is always ___ with customers.", choices: ["full", "empty", "quiet", "small"], correct_answer: "full", japanese_translation: "満員の", full_sentence_japanese: "その店はいつも客でいっぱいです。", grammar_info: "形容詞。満たされている。", source_info: "英検4級頻出単語" },
        { id: 180, sentence: "Aoi likes to ___ in the kitchen.", choices: ["sing", "dance", "play", "read"], correct_answer: "sing", japanese_translation: "歌う", full_sentence_japanese: "葵は台所で歌うのが好きです。", grammar_info: "動詞。歌を歌う。", source_info: "英検4級頻出単語" },
        { id: 181, sentence: "Natsuki can ___ many languages.", choices: ["understand", "forget", "hate", "ignore"], correct_answer: "understand", japanese_translation: "理解する", full_sentence_japanese: "夏生は多くの言語を理解することができます。", grammar_info: "動詞。意味を把握する。", source_info: "英検4級頻出単語" },
        { id: 182, sentence: "Sakamoto is a ___ father.", choices: ["kind", "mean", "lazy", "busy"], correct_answer: "kind", japanese_translation: "親切な", full_sentence_japanese: "坂本は親切な父親です。", grammar_info: "形容詞。優しい。", source_info: "英検4級頻出単語" },
        { id: 183, sentence: "Shin often ___ about his past.", choices: ["thinks", "forgets", "remembers", "talks"], correct_answer: "thinks", japanese_translation: "考える", full_sentence_japanese: "シンはよく自分の過去について考えます。", grammar_info: "動詞。思考する。", source_info: "英検4級頻出単語" },
        { id: 184, sentence: "They ___ to the park.", choices: ["walk", "run", "fly", "swim"], correct_answer: "walk", japanese_translation: "歩く", full_sentence_japanese: "彼らは公園へ歩いて行きます。", grammar_info: "動詞。徒歩で移動する。", source_info: "英検4級頻出単語" },
        { id: 185, sentence: "Lu is very ___ about her future.", choices: ["positive", "negative", "sad", "angry"], correct_answer: "positive", japanese_translation: "前向きな", full_sentence_japanese: "ルーは自分の未来にとても前向きです。", grammar_info: "形容詞。肯定的。", source_info: "英検4級頻出単語" },
        { id: 186, sentence: "The ramen is very ___.", choices: ["hot", "cold", "old", "new"], correct_answer: "hot", japanese_translation: "熱い", full_sentence_japanese: "ラーメンはとても熱いです。", grammar_info: "形容詞。温度が高い。", source_info: "英検4級頻出単語" },
        { id: 187, sentence: "Aoi has a ___ smile.", choices: ["beautiful", "sad", "angry", "fake"], correct_answer: "beautiful", japanese_translation: "美しい", full_sentence_japanese: "葵は美しい笑顔を持っています。", grammar_info: "形容詞。見た目が良い。", source_info: "英検4級頻出単語" },
        { id: 188, sentence: "Natsuki can ___ many difficult problems.", choices: ["solve", "create", "ignore", "hide"], correct_answer: "solve", japanese_translation: "解決する", full_sentence_japanese: "夏生は多くの難しい問題を解決することができます。", grammar_info: "動詞。問題を解く。", source_info: "英検4級頻出単語" },
        { id: 189, sentence: "Sakamoto is a ___ father to Hana.", choices: ["caring", "strict", "lazy", "busy"], correct_answer: "caring", japanese_translation: "思いやりのある", full_sentence_japanese: "坂本はハナにとって思いやりのある父親です。", grammar_info: "形容詞。気遣いができる。", source_info: "英検4級頻出単語" },
        { id: 190, sentence: "Shin wants to ___ his past.", choices: ["change", "forget", "remember", "hide"], correct_answer: "change", japanese_translation: "変える", full_sentence_japanese: "シンは自分の過去を変えたいと思っています。", grammar_info: "動詞。変化させる。", source_info: "英検4級頻出単語" },
        { id: 191, sentence: "They ___ to work every morning.", choices: ["walk", "drive", "run", "fly"], correct_answer: "walk", japanese_translation: "歩く", full_sentence_japanese: "彼らは毎朝仕事に歩いて行きます。", grammar_info: "動詞。徒歩で移動する。", source_info: "英検4級頻出単語" },
        { id: 192, sentence: "Lu is very ___ about her future.", choices: ["positive", "negative", "sad", "angry"], correct_answer: "positive", japanese_translation: "前向きな", full_sentence_japanese: "ルーは自分の未来にとても前向きです。", grammar_info: "形容詞。肯定的。", source_info: "英検4級頻出単語" },
        { id: 193, sentence: "Sakamoto is a ___ man.", choices: ["kind", "mean", "lazy", "busy"], correct_answer: "kind", japanese_translation: "親切な", full_sentence_japanese: "坂本は親切な男です。", grammar_info: "形容詞。優しい。", source_info: "英検4級頻出単語" },
        { id: 194, sentence: "Shin has a ___ voice.", choices: ["soft", "loud", "high", "low"], correct_answer: "soft", japanese_translation: "柔らかい", full_sentence_japanese: "シンは柔らかい声を持っています。", grammar_info: "形容詞。音量が小さい。", source_info: "英検4級頻出単語" },
        { id: 195, sentence: "Lu wants to ___ her dream.", choices: ["realize", "forget", "lose", "hide"], correct_answer: "realize", japanese_translation: "実現する", full_sentence_japanese: "ルーは夢を実現したいと思っています。", grammar_info: "動詞。夢などを現実にする。", source_info: "英検4級頻出単語" },
        { id: 196, sentence: "They ___ to the beach.", choices: ["go", "come", "stay", "run"], correct_answer: "go", japanese_translation: "行く", full_sentence_japanese: "彼らはビーチへ行きます。", grammar_info: "動詞。移動する。", source_info: "英検4級頻出単語" },
        { id: 197, sentence: "Aoi is a ___ cook.", choices: ["excellent", "bad", "slow", "fast"], correct_answer: "excellent", japanese_translation: "素晴らしい", full_sentence_japanese: "葵は素晴らしい料理人です。", grammar_info: "形容詞。非常に優れている。", source_info: "英検4級頻出単語" },
        { id: 198, sentence: "Natsuki can ___ many things.", choices: ["remember", "forget", "lose", "break"], correct_answer: "remember", japanese_translation: "覚えている", full_sentence_japanese: "夏生は多くのことを覚えています。", grammar_info: "動詞。記憶する。", source_info: "英検4級頻出単語" },
        { id: 199, sentence: "Sakamoto's ___ is very strong.", choices: ["will", "body", "mind", "spirit"], correct_answer: "will", japanese_translation: "意志", full_sentence_japanese: "坂本の意志はとても強いです。", grammar_info: "名詞。決意や意思。", source_info: "英検4級頻出単語" },
        { id: 200, sentence: "Shin has a ___ ability.", choices: ["unique", "normal", "weak", "bad"], correct_answer: "unique", japanese_translation: "ユニークな", full_sentence_japanese: "シンはユニークな能力を持っています。", grammar_info: "形容詞。他に類を見ない。", source_info: "英検4級頻出単語" },
        { id: 201, sentence: "They ___ to help people.", choices: ["try", "fail", "refuse", "forget"], correct_answer: "try", japanese_translation: "試みる", full_sentence_japanese: "彼らは人々を助けようとします。", grammar_info: "動詞。「～しようと試みる」は try to ～。", source_info: "英検4級頻出単語" },
        { id: 202, sentence: "Lu is very ___ about her training.", choices: ["diligent", "lazy", "funny", "sad"], correct_answer: "diligent", japanese_translation: "勤勉な", full_sentence_japanese: "ルーは訓練にとても勤勉です。", grammar_info: "形容詞。真面目に努力する。", source_info: "英検4級頻出単語" },
        { id: 203, sentence: "The store is always ___ with customers.", choices: ["crowded", "empty", "quiet", "small"], correct_answer: "crowded", japanese_translation: "混雑した", full_sentence_japanese: "その店はいつも客で混雑しています。", grammar_info: "形容詞。人が多い。", source_info: "英検4級頻出単語" },
        { id: 204, sentence: "Aoi likes to ___ in the kitchen.", choices: ["bake", "sing", "dance", "play"], correct_answer: "bake", japanese_translation: "焼く", full_sentence_japanese: "葵は台所で焼くのが好きです。", grammar_info: "動詞。オーブンなどで焼く。", source_info: "英検4級頻出単語" },
        { id: 205, sentence: "Natsuki can ___ many secrets.", choices: ["keep", "tell", "share", "forget"], correct_answer: "keep", japanese_translation: "保つ", full_sentence_japanese: "夏生は多くの秘密を保つことができます。", grammar_info: "動詞。「秘密を守る」は keep a secret。", source_info: "英検4級頻出単語" },
        { id: 206, sentence: "Sakamoto is a ___ father to Hana.", choices: ["devoted", "strict", "lazy", "busy"], correct_answer: "devoted", japanese_translation: "献身的な", full_sentence_japanese: "坂本はハナにとって献身的な父親です。", grammar_info: "形容詞。愛情深く尽くす。", source_info: "英検4級頻出単語" },
        { id: 207, sentence: "Shin has a ___ dream.", choices: ["bright", "dark", "sad", "funny"], correct_answer: "bright", japanese_translation: "明るい", full_sentence_japanese: "シンは明るい夢を持っています。", grammar_info: "形容詞。光り輝く。", source_info: "英検4級頻出単語" },
        { id: 208, sentence: "They ___ to help people.", choices: ["strive", "fail", "refuse", "forget"], correct_answer: "strive", japanese_translation: "努力する", full_sentence_japanese: "彼らは人々を助けるために努力します。", grammar_info: "動詞。懸命に努力する。", source_info: "英検4級頻出単語" },
        { id: 209, sentence: "Lu is very ___ about her future.", choices: ["optimistic", "pessimistic", "sad", "angry"], correct_answer: "optimistic", japanese_translation: "楽観的な", full_sentence_japanese: "ルーは自分の未来にとても楽観的です。", grammar_info: "形容詞。前向きな。", source_info: "英検4級頻出単語" },
        { id: 210, sentence: "The city is very ___ at night.", choices: ["lively", "quiet", "dark", "cold"], correct_answer: "lively", japanese_translation: "活気のある", full_sentence_japanese: "夜の街はとても活気があります。", grammar_info: "形容詞。活発な。", source_info: "英検4級頻出単語" },
        { id: 211, sentence: "Sakamoto has a ___ family.", choices: ["loving", "sad", "small", "big"], correct_answer: "loving", japanese_translation: "愛情深い", full_sentence_japanese: "坂本には愛情深い家族がいます。", grammar_info: "形容詞。愛情がある。", source_info: "英検4級頻出単語" },
        { id: 212, sentence: "Shin can ___ people's feelings.", choices: ["sense", "ignore", "forget", "hide"], correct_answer: "sense", japanese_translation: "感じる", full_sentence_japanese: "シンは人々の感情を感じることができます。", grammar_info: "動詞。感覚で捉える。", source_info: "英検4級頻出単語" },
        { id: 213, sentence: "They ___ to the park every weekend.", choices: ["visit", "stay", "sleep", "eat"], correct_answer: "visit", japanese_translation: "訪れる", full_sentence_japanese: "彼らは毎週末公園を訪れます。", grammar_info: "動詞。場所を訪れる。", source_info: "英検4級頻出単語" },
        { id: 214, sentence: "Lu wants to ___ her knowledge.", choices: ["expand", "forget", "hide", "lose"], correct_answer: "expand", japanese_translation: "広げる", full_sentence_japanese: "ルーは知識を広げたいと思っています。", grammar_info: "動詞。範囲を広げる。", source_info: "英検4級頻出単語" },
        { id: 215, sentence: "The store sells many ___ items.", choices: ["unique", "common", "old", "new"], correct_answer: "unique", japanese_translation: "ユニークな", full_sentence_japanese: "その店は多くのユニークな商品を売っています。", grammar_info: "形容詞。他に類を見ない。", source_info: "英検4級頻出単語" },
        { id: 216, sentence: "Aoi is very ___ about her friends.", choices: ["loyal", "disloyal", "sad", "angry"], correct_answer: "loyal", japanese_translation: "忠実な", full_sentence_japanese: "葵は友達にとても忠実です。", grammar_info: "形容詞。誠実な。", source_info: "英検4級頻出単語" },
        { id: 217, sentence: "Natsuki has a ___ for details.", choices: ["sharp eye", "blind eye", "weak eye", "bad eye"], correct_answer: "sharp eye", japanese_translation: "鋭い目", full_sentence_japanese: "夏生は細部を見抜く鋭い目を持っています。", grammar_info: "名詞句。観察力がある。", source_info: "英検4級頻出単語" },
        { id: 218, sentence: "Sakamoto is a ___ leader.", choices: ["natural", "unnatural", "weak", "bad"], correct_answer: "natural", japanese_translation: "生まれつきの", full_sentence_japanese: "坂本は生まれつきのリーダーです。", grammar_info: "形容詞。天性の。", source_info: "英検4級頻出単語" },
        // 50語追加 (ID 219-268)
        { id: 219, sentence: "Sakamoto is a ___ man.", choices: ["brave", "cowardly", "lazy", "tired"], correct_answer: "brave", japanese_translation: "勇敢な", full_sentence_japanese: "坂本は勇敢な男です。", grammar_info: "形容詞。勇気がある。", source_info: "英検4級頻出単語" },
        { id: 220, sentence: "Shin has a ___ mind.", choices: ["creative", "dull", "slow", "fast"], correct_answer: "creative", japanese_translation: "創造的な", full_sentence_japanese: "シンは創造的な心を持っています。", grammar_info: "形容詞。新しいものを生み出す力がある。", source_info: "英検4級頻出単語" },
        { id: 221, sentence: "Lu wants to ___ her skills.", choices: ["master", "forget", "lose", "hide"], correct_answer: "master", japanese_translation: "習得する", full_sentence_japanese: "ルーは自分のスキルを習得したいと思っています。", grammar_info: "動詞。完全に身につける。", source_info: "英検4級頻出単語" },
        { id: 222, sentence: "They ___ to the city.", choices: ["return", "stay", "sleep", "eat"], correct_answer: "return", japanese_translation: "戻る", full_sentence_japanese: "彼らは街へ戻ります。", grammar_info: "動詞。元の場所へ帰る。", source_info: "英検4級頻出単語" },
        { id: 223, sentence: "Aoi is a ___ girl.", choices: ["cheerful", "sad", "angry", "tired"], correct_answer: "cheerful", japanese_translation: "陽気な", full_sentence_japanese: "葵は陽気な女の子です。", grammar_info: "形容詞。明るく元気な。", source_info: "英検4級頻出単語" },
        { id: 224, sentence: "Natsuki can ___ many things.", choices: ["analyze", "forget", "lose", "break"], correct_answer: "analyze", japanese_translation: "分析する", full_sentence_japanese: "夏生は多くのことを分析することができます。", grammar_info: "動詞。細かく調べて明らかにする。", source_info: "英検4級頻出単語" },
        { id: 225, sentence: "Sakamoto's ___ is very strong.", choices: ["spirit", "body", "mind", "voice"], correct_answer: "spirit", japanese_translation: "精神", full_sentence_japanese: "坂本の精神はとても強いです。", grammar_info: "名詞。心や魂。", source_info: "英検4級頻出単語" },
        { id: 226, sentence: "Shin has a ___ ability.", choices: ["unique", "normal", "weak", "bad"], correct_answer: "unique", japanese_translation: "ユニークな", full_sentence_japanese: "シンはユニークな能力を持っています。", grammar_info: "形容詞。他に類を見ない。", source_info: "英検4級頻出単語" },
        { id: 227, sentence: "They ___ to help people.", choices: ["endeavor", "fail", "refuse", "forget"], correct_answer: "endeavor", japanese_translation: "努力する", full_sentence_japanese: "彼らは人々を助けるために努力します。", grammar_info: "動詞。懸命に努力する。", source_info: "英検4級頻出単語" },
        { id: 228, sentence: "Lu is very ___ about her training.", choices: ["dedicated", "lazy", "funny", "sad"], correct_answer: "dedicated", japanese_translation: "献身的な", full_sentence_japanese: "ルーは訓練にとても献身的です。", grammar_info: "形容詞。熱心に打ち込む。", source_info: "英検4級頻出単語" },
        { id: 229, sentence: "The store is always ___ with customers.", choices: ["bustling", "empty", "quiet", "small"], correct_answer: "bustling", japanese_translation: "賑やかな", full_sentence_japanese: "その店はいつも客で賑やかです。", grammar_info: "形容詞。活気がある。", source_info: "英検4級頻出単語" },
        { id: 230, sentence: "Aoi likes to ___ new dishes.", choices: ["create", "forget", "hate", "ignore"], correct_answer: "create", japanese_translation: "創造する", full_sentence_japanese: "葵は新しい料理を創造するのが好きです。", grammar_info: "動詞。新しいものを作り出す。", source_info: "英検4級頻出単語" },
        { id: 231, sentence: "Natsuki is a ___ detective.", choices: ["brilliant", "stupid", "lazy", "busy"], correct_answer: "brilliant", japanese_translation: "素晴らしい", full_sentence_japanese: "夏生は素晴らしい探偵です。", grammar_info: "形容詞。非常に優れている。", source_info: "英検4級頻出単語" },
        { id: 232, sentence: "Sakamoto is a ___ father.", choices: ["protective", "strict", "bad", "young"], correct_answer: "protective", japanese_translation: "保護的な", full_sentence_japanese: "坂本は保護的な父親です。", grammar_info: "形容詞。守ろうとする。", source_info: "英検4級頻出単語" },
        { id: 233, sentence: "Shin wants to ___ his power.", choices: ["enhance", "lose", "hide", "break"], correct_answer: "enhance", japanese_translation: "高める", full_sentence_japanese: "シンは自分の力を高めたいと思っています。", grammar_info: "動詞。質や能力を向上させる。", source_info: "英検4級頻出単語" },
        { id: 234, sentence: "They ___ to the mountains for training.", choices: ["journey", "stay", "sleep", "eat"], correct_answer: "journey", japanese_translation: "旅する", full_sentence_japanese: "彼らは訓練のために山へ旅します。", grammar_info: "動詞。長い旅をする。", source_info: "英検4級頻出単語" },
        { id: 235, sentence: "Lu is very ___ about her future.", choices: ["ambitious", "pessimistic", "sad", "angry"], correct_answer: "ambitious", japanese_translation: "野心的な", full_sentence_japanese: "ルーは自分の未来にとても野心的です。", grammar_info: "形容詞。大きな目標を持つ。", source_info: "英検4級頻出単語" },
        { id: 236, sentence: "The food is very ___.", choices: ["savory", "bad", "cold", "hot"], correct_answer: "savory", japanese_translation: "風味豊かな", full_sentence_japanese: "その食べ物はとても風味豊かです。", grammar_info: "形容詞。香ばしい、おいしい。", source_info: "英検4級頻出単語" },
        { id: 237, sentence: "Aoi has a ___ personality.", choices: ["gentle", "harsh", "sad", "angry"], correct_answer: "gentle", japanese_translation: "優しい", full_sentence_japanese: "葵は優しい性格をしています。", grammar_info: "形容詞。穏やかで親切な。", source_info: "英検4級頻出単語" },
        { id: 238, sentence: "Natsuki can ___ many secrets.", choices: ["uncover", "tell", "share", "forget"], correct_answer: "uncover", japanese_translation: "暴く", full_sentence_japanese: "夏生は多くの秘密を暴くことができます。", grammar_info: "動詞。隠されていたものを明らかにする。", source_info: "英検4級頻出単語" },
        { id: 239, sentence: "Sakamoto is a very ___ person.", choices: ["composed", "angry", "sad", "happy"], correct_answer: "composed", japanese_translation: "落ち着いた", full_sentence_japanese: "坂本はとても落ち着いた人です。", grammar_info: "形容詞。冷静な。", source_info: "英検4級頻出単語" },
        { id: 240, sentence: "Shin wants to ___ his master.", choices: ["reunite", "lose", "forget", "help"], correct_answer: "reunite", japanese_translation: "再会する", full_sentence_japanese: "シンは彼の師匠と再会したいと思っています。", grammar_info: "動詞。再び会う。", source_info: "英検4級頻出単語" },
        { id: 241, sentence: "They ___ a new mission today.", choices: ["undertake", "finish", "start", "cancel"], correct_answer: "undertake", japanese_translation: "引き受ける", full_sentence_japanese: "彼らは今日、新しい任務を引き受けます。", grammar_info: "動詞。仕事などを引き受ける。", source_info: "英検4級頻出単語" },
        { id: 242, sentence: "Lu is very ___ about her training.", choices: ["disciplined", "lazy", "funny", "sad"], correct_answer: "disciplined", japanese_translation: "規律正しい", full_sentence_japanese: "ルーは訓練にとても規律正しいです。", grammar_info: "形容詞。自制心がある。", source_info: "英検4級頻出単語" },
        { id: 243, sentence: "The store is always ___ with customers.", choices: ["bustling", "empty", "quiet", "small"], correct_answer: "bustling", japanese_translation: "賑やかな", full_sentence_japanese: "その店はいつも客で賑やかです。", grammar_info: "形容詞。活気がある。", source_info: "英検4級頻出単語" },
        { id: 244, sentence: "Aoi likes to ___ in the kitchen.", choices: ["experiment", "sleep", "read", "play"], correct_answer: "experiment", japanese_translation: "実験する", full_sentence_japanese: "葵は台所で実験するのが好きです。", grammar_info: "動詞。試行錯誤する。", source_info: "英検4級頻出単語" },
        { id: 245, sentence: "Natsuki can ___ secrets very well.", choices: ["conceal", "tell", "share", "forget"], correct_answer: "conceal", japanese_translation: "隠す", full_sentence_japanese: "夏生は秘密をとても上手に隠すことができます。", grammar_info: "動詞。隠蔽する。", source_info: "英検4級頻出単語" },
        { id: 246, sentence: "Sakamoto is a ___ father to Hana.", choices: ["attentive", "strict", "bad", "young"], correct_answer: "attentive", japanese_translation: "気配りのある", full_sentence_japanese: "坂本はハナにとって気配りのある父親です。", grammar_info: "形容詞。注意深い。", source_info: "英検4級頻出単語" },
        { id: 247, sentence: "Shin has a ___ dream.", choices: ["vivid", "dull", "sad", "funny"], correct_answer: "vivid", japanese_translation: "鮮やかな", full_sentence_japanese: "シンは鮮やかな夢を持っています。", grammar_info: "形容詞。生き生きとした。", source_info: "英検4級頻出単語" },
        { id: 248, sentence: "They ___ to help people.", choices: ["endeavor", "fail", "refuse", "forget"], correct_answer: "endeavor", japanese_translation: "努力する", full_sentence_japanese: "彼らは人々を助けるために努力します。", grammar_info: "動詞。懸命に努力する。", source_info: "英検4級頻出単語" },
        { id: 249, sentence: "Lu is very ___ about her future.", choices: ["determined", "sad", "angry", "tired"], correct_answer: "determined", japanese_translation: "決意した", full_sentence_japanese: "ルーは自分の未来にとても決意しています。", grammar_info: "形容詞。固く決心している。", source_info: "英検4級頻出単語" },
        { id: 250, sentence: "The city is very ___ at night.", choices: ["vibrant", "quiet", "dark", "cold"], correct_answer: "vibrant", japanese_translation: "活気に満ちた", full_sentence_japanese: "夜の街はとても活気に満ちています。", grammar_info: "形容詞。生き生きとした。", source_info: "英検4級頻出単語" },
        { id: 251, sentence: "Sakamoto has a ___ family.", choices: ["harmonious", "sad", "small", "big"], correct_answer: "harmonious", japanese_translation: "調和のとれた", full_sentence_japanese: "坂本には調和のとれた家族がいます。", grammar_info: "形容詞。仲が良い。", source_info: "英検4級頻出単語" },
        { id: 252, sentence: "Shin can ___ people's intentions.", choices: ["discern", "ignore", "forget", "hide"], correct_answer: "discern", japanese_translation: "見抜く", full_sentence_japanese: "シンは人々の意図を見抜くことができます。", grammar_info: "動詞。見分ける。", source_info: "英検4級頻出単語" },
        { id: 253, sentence: "They ___ to the park every morning.", choices: ["stroll", "stay", "sleep", "eat"], correct_answer: "stroll", japanese_translation: "散歩する", full_sentence_japanese: "彼らは毎朝公園を散歩します。", grammar_info: "動詞。ぶらぶら歩く。", source_info: "英検4級頻出単語" },
        { id: 254, sentence: "Lu wants to ___ her potential.", choices: ["unleash", "forget", "hide", "lose"], correct_answer: "unleash", japanese_translation: "解き放つ", full_sentence_japanese: "ルーは自分の潜在能力を解き放ちたいと思っています。", grammar_info: "動詞。抑えていたものを解放する。", source_info: "英検4級頻出単語" },
        { id: 255, sentence: "The store sells many ___ goods.", choices: ["exotic", "common", "old", "new"], correct_answer: "exotic", japanese_translation: "異国情緒のある", full_sentence_japanese: "その店は多くの異国情緒のある商品を売っています。", grammar_info: "形容詞。珍しい、外国風の。", source_info: "英検4級頻出単語" },
        { id: 256, sentence: "Aoi is very ___ about her friends.", choices: ["supportive", "critical", "sad", "angry"], correct_answer: "supportive", japanese_translation: "協力的な", full_sentence_japanese: "葵は友達にとても協力的です。", grammar_info: "形容詞。支えとなる。", source_info: "英検4級頻出単語" },
        { id: 257, sentence: "Natsuki has a ___ for details.", choices: ["keen eye", "blind eye", "weak eye", "bad eye"], correct_answer: "keen eye", japanese_translation: "鋭い目", full_sentence_japanese: "夏生は細部を見抜く鋭い目を持っています。", grammar_info: "名詞句。観察力がある。", source_info: "英検4級頻出単語" },
        { id: 258, sentence: "Sakamoto is a ___ husband.", choices: ["devoted", "bad", "lazy", "busy"], correct_answer: "devoted", japanese_translation: "献身的な", full_sentence_japanese: "坂本は献身的な夫です。", grammar_info: "形容詞。熱心に尽くす。", source_info: "英検4級頻出単語" },
        { id: 259, sentence: "Shin often ___ about his future.", choices: ["contemplates", "forgets", "remembers", "talks"], correct_answer: "contemplates", japanese_translation: "熟考する", full_sentence_japanese: "シンはよく自分の未来について熟考します。", grammar_info: "動詞。深く考える。", source_info: "英検4級頻出単語" },
        { id: 260, sentence: "They ___ to the mountains for adventure.", choices: ["venture", "stay", "sleep", "eat"], correct_answer: "venture", japanese_translation: "冒険する", full_sentence_japanese: "彼らは冒険のために山へ行きます。", grammar_info: "動詞。危険を冒して行く。", source_info: "英検4級頻出単語" },
        { id: 261, sentence: "Lu is very ___ to learn new things.", choices: ["curious", "unwilling", "afraid", "tired"], correct_answer: "curious", japanese_translation: "好奇心旺盛な", full_sentence_japanese: "ルーは新しいことを学ぶのにとても好奇心旺盛です。", grammar_info: "形容詞。知りたがる。", source_info: "英検4級頻出単語" },
        { id: 262, sentence: "The food at the ramen shop is always ___.", choices: ["authentic", "fake", "old", "new"], correct_answer: "authentic", japanese_translation: "本物の", full_sentence_japanese: "ラーメン屋の食べ物はいつも本物です。", grammar_info: "形容詞。本物である。", source_info: "英検4級頻出単語" },
        { id: 263, sentence: "Aoi has a ___ heart.", choices: ["pure", "cold", "strong", "weak"], correct_answer: "pure", japanese_translation: "純粋な", full_sentence_japanese: "葵は純粋な心を持っています。", grammar_info: "形容詞。混じりけがない。", source_info: "英検4級頻出単語" },
        { id: 264, sentence: "Natsuki can ___ many complex situations.", choices: ["navigate", "create", "ignore", "hide"], correct_answer: "navigate", japanese_translation: "操縦する", full_sentence_japanese: "夏生は多くの複雑な状況を操縦することができます。", grammar_info: "動詞。困難な状況をうまく切り抜ける。", source_info: "英検4級頻出単語" },
        { id: 265, sentence: "Sakamoto is a ___ father to Hana.", choices: ["exemplary", "strict", "lazy", "busy"], correct_answer: "exemplary", japanese_translation: "模範的な", full_sentence_japanese: "坂本はハナにとって模範的な父親です。", grammar_info: "形容詞。手本となる。", source_info: "英検4級頻出単語" },
        { id: 266, sentence: "Shin wants to ___ his destiny.", choices: ["shape", "forget", "remember", "hide"], correct_answer: "shape", japanese_translation: "形作る", full_sentence_japanese: "シンは自分の運命を形作りたいと思っています。", grammar_info: "動詞。形成する。", source_info: "英検4級頻出単語" },
        { id: 267, sentence: "They ___ to work diligently every morning.", choices: ["commute", "drive", "run", "fly"], correct_answer: "commute", japanese_translation: "通勤する", full_sentence_japanese: "彼らは毎朝熱心に通勤します。", grammar_info: "動詞。通勤・通学する。", source_info: "英検4級頻出単語" },
        { id: 268, sentence: "Lu is very ___ about her future.", choices: ["visionary", "negative", "sad", "angry"], correct_answer: "visionary", japanese_translation: "先見の明のある", full_sentence_japanese: "ルーは自分の未来にとても先見の明があります。", grammar_info: "形容詞。将来を見通す力がある。", source_info: "英検4級頻出単語" },
    ];

    // --- 2. DOM要素の取得 ---
    const questionCounterEl = document.getElementById('question-counter');
    const sentenceEl = document.getElementById('sentence');
    const choicesEl = document.getElementById('choices');
    const feedbackAreaEl = document.getElementById('feedback-area');
    const feedbackTextEl = document.getElementById('feedback-text');
    const sourceInfoEl = document.getElementById('source-info'); // これを日本語訳表示に使う
    const grammarInfoEl = document.getElementById('grammar-info'); // 新規追加
    const nextButton = document.getElementById('next-button');
    const modeAllButton = document.getElementById('mode-all');
    const modeReviewButton = document.getElementById('mode-review');
    const quizBodyEl = document.getElementById('quiz-body');
    const messageAreaEl = document.getElementById('message-area');
    const speakButton = document.getElementById('speak-button');
    const printButton = document.getElementById('print-button');
    const printContentEl = document.getElementById('print-content');

    // --- 3. 状態管理 ---
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let quizMode = 'all'; // 'all' or 'review'
    let wrongQuestionIds = new Set(JSON.parse(localStorage.getItem('wrongQuestionIds')) || []);
    let correctQuestionIds = new Set(JSON.parse(localStorage.getItem('correctQuestionIds')) || []); // 新規追加

    // --- 4. 関数 ---

    const saveWrongQuestionIds = () => {
        localStorage.setItem('wrongQuestionIds', JSON.stringify(Array.from(wrongQuestionIds)));
    };

    const saveCorrectQuestionIds = () => { // 新規追加
        localStorage.setItem('correctQuestionIds', JSON.stringify(Array.from(correctQuestionIds)));
    };

    // 配列をシャッフルする関数 (Fisher-Yates shuffle)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const setupQuiz = () => {
        quizBodyEl.style.display = 'block';
        messageAreaEl.style.display = 'none';
        feedbackAreaEl.style.display = 'none';

        if (quizMode === 'review') {
            currentQuestions = ALL_QUESTIONS.filter(q => wrongQuestionIds.has(q.id));
        } else {
            currentQuestions = [...ALL_QUESTIONS]; // 全問題のコピー
        }

        if (currentQuestions.length === 0) {
            const message = quizMode === 'review' ? "復習する問題はありません。素晴らしい！" : "問題がありません。";
            quizBodyEl.style.display = 'none';
            messageAreaEl.textContent = message;
            messageAreaEl.style.display = 'block';
            return;
        }

        // 問題をシャッフル
        currentQuestions = shuffleArray(currentQuestions);

        currentQuestionIndex = 0;
        displayQuestion();
    };

    const displayQuestion = () => {
        feedbackAreaEl.style.display = 'none';
        const question = currentQuestions[currentQuestionIndex];

        questionCounterEl.textContent = `問題 ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
        sentenceEl.innerHTML = question.sentence.replace('___', '<span class="blank">＿＿＿</span>');
        
        // 問題文の下に日本語訳を表示
        sourceInfoEl.textContent = question.full_sentence_japanese;
        sourceInfoEl.style.display = 'block'; // 常に表示

        // 文法説明を表示
        if (question.grammar_info) {
            grammarInfoEl.textContent = `[文法] ${question.grammar_info}`;
            grammarInfoEl.style.display = 'block';
        } else {
            grammarInfoEl.style.display = 'none';
        }

        choicesEl.innerHTML = '';

        question.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choice-button');
            button.addEventListener('click', () => handleAnswer(choice, button));
            choicesEl.appendChild(button);
        });
    };

    const handleAnswer = (selectedChoice, button) => {
        const question = currentQuestions[currentQuestionIndex];
        const isCorrect = selectedChoice === question.correct_answer;

        Array.from(choicesEl.children).forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === question.correct_answer) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('disabled');
            }
        });

        if (isCorrect) {
            feedbackTextEl.textContent = '正解です！';
            feedbackTextEl.className = 'correct';
            wrongQuestionIds.delete(question.id);
            correctQuestionIds.add(question.id); // 正解した問題IDを追加
        } else {
            button.classList.remove('disabled');
            button.classList.add('incorrect');
            feedbackTextEl.textContent = `残念、正解は「${question.correct_answer}」です。`;
            feedbackTextEl.className = 'incorrect';
            wrongQuestionIds.add(question.id);
            correctQuestionIds.delete(question.id); // 不正解なら覚えたリストから削除
        }
        
        saveWrongQuestionIds();
        saveCorrectQuestionIds(); // 正解した問題IDを保存

        // sourceInfoEl は問題文の日本語訳表示に使うため、ここではフィードバックテキストのみ
        // sourceInfoEl.textContent = question.japanese_translation ? `(${question.japanese_translation})` : '';
        feedbackAreaEl.style.display = 'block';

        if (currentQuestionIndex >= currentQuestions.length - 1) {
            nextButton.textContent = '結果を見る';
        }
    };

    const speak = (text) => {
        if (!('speechSynthesis' in window)) {
            alert('お使いのブラウザは音声読み上げに対応していません。');
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // デフォルトはen-US

        // よりナチュラルな音声を探す（環境に依存）
        const voices = window.speechSynthesis.getVoices();
        // 女性の音声、またはGoogle/Microsoftの音声、またはデフォルトを優先
        const naturalVoice = voices.find(voice => 
            voice.lang === 'en-US' && 
            (voice.name.includes('female') || voice.name.includes('Female') || 
             voice.name.includes('Google') || voice.name.includes('Microsoft') || 
             voice.default)
        );
        if (naturalVoice) {
            utterance.voice = naturalVoice;
        }
        utterance.rate = 0.7; // 読み上げ速度 (0.1 - 10.0, デフォルト1.0)
        utterance.pitch = 1.0; // ピッチ (0.0 - 2.0, デフォルト1.0)

        window.speechSynthesis.speak(utterance);
    };

    const prepareForPrint = (type) => { // type引数を追加
        let questionsToPrint = [];
        let title = '';

        if (type === 'wrong') {
            questionsToPrint = ALL_QUESTIONS.filter(q => wrongQuestionIds.has(q.id));
            title = '間違えた単語一覧';
            if (questionsToPrint.length === 0) {
                alert('印刷する間違えた問題はありません。');
                return false;
            }
        } else if (type === 'correct') { // 新規追加
            questionsToPrint = ALL_QUESTIONS.filter(q => correctQuestionIds.has(q.id));
            title = '覚えた単語一覧';
            if (questionsToPrint.length === 0) {
                alert('印刷する覚えた問題はありません。');
                return false;
            }
        } else if (type === 'all') { // 全単語一括印刷用
            questionsToPrint = ALL_QUESTIONS; // 全問題を対象
            title = '英検4級 頻出単語一覧 (全問題)';
        }

        let html = `<h1>${title}</h1><ul>`;
        questionsToPrint.forEach(q => {
            html += `
                <li>
                    <div class="word">${q.correct_answer} (${q.japanese_translation})</div>
                    <div class="sentence">${q.sentence.replace('___', ` <strong>${q.correct_answer}</strong> `)}</div>
                    <div class="full-sentence-japanese">${q.full_sentence_japanese}</div>
                    ${q.grammar_info ? `<div class="grammar-info">${q.grammar_info}</div>` : ''}
                </li>
            `;
        });
        html += '</ul>';
        printContentEl.innerHTML = html;
        return true;
    };

    // --- 5. イベントリスナー ---

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            quizBodyEl.style.display = 'none';
            feedbackAreaEl.style.display = 'none';
            messageAreaEl.textContent = 'クイズ終了！お疲れ様でした。';
            messageAreaEl.style.display = 'block';
            nextButton.textContent = '次の問題へ';
        }
    });

    modeAllButton.addEventListener('click', () => {
        quizMode = 'all';
        modeAllButton.classList.add('active');
        modeReviewButton.classList.remove('active');
        setupQuiz();
    });

    modeReviewButton.addEventListener('click', () => {
        quizMode = 'review';
        modeReviewButton.classList.add('active');
        modeAllButton.classList.remove('active');
        setupQuiz();
    });

    speakButton.addEventListener('click', () => {
        if (currentQuestions.length > 0) {
            const question = currentQuestions[currentQuestionIndex];
            const fullSentence = question.sentence.replace('___', question.correct_answer);
            speak(question.correct_answer);
            setTimeout(() => speak(fullSentence), 800); // 単語と例文の間に少し間を置く
        }
    });

    printButton.addEventListener('click', () => {
        if (prepareForPrint('wrong')) { // 間違えた単語を印刷
            window.print();
        }
    });

    // 新規追加: 覚えた単語を印刷ボタン
    const printCorrectButton = document.createElement('button');
    printCorrectButton.id = 'print-correct-button';
    printCorrectButton.classList.add('print-button');
    printCorrectButton.textContent = '✅ 覚えた単語を印刷';
    document.querySelector('.controls-area').appendChild(printCorrectButton);

    printCorrectButton.addEventListener('click', () => {
        if (prepareForPrint('correct')) { // 覚えた単語を印刷
            window.print();
        }
    });

    // 新規追加: 全単語一括印刷ボタン (仮)
    const printAllButton = document.createElement('button');
    printAllButton.id = 'print-all-button';
    printAllButton.classList.add('print-button');
    printAllButton.textContent = '📚 全単語を印刷';
    document.querySelector('.controls-area').appendChild(printAllButton);

    printAllButton.addEventListener('click', () => {
        if (prepareForPrint('all')) { // 全単語を印刷
            window.print();
        }
    });

    // --- 6. 初期化 ---
    setupQuiz();
});
