document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. グローバル変数とDOM要素の取得 ---
    let ALL_QUESTIONS = [];
    const questionCounterEl = document.getElementById('question-counter');
    const sentenceEl = document.getElementById('sentence');
    const choicesEl = document.getElementById('choices');
    const feedbackAreaEl = document.getElementById('feedback-area');
    const feedbackTextEl = document.getElementById('feedback-text');
    const sourceInfoEl = document.getElementById('source-info');
    const grammarInfoEl = document.getElementById('grammar-info');
    const nextButton = document.getElementById('next-button');
    const modeAllButton = document.getElementById('mode-all');
    const modeReviewButton = document.getElementById('mode-review');
    const quizBodyEl = document.getElementById('quiz-body');
    const messageAreaEl = document.getElementById('message-area');
    const speakButton = document.getElementById('speak-button');
    const printWrongButton = document.getElementById('print-wrong-button');
    const printCorrectButton = document.getElementById('print-correct-button');
    const printAllButton = document.getElementById('print-all-button');
    const printContentEl = document.getElementById('print-content');
    
    // 🌟 新しい楽しい要素のDOM要素
    const correctCountEl = document.getElementById('correct-count');
    const totalCountEl = document.getElementById('total-count');
    const streakCountEl = document.getElementById('streak-count');
    const levelDisplayEl = document.getElementById('level-display');
    const accuracyDisplayEl = document.getElementById('accuracy-display');
    const characterEmojiEl = document.getElementById('character-emoji');
    const characterSpeechEl = document.getElementById('character-speech');
    const progressFillEl = document.getElementById('progress-fill');
    const hintButtonEl = document.getElementById('hint-button');
    const hintAreaEl = document.getElementById('hint-area');
    const hintTextEl = document.getElementById('hint-text');
    const relatedWordsEl = document.getElementById('related-words');

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let quizMode = 'all';
    let wrongQuestionIds = new Set(JSON.parse(localStorage.getItem('wrongQuestionIds')) || []);
    let correctQuestionIds = new Set(JSON.parse(localStorage.getItem('correctQuestionIds')) || []);
    
    // 🎮 ゲーミフィケーション変数
    let currentStreak = parseInt(localStorage.getItem('currentStreak')) || 0;
    let totalCorrect = parseInt(localStorage.getItem('totalCorrect')) || 0;
    let totalAnswered = parseInt(localStorage.getItem('totalAnswered')) || 0;
    let playerLevel = parseInt(localStorage.getItem('playerLevel')) || 1;
    let playerXP = parseInt(localStorage.getItem('playerXP')) || 0;
    let hintsUsed = 0;
    
    // 🎭 キャラクター設定
    const characters = {
        sakamoto: { emoji: '🥷', name: '坂本', color: '#2c3e50' },
        shin: { emoji: '⚡', name: 'シン', color: '#e74c3c' },
        lu: { emoji: '🐉', name: 'ルー', color: '#f39c12' },
        aoi: { emoji: '🌸', name: 'アオイ', color: '#27ae60' },
        heisuke: { emoji: '🎯', name: 'ヘイスケ', color: '#8e44ad' },
        natsuki: { emoji: '💻', name: 'ナツキ', color: '#3498db' }
    };
    
    let currentCharacter = characters.sakamoto;

    // --- 2. CSVデータから問題リストを読み込む関数 ---
    const loadQuestions = async () => {
        try {
            // ★読み込むファイルを eiken_words_problems.csv に変更
            const response = await fetch('eiken_grade4_complete_800.csv');
            const csvData = await response.text();
            
            const lines = csvData.trim().split('\n');
            
            ALL_QUESTIONS = lines.slice(1).map(line => {
                const values = line.split(',');
                const questionObject = {
                    id: parseInt(values[0], 10),
                    question: values[1],
                    choices: [values[2], values[3], values[4], values[5]],
                    correct_answer_index: parseInt(values[6], 10),
                    explanation: values.slice(7).join(',') 
                };
                questionObject.correct_answer = questionObject.choices[questionObject.correct_answer_index - 1];
                questionObject.full_sentence_japanese = questionObject.explanation;
                questionObject.grammar_info = '';
                
                return questionObject;
            });
        } catch (error) {
            console.error('問題データの読み込みに失敗しました:', error);
            messageAreaEl.textContent = '問題データの読み込みに失敗しました。ファイルが存在するか確認してください。';
            messageAreaEl.style.display = 'block';
            quizBodyEl.style.display = 'none';
        }
    };

    // --- 3. 既存の関数群 ---

    const saveWrongQuestionIds = () => {
        localStorage.setItem('wrongQuestionIds', JSON.stringify(Array.from(wrongQuestionIds)));
    };

    const saveCorrectQuestionIds = () => {
        localStorage.setItem('correctQuestionIds', JSON.stringify(Array.from(correctQuestionIds)));
    };

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
            currentQuestions = [...ALL_QUESTIONS];
        }

        if (currentQuestions.length === 0) {
            const message = quizMode === 'review' ? "復習する問題はありません。素晴らしい！" : "問題がありません。";
            quizBodyEl.style.display = 'none';
            messageAreaEl.textContent = message;
            messageAreaEl.style.display = 'block';
            return;
        }

        currentQuestions = shuffleArray(currentQuestions);
        currentQuestionIndex = 0;
        displayQuestion();
    };

    const displayQuestion = () => {
        feedbackAreaEl.style.display = 'none';
        hintAreaEl.style.display = 'none';
        const question = currentQuestions[currentQuestionIndex];
        
        // プログレスバー更新
        const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
        progressFillEl.style.width = `${progress}%`;

        questionCounterEl.textContent = `問題 ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
        sentenceEl.innerHTML = question.question.replace('___', '<span class="blank">＿＿＿</span>');
        
        sourceInfoEl.textContent = question.explanation;
        sourceInfoEl.style.display = 'block';

        grammarInfoEl.style.display = 'none';
        
        // キャラクター変更（問題に応じて）
        changeCharacterForQuestion(question);

        choicesEl.innerHTML = '';

        question.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choice-button');
            button.addEventListener('click', () => handleAnswer(choice, button));
            choicesEl.appendChild(button);
        });
        
        // ヒント機能リセット
        hintsUsed = 0;
        updateUI();
    };

    const handleAnswer = (selectedChoice, button) => {
        const question = currentQuestions[currentQuestionIndex];
        const isCorrect = selectedChoice === question.correct_answer;
        
        // 統計更新
        totalAnswered++;
        localStorage.setItem('totalAnswered', totalAnswered.toString());

        Array.from(choicesEl.children).forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === question.correct_answer) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('disabled');
            }
        });

        if (isCorrect) {
            // 🎉 正解時の楽しい演出
            currentStreak++;
            totalCorrect++;
            playerXP += getXPReward();
            
            feedbackTextEl.innerHTML = getCorrectMessage();
            feedbackTextEl.className = 'correct';
            
            // キャラクターリアクション
            showCharacterReaction('correct');
            
            // 振動とサウンド効果
            playCorrectEffects();
            
            wrongQuestionIds.delete(question.id);
            correctQuestionIds.add(question.id);
            
            // 🎆 特別エフェクト（高ストリーク時）
            if (currentStreak >= 10) {
                document.querySelector('.quiz-container').classList.add('celebration-mode');
                setTimeout(() => {
                    document.querySelector('.quiz-container').classList.remove('celebration-mode');
                }, 2000);
            }
            
            // レベルアップチェック
            checkLevelUp();
            
        } else {
            // 😅 不正解時の演出
            currentStreak = 0;
            
            button.classList.remove('disabled');
            button.classList.add('incorrect');
            feedbackTextEl.innerHTML = getIncorrectMessage(question.correct_answer);
            feedbackTextEl.className = 'incorrect';
            
            // キャラクターリアクション
            showCharacterReaction('incorrect');
            
            // 振動効果
            playIncorrectEffects();
            
            wrongQuestionIds.add(question.id);
            correctQuestionIds.delete(question.id);
        }
        
        // 関連単語を表示
        showRelatedWords(question);
        
        // データ保存
        saveGameData();
        updateUI();

        feedbackAreaEl.style.display = 'block';

        if (currentQuestionIndex >= currentQuestions.length - 1) {
            nextButton.textContent = '結果を見る 🏆';
        }
    };

    const speak = (text) => {
        if (!('speechSynthesis' in window)) {
            alert('お使いのブラウザは音声読み上げに対応していません。');
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        const voices = window.speechSynthesis.getVoices();
        const naturalVoice = voices.find(voice => 
            voice.lang === 'en-US' && 
            (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.default)
        );
        if (naturalVoice) {
            utterance.voice = naturalVoice;
        }
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    };

    const prepareForPrint = (type) => {
        let questionsToPrint = [];
        let title = '';

        if (type === 'wrong') {
            questionsToPrint = ALL_QUESTIONS.filter(q => wrongQuestionIds.has(q.id));
            title = '間違えた単語一覧';
            if (questionsToPrint.length === 0) {
                alert('印刷する間違えた問題はありません。');
                return false;
            }
        } else if (type === 'correct') {
            questionsToPrint = ALL_QUESTIONS.filter(q => correctQuestionIds.has(q.id));
            title = '覚えた単語一覧';
            if (questionsToPrint.length === 0) {
                alert('印刷する覚えた問題はありません。');
                return false;
            }
        } else if (type === 'all') {
            questionsToPrint = ALL_QUESTIONS;
            title = 'SAKAMOTO DAYS 英単語クイズ (全問題)';
        }

        let html = `<h1>${title}</h1><ul>`;
        questionsToPrint.forEach(q => {
            html += `
                <li>
                    <div class="word">${q.correct_answer}</div>
                    <div class="sentence">${q.question.replace('___', ` <strong>${q.correct_answer}</strong> `)}</div>
                    <div class="full-sentence-japanese">${q.explanation}</div>
                </li>
            `;
        });
        html += '</ul>';
        printContentEl.innerHTML = html;
        return true;
    };

    // --- 4. イベントリスナー ---

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            // 🏆 クイズ終了時の特別演出
            quizBodyEl.style.display = 'none';
            feedbackAreaEl.style.display = 'none';
            
            const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
            let endMessage = '🎉 クイズ終了！お疲れ様でした！\n\n';
            endMessage += `📊 今回の成績\n`;
            endMessage += `正解率: ${accuracy}%\n`;
            endMessage += `連続正解: ${currentStreak}問\n`;
            endMessage += `現在のレベル: ${playerLevel}\n\n`;
            
            if (accuracy >= 90) {
                endMessage += '🏆 素晴らしい成績です！';
            } else if (accuracy >= 70) {
                endMessage += '🌟 よく頑張りました！';
            } else {
                endMessage += '💪 復習して再チャレンジしよう！';
            }
            
            messageAreaEl.innerHTML = endMessage.replace(/\n/g, '<br>');
            messageAreaEl.style.display = 'block';
            nextButton.textContent = '次の問題へ';
            
            // 祝福の振動
            if (navigator.vibrate && accuracy >= 70) {
                navigator.vibrate([200, 100, 200, 100, 200]);
            }
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
            const fullSentence = question.question.replace('___', question.correct_answer);
            speak(question.correct_answer);
            setTimeout(() => speak(fullSentence), 800);
        }
    });

    printWrongButton.addEventListener('click', () => {
        if (prepareForPrint('wrong')) {
            window.print();
        }
    });

    printCorrectButton.addEventListener('click', () => {
        if (prepareForPrint('correct')) {
            window.print();
        }
    });

    printAllButton.addEventListener('click', () => {
        if (prepareForPrint('all')) {
            window.print();
        }
    });

    // --- 🎮 ゲーミフィケーション関数群 ---
    
    const getXPReward = () => {
        let baseXP = 10;
        if (currentStreak >= 5) baseXP += 5;
        if (currentStreak >= 10) baseXP += 10;
        return baseXP;
    };
    
    const checkLevelUp = () => {
        const xpForNextLevel = playerLevel * 100;
        if (playerXP >= xpForNextLevel) {
            playerLevel++;
            playerXP = 0;
            showLevelUpAnimation();
        }
    };
    
    const showLevelUpAnimation = () => {
        // レベルアップの豪華演出
        characterSpeechEl.innerHTML = `🎉 レベル${playerLevel}にレベルアップ！`;
        characterSpeechEl.classList.add('show');
        
        // 🏆 レベルアップエフェクトを画面中央に表示
        const levelUpDiv = document.createElement('div');
        levelUpDiv.className = 'level-up-effect';
        levelUpDiv.innerHTML = `🏆 LEVEL ${playerLevel}! 🎉`;
        document.body.appendChild(levelUpDiv);
        
        // 🎉 パーティクルエフェクト
        createParticleEffect();
        
        // 🌈 プログレスバーに特別エフェクト
        progressFillEl.classList.add('level-up');
        
        setTimeout(() => {
            characterSpeechEl.classList.remove('show');
            levelUpDiv.remove();
            progressFillEl.classList.remove('level-up');
        }, 3000);
        
        // 振動と音
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 300]);
        }
        playLevelUpSound();
    };
    
    const getCorrectMessage = () => {
        const messages = [
            '🎉 やったね！',
            '✨ 素晴らしい！',
            '🌟 完璧だよ！',
            '💖 大正解！',
            '🎯 その調子！'
        ];
        if (currentStreak >= 5) {
            return `🔥 ${currentStreak}連続正解！すごいよ！`;
        }
        return messages[Math.floor(Math.random() * messages.length)];
    };
    
    const getIncorrectMessage = (correctAnswer) => {
        const encouragements = [
            '💪 次は頑張ろう！',
            '😊 大丈夫、覚えよう！',
            '🌈 もう一度チャレンジ！',
            '⭐ 間違いから学ぼう！'
        ];
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        return `正解は「${correctAnswer}」でした。${encouragement}`;
    };
    
    const showCharacterReaction = (type) => {
        const reactions = {
            correct: {
                sakamoto: '👍 ナイス！',
                shin: '⚡ キレがあるね！',
                lu: '🐉 流石だ！',
                aoi: '🌸 よくできました！',
                heisuke: '🎯 的確だ！',
                natsuki: '💻 データ完璧！'
            },
            incorrect: {
                sakamoto: '🤔 次は大丈夫！',
                shin: '⚡ もう一度だ！',
                lu: '🐉 諦めるな！',
                aoi: '🌸 頑張って！',
                heisuke: '🎯 集中しよう！',
                natsuki: '💻 分析してみよう！'
            }
        };
        
        const characterKey = Object.keys(characters).find(key => characters[key] === currentCharacter);
        // メッセージ表示機能を削除
        // characterSpeechEl.innerHTML = reactions[type][characterKey];
        // characterSpeechEl.classList.add('show');
        
        // キャラクターのクラスを追加
        characterEmojiEl.parentElement.className = 'character-avatar character-' + characterKey;
        
        // 正解時はコンボエフェクトも追加
        if (type === 'correct') {
            addStreakCombo();
            // キャラクターのジャンプアニメーション
            characterEmojiEl.style.animation = 'none';
            setTimeout(() => {
                characterEmojiEl.style.animation = 'characterBob 2s ease-in-out infinite, correctBounce 0.6s ease-out';
            }, 10);
        }
        
        // メッセージ非表示タイマーも削除
        // setTimeout(() => {
        //     characterSpeechEl.classList.remove('show');
        // }, 2500);
    };
    
    const changeCharacterForQuestion = (question) => {
        // 問題に応じてキャラクターを変更
        const charKeys = Object.keys(characters);
        const charIndex = (question.id - 1) % charKeys.length;
        currentCharacter = characters[charKeys[charIndex]];
        characterEmojiEl.textContent = currentCharacter.emoji;
        
        // 応援メッセージ機能を削除
        // characterSpeechEl.innerHTML = '';
        // characterSpeechEl.classList.remove('show');
    };
    
    const playCorrectEffects = () => {
        // 振動
        if (navigator.vibrate) {
            navigator.vibrate([50, 50, 100]);
        }
        
        // サウンド
        playBeep(800, 150);
        
        // 💖 ハートアニメーション
        if (currentStreak > 0 && currentStreak % 3 === 0) {
            createHeartEffect();
        }
        
        // 🔥 ストリークエフェクト
        if (currentStreak >= 5) {
            streakCountEl.parentElement.classList.add('streak-glow');
            setTimeout(() => {
                streakCountEl.parentElement.classList.remove('streak-glow');
            }, 1000);
        }
        
        // ✨ キャラクターにキラキラエフェクト
        characterEmojiEl.parentElement.classList.add('sparkle-effect');
        setTimeout(() => {
            characterEmojiEl.parentElement.classList.remove('sparkle-effect');
        }, 2000);
    };
    
    const playIncorrectEffects = () => {
        // 振動
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
        
        // サウンド（低い音を生成）
        playBeep(200, 200);
    };
    
    const playBeep = (frequency, duration) => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        } catch (e) {
            // オーディオが利用できない場合はスキップ
        }
    };
    
    const playLevelUpSound = () => {
        // 🎵 レベルアップの特別メロディ
        const notes = [523, 587, 659, 698, 784]; // C, D, E, F, G
        notes.forEach((note, index) => {
            setTimeout(() => playBeep(note, 200), index * 150);
        });
    };
    
    const createHeartEffect = () => {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight - 100 + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    };
    
    const createParticleEffect = () => {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        document.body.appendChild(particleContainer);
        
        // パーティクルを作成
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.animationDelay = Math.random() * 2 + 's';
                particle.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)];
                
                particleContainer.appendChild(particle);
            }, i * 50);
        }
        
        setTimeout(() => {
            particleContainer.remove();
        }, 4000);
    };
    
    const addStreakCombo = () => {
        if (currentStreak >= 3) {
            const comboDiv = document.createElement('div');
            comboDiv.style.position = 'fixed';
            comboDiv.style.top = '30%';
            comboDiv.style.right = '20px';
            comboDiv.style.fontSize = '1.5rem';
            comboDiv.style.fontWeight = 'bold';
            comboDiv.style.color = '#ff6b6b';
            comboDiv.style.zIndex = '1000';
            comboDiv.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
            comboDiv.innerHTML = `🔥 ${currentStreak} COMBO!`;
            comboDiv.className = 'combo-animation';
            
            document.body.appendChild(comboDiv);
            
            setTimeout(() => {
                comboDiv.remove();
            }, 1500);
        }
    };
    
    const showRelatedWords = (question) => {
        const relatedWords = [
            question.correct_answer,
            ...question.choices.filter(choice => choice !== question.correct_answer)
        ];
        
        relatedWordsEl.innerHTML = '<strong>関連単語:</strong> ' + 
            relatedWords.map(word => `<span class="related-word-item">${word}</span>`).join('');
    };
    
    const updateUI = () => {
        correctCountEl.textContent = totalCorrect;
        totalCountEl.textContent = totalAnswered;
        streakCountEl.textContent = currentStreak;
        levelDisplayEl.textContent = `Lv.${playerLevel}`;
        
        // 正答率を計算して表示
        const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
        accuracyDisplayEl.textContent = `${accuracy}%`;
        
        // 正答率に応じて色を変更
        if (accuracy >= 80) {
            accuracyDisplayEl.parentElement.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            accuracyDisplayEl.parentElement.style.color = 'white';
        } else if (accuracy >= 60) {
            accuracyDisplayEl.parentElement.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
            accuracyDisplayEl.parentElement.style.color = 'white';
        } else {
            accuracyDisplayEl.parentElement.style.background = 'linear-gradient(135deg, #ffffff, #f1f3f4)';
            accuracyDisplayEl.parentElement.style.color = 'var(--primary-text)';
        }
    };
    
    const saveGameData = () => {
        localStorage.setItem('currentStreak', currentStreak.toString());
        localStorage.setItem('totalCorrect', totalCorrect.toString());
        localStorage.setItem('totalAnswered', totalAnswered.toString());
        localStorage.setItem('playerLevel', playerLevel.toString());
        localStorage.setItem('playerXP', playerXP.toString());
        saveWrongQuestionIds();
        saveCorrectQuestionIds();
    };
    
    // ヒント機能
    const showHint = () => {
        if (hintsUsed < 2) {
            const question = currentQuestions[currentQuestionIndex];
            let hintText = '';
            
            if (hintsUsed === 0) {
                hintText = `💡 この単語は「${question.correct_answer.charAt(0)}」から始まります！`;
            } else {
                const wrongChoices = question.choices.filter(choice => choice !== question.correct_answer);
                const eliminateChoice = wrongChoices[Math.floor(Math.random() * wrongChoices.length)];
                hintText = `💡 「${eliminateChoice}」は違うよ！`;
                
                // 該当するボタンを薄くする
                Array.from(choicesEl.children).forEach(btn => {
                    if (btn.textContent === eliminateChoice) {
                        btn.style.opacity = '0.5';
                        btn.style.transform = 'scale(0.95)';
                    }
                });
            }
            
            hintTextEl.textContent = hintText;
            hintAreaEl.style.display = 'block';
            hintsUsed++;
            
            // XP少し減らす（ヒント使用ペナルティ）
            if (playerXP > 0) playerXP = Math.max(0, playerXP - 2);
        }
    };

    // --- 5. 初期化処理 ---
    const initializeApp = async () => {
        // ヒントボタンイベント
        hintButtonEl.addEventListener('click', showHint);
        
        // キャラクタークリックイベント（応援メッセージ機能を削除）
        // characterEmojiEl.addEventListener('click', () => {
        //     // 応援メッセージ機能は削除されました
        // });

        // CSVを読み込んでからクイズを開始
        await loadQuestions();
        updateUI();
        setupQuiz();
    };

    initializeApp();
});