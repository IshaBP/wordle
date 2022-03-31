type MatchStatus = 'MATCH' | 'NO_MATCH' | 'PARTIAL_MATCH';

type KeyCode =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | '<ENT>'
  | '<BKSP>';

interface WordleStatus {
  currentGame: {
    acceptedWords: string[];
    chosenWord: string;
  };
  stats: {
    won: number;
    lost: number;
    abandoned: number;
  };
  wordList: string[];
}
