# Prompt 1

(Modo Ask)

Como desarrollador experto en frontend, en concreto con el framework react, ayúdame a implementar una nueva pantalla en este proyecto.
De momento no codifiques nada, analiza el código e indica lo que harías y yo te voy confirmando.

El objetivo es crear una pantalla donde visualizar y gestionar los diferentes candidatos de una posición específica.
Se ha decidido que la interfaz sea tipo kanban, mostrando los candidatos como tarjetas en diferentes columnas que representan las fases del proceso de contratación, y pudiendo actualizar la fase en la que se encuentra un candidato solo arrastrando su tarjeta.
Tienes como ejemplo de interfaz el diseño en @design.png 

Lo primero que vas a hacer es analizar el proyecto y comprobar que entiendes lo que hay hecho hasta ahora. 


# Prompt 2

(Cursor pregunta por el contexto del proyecto y la estructura)
Para entender la estructura actual, fíjate en @frontend . Puedes ver el backend en la carpeta @backend

# Prompt 3

Sí, está perfecto el análisis.

Te voy a dar más información del endpoint existente:

GET /positions/:id/interviewFlow
Este endpoint devuelve información sobre el proceso de contratación para una determinada posición:
- positionName: Título de la posición
- interviewSteps: id y nombre de las diferentes fases de las que consta el proceso de contratación

Ejemplo de respuesta:
{
      "positionName": "Senior backend engineer",
      "interviewFlow": {
              
              "id": 1,
              "description": "Standard development interview process",
              "interviewSteps": [
                  {
                      "id": 1,
                      "interviewFlowId": 1,
                      "interviewTypeId": 1,
                      "name": "Initial Screening",
                      "orderIndex": 1
                  },
                  {
                      "id": 2,
                      "interviewFlowId": 1,
                      "interviewTypeId": 2,
                      "name": "Technical Interview",
                      "orderIndex": 2
                  },
                  {
                      "id": 3,
                      "interviewFlowId": 1,
                      "interviewTypeId": 3,
                      "name": "Manager Interview",
                      "orderIndex": 2
                  }
              ]
          }
  }

GET /positions/:id/candidates
Este endpoint devuelve todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Proporciona la siguiente información:
- name: Nombre completo del candidato
- current_interview_step: en qué fase del proceso está el candidato.
- score: La puntuación media del candidato

Ejemplo de respuesta:
[
      {
           "fullName": "Jane Smith",
           "currentInterviewStep": "Technical Interview",
           "averageScore": 4
       },
       {
           "fullName": "Carlos García",
           "currentInterviewStep": "Initial Screening",
           "averageScore": 0            
       },        
       {
           "fullName": "John Doe",
           "currentInterviewStep": "Manager Interview",
           "averageScore": 5            
      }    
 ]

PUT /candidates/:id/stage
Este endpoint actualiza la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico, a través del parámetro "new_interview_step" y proporionando el interview_step_id correspondiente a la columna en la cual se encuentra ahora el candidato.

Ejemplo de body:
{
     "applicationId": "1",
     "currentInterviewStep": "3"
 }

Ejemplo de respuesta:
{    
    "message": "Candidate stage updated successfully",
     "data": {
         "id": 1,
         "positionId": 1,
         "candidateId": 1,
         "applicationDate": "2024-06-04T13:34:58.304Z",
         "currentInterviewStep": 3,
         "notes": null,
         "interviews": []    
     }
 }

Confírmame que has entendido cómo usar estos endpoints para cuando vayamos adelante con la creación de las pantallas


# Prompt 4

Sí, es correcto el flujo que propones.

Dime ahora qué modificaciones harías en el código para implementarlo

# Prompt 5

(Modo Agent)

Adelante con aplicar los cambios que propones

# Prompt 6

Sí, ejecuta tanto el backend como el frontend para probar la aplicación

# Prompt 7

El backend está fallando. Los endpoint devuelven 404. Qué está fallando?

# Prompt 8

Este es el error ahora:
{"message":"Position not found","error":"\nInvalid `prisma.position.findUnique()` invocation in\n/Users/victor.almaraz@feverup.com/repositories/AI4Devs/AI4Devs-frontend-fever/backend/src/application/services/positionService.ts:37:61\n\n  34 };\n  35 \n  36 export const getInterviewFlowByPositionService = async (positionId: number) => {\n→ 37     const positionWithInterviewFlow = await prisma.position.findUnique(\nCan't reach database server at `localhost:5432`\n\nPlease make sure your database server is running at `localhost:5432`."}


(conflictos con postgres de otros proyectos)