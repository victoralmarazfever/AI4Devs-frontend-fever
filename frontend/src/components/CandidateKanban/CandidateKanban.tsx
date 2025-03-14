import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Container, Row } from 'react-bootstrap';
import KanbanColumn from './KanbanColumn';
import { getPositionInterviewFlow, getPositionCandidates, updateCandidateStage } from '../../services/positionService';
import { useParams } from 'react-router-dom';

interface Candidate {
  id: number;
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
  applicationId: number;
}

interface InterviewStep {
  id: number;
  name: string;
  orderIndex: number;
}

const CandidateKanban: React.FC = () => {
  const { positionId } = useParams<{ positionId: string }>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
  const [positionName, setPositionName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [flowData, candidatesData] = await Promise.all([
          getPositionInterviewFlow(Number(positionId)),
          getPositionCandidates(Number(positionId))
        ]);
        
        setPositionName(flowData.positionName);
        setInterviewSteps(flowData.interviewFlow.interviewSteps);
        setCandidates(candidatesData);
      } catch (error) {
        console.error('Error loading kanban data:', error);
      }
    };

    loadData();
  }, [positionId]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const candidateId = Number(draggableId);
    const newStepId = Number(destination.droppableId);
    
    try {
      const candidate = candidates.find(c => c.id === candidateId);
      if (!candidate) return;

      await updateCandidateStage(candidateId, candidate.applicationId, newStepId);
      
      // Actualizar el estado local
      const updatedCandidates = candidates.map(c => 
        c.id === candidateId 
          ? { ...c, currentInterviewStep: interviewSteps.find(step => step.id === newStepId)?.name || '' }
          : c
      );
      
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error('Error updating candidate stage:', error);
    }
  };

  return (
    <Container fluid>
      <h2 className="my-4">{positionName}</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Row className="g-4">
          {interviewSteps.map(step => (
            <KanbanColumn
              key={step.id}
              step={step}
              candidates={candidates.filter(c => c.currentInterviewStep === step.name)}
            />
          ))}
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default CandidateKanban; 