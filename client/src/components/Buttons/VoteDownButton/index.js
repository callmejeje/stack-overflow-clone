import { Button } from './style';

function VoteUpButton({ handleVote }) {
  return (
    <Button onClick={() => handleVote(-1)}>
      <svg width="36" height="36">
        <path d="M2 11h32L18 27 2 11Z" fill="currentColor"></path>
      </svg>
    </Button>
  );
}

export default VoteUpButton;
