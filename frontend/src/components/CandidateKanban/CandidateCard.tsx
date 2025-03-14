import React from 'react';
import { Card } from 'react-bootstrap';
import { CircleFill } from 'react-bootstrap-icons';

interface CandidateCardProps {
  candidate: {
    fullName: string;
    averageScore: number;
  };
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{candidate.fullName}</Card.Title>
        <div>
          {[...Array(5)].map((_, i) => (
            <CircleFill
              key={i}
              className="me-1"
              color={i < candidate.averageScore ? '#28a745' : '#e9ecef'}
              size={12}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard; 