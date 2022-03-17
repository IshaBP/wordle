interface Letter {
  key: KeyCode;
  matchStatus: MatchStatus;
}

type Row = Array<Letter>;

export interface WordboardProps {
  game: Array<Row>;
  latestRowStatus: "ACCEPTED" | "IN_PROGRESS" | "INVALID";
}

export const Wordboard = ({ game, latestRowStatus }: WordboardProps) => {
  return (
    <section>
      {game.map((guessWord, wordIdx) => (
        <div key={wordIdx} aria-label={"guess-word"}>
          {guessWord.map((letter, letterIdx) => (
            <span key={letterIdx} aria-label={"letter"}>
              {letter.matchStatus}
            </span>
          ))}
        </div>
      ))}
    </section>
  );
};
