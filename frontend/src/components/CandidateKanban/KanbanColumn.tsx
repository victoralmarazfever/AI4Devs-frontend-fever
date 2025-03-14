import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';

interface KanbanColumnProps {
  step: {
    id: number;
    name: string;
  };
  candidates: Array<{
    id: number;
    fullName: string;
    averageScore: number;
  }>;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ step, candidates }) => {
  return (
    <Col md={3}>
      <Card className="h-100">
        <Card.Header>
          <h5 className="mb-0">{step.name}</h5>
          <small className="text-muted">{candidates.length} candidates</small>
        </Card.Header>
        <Droppable droppableId={String(step.id)}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-2"
              style={{ minHeight: '500px' }}
            >
              {candidates.map((candidate, index) => (
                <Draggable
                  key={candidate.id}
                  draggableId={String(candidate.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CandidateCard candidate={candidate} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </Col>
  );
};

export default KanbanColumn; 