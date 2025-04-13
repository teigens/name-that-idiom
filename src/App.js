import React, { useState, useEffect } from 'react';
import { Shuffle, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import './App.css';

const idiomsData = [
  {
    idiom: "雨过天晴",
    pinyin: "yǔ guò tiān qíng",
    translation: "Rain / Passes / Sky / Clears",
    meaning: "After the storm comes the calm; things will get better after hardship",
    correct_song: "Here Comes the Sun - The Beatles",
    decoys: [
      "Fix You - Coldplay",
      "Stronger (What Doesn't Kill You) - Kelly Clarkson",
      "I Can See Clearly Now - Johnny Nash",
      "Let It Be - The Beatles"
    ]
  },
  {
    idiom: "万事如意",
    pinyin: "wàn shì rú yì",
    translation: "Ten thousand / Things / As / Wished",
    meaning: "May everything go as you wish; good luck in everything",
    correct_song: "Lucky - Jason Mraz & Colbie Caillat",
    decoys: [
      "Happy - Pharrell Williams",
      "The Climb - Miley Cyrus",
      "Count on Me - Bruno Mars",
      "Good Life - OneRepublic"
    ]
  },
  {
    idiom: "一见钟情",
    pinyin: "yī jiàn zhōng qíng",
    translation: "One / See / To fall / Love",
    meaning: "Love at first sight",
    correct_song: "Love at First Sight - Kylie Minogue",
    decoys: [
      "Can't Help Falling in Love - Elvis Presley",
      "At Last - Etta James",
      "Just the Way You Are - Bruno Mars",
      "Perfect - Ed Sheeran"
    ]
  },
  {
    idiom: "守株待兔",
    pinyin: "shǒu zhū dài tù",
    translation: "Guard / Tree stump / Wait / Rabbit",
    meaning: "To wait passively for opportunities instead of taking action",
    correct_song: "Waiting on the World to Change - John Mayer",
    decoys: [
      "Patience - Guns N' Roses",
      "The Lazy Song - Bruno Mars",
      "Sitting, Waiting, Wishing - Jack Johnson",
      "Don't Stop Believin' - Journey"
    ]
  },
  {
    idiom: "画蛇添足",
    pinyin: "huà shé tiān zú",
    translation: "Draw / Snake / Add / Feet",
    meaning: "To ruin something by adding unnecessary details",
    correct_song: "Too Much - Spice Girls",
    decoys: [
      "Perfect - Simple Plan",
      "Oops!...I Did It Again - Britney Spears",
      "Fix You - Coldplay",
      "Don't Stand So Close to Me - The Police"
    ]
  },
  {
    idiom: "塞翁失马",
    pinyin: "sài wēng shī mǎ",
    translation: "Border / Old man / Loses / Horse",
    meaning: "A blessing in disguise; misfortune may be an actual blessing",
    correct_song: "What Doesn't Kill You (Stronger) - Kelly Clarkson",
    decoys: [
      "Bad Day - Daniel Powter",
      "The Scientist - Coldplay",
      "Unwritten - Natasha Bedingfield",
      "Don't Worry, Be Happy - Bobby McFerrin"
    ]
  },
  {
    idiom: "入乡随俗",
    pinyin: "rù xiāng suí sú",
    translation: "Enter / Village / Follow / Customs",
    meaning: "When in Rome, do as the Romans do",
    correct_song: "When in Rome - Nickel Creek",
    decoys: [
      "New Rules - Dua Lipa",
      "Changes - David Bowie",
      "Welcome to My Life - Simple Plan",
      "This Is How We Do - Katy Perry"
    ]
  },
  {
    idiom: "井底之蛙",
    pinyin: "jǐng dǐ zhī wā",
    translation: "Well / Bottom / Of / Frog",
    meaning: "A person with a limited outlook or narrow experience",
    correct_song: "Small World - Huey Lewis & The News",
    decoys: [
      "Breakaway - Kelly Clarkson",
      "Wide Awake - Katy Perry",
      "Somewhere Only We Know - Keane",
      "Tiny Dancer - Elton John"
    ]
  },
  {
    idiom: "破釜沉舟",
    pinyin: "pò fǔ chén zhōu",
    translation: "Break / Cooking pots / Sink / Boats",
    meaning: "To burn one's bridges; a point of no return",
    correct_song: "Point of No Return - Exposé",
    decoys: [
      "Don't Look Back in Anger - Oasis",
      "Brave - Sara Bareilles",
      "Fight Song - Rachel Platten",
      "I Will Survive - Gloria Gaynor"
    ]
  },
  {
    idiom: "东山再起",
    pinyin: "dōng shān zài qǐ",
    translation: "East / Mountain / Again / Rise",
    meaning: "To make a comeback after a failure",
    correct_song: "Comeback Kid - The Band Perry",
    decoys: [
      "Fighter - Christina Aguilera",
      "Rise Up - Andra Day",
      "Eye of the Tiger - Survivor",
      "Not Giving Up - The Saturdays"
    ]
  }
];

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIdiomIndex, setCurrentIdiomIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(() => Number(localStorage.getItem('score')) || 0);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentIdiom = idiomsData[currentIdiomIndex];

  useEffect(() => {
    if (gameStarted && !gameOver) {
      shuffleOptions();
      setShowHint(false);
    }
  }, [currentIdiomIndex, gameStarted]);

  const shuffleOptions = () => {
    const options = [...currentIdiom.decoys, currentIdiom.correct_song];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowResult(true);
    if (option === currentIdiom.correct_song) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem('score', newScore);
    }
  };

  const nextIdiom = () => {
    if (currentIdiomIndex + 1 < idiomsData.length) {
      setCurrentIdiomIndex(currentIdiomIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentIdiomIndex(0);
    setScore(0);
    localStorage.removeItem('score');
    setGameOver(false);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-indigo-700">Name That Idiom: Music Meets Mandarin🎶</h1>
        <button
          onClick={() => setGameStarted(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-indigo-700">🎉 Game Over!</h1>
        <p className="text-lg mb-6">Your final score: {score} / {idiomsData.length}</p>
        <button
          onClick={restartGame}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Name That Idiom 🎶</h1>
        <p className="text-gray-600">Match the idiom with the song that best expresses its meaning</p>
        <div className="mt-2">
          <span className="text-gray-700 mr-2">Score: {score}</span>
          <span className="text-gray-500 text-sm">({currentIdiomIndex + 1}/{idiomsData.length})</span>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex-grow max-w-xl mx-auto">
        <div className="mb-6 text-center">
          <div className="flex justify-between items-center mb-2">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm hover:bg-indigo-200"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
          </div>

          <h2 className="text-4xl font-bold text-indigo-900 mb-2">{currentIdiom.idiom}</h2>
          <h3 className="text-xl text-indigo-600 mb-3">{currentIdiom.pinyin}</h3>

          <div className="flex justify-center items-center space-x-2 mb-4">
            {currentIdiom.translation.split(" / ").map((part, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-400">|</span>}
                <span className="text-gray-700">{part}</span>
              </React.Fragment>
            ))}
          </div>

          {showHint && (
            <p className="text-gray-600 italic mb-6">"{currentIdiom.meaning}"</p>
          )}

          <div className="mt-6">
            <p className="font-medium text-gray-700 mb-3">Which song best represents this idiom?</p>
            <div className="space-y-3">
              {shuffledOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showResult}
                  className={`w-full p-3 text-left rounded-md border ${
                    selectedOption === option
                      ? option === currentIdiom.correct_song
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                      : showResult && option === currentIdiom.correct_song
                      ? "bg-green-100 border-green-500"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {showResult && (
                      <>
                        {option === currentIdiom.correct_song && (
                          <CheckCircle2 size={20} className="text-green-500" />
                        )}
                        {selectedOption === option && option !== currentIdiom.correct_song && (
                          <XCircle size={20} className="text-red-500" />
                        )}
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between max-w-xl mx-auto mt-4">
        <button
          onClick={shuffleOptions}
          disabled={showResult} // prevent reshuffling mid-question
          className={`px-4 py-2 rounded-md flex items-center ${
            showResult
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Shuffle size={18} className="mr-2" />
          Shuffle Options
        </button>

        <button
          onClick={nextIdiom}
          disabled={!showResult}
          className={`px-4 py-2 rounded-md flex items-center ${
            showResult
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next Idiom
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
