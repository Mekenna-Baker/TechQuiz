import React from 'react';
import { mount } from '@cypress/react';
import { getQuestions } from '../../client/src/services/questionApi';
import Quiz from '../../src/components/Quiz';



cy.stub(getQuestions, 'getQuestions').resolves([
    {
        question: 'Scenario 1: Multiple Choice - Single Correct',
        answers: [
          { text: 'Correct Answer', isCorrect: true },
          { text: 'Incorrect Answer 1', isCorrect: false },
          { text: 'Incorrect Answer 2', isCorrect: false },
          { text: 'Incorrect Answer 3', isCorrect: false }
        ],
      },

      {
        question: 'Scenario 2: Multiple Choice - Single Correct',
        answers: [
          { text: 'Incorrect Answer 1', isCorrect: false },
          { text: 'Correct Answer', isCorrect: true },
          { text: 'Incorrect Answer 2', isCorrect: false },
          { text: 'Incorrect Answer 3', isCorrect: false }
        ]
      },

      {
        question: 'Scenario 3: Multiple Choice - Single Correct',
        answers: [
          { text: 'Incorrect Answer 1', isCorrect: false },
          { text: 'Incorrect Answer 2', isCorrect: false },
          { text: 'Correct Answer', isCorrect: true },
          { text: 'Incorrect Answer 3', isCorrect: false }
        ]
      },

      { question: 'Scenario 4: Multiple Choice - Single Correct',
        answers: [
          { text: 'Incorrect Answer 1', isCorrect: false },
          { text: 'Incorrect Answer 2', isCorrect: false },
          { text: 'Incorrect Answer 3', isCorrect: false },
          { text: 'Correct Answer', isCorrect: true }
        ]
      },
]);

describe('Quiz Component Tests with Various Scenarios', () => {
    beforeEach(() => {
      mount(<Quiz />);
    });

    const checkIfLastQuestion = (index, totalQuestions) => {
        if (index === totalQuestions -1) {
            cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
        }
    };
  
    it('should handle multiple-choice questions correctly', () => {
      
      cy.get('button').contains('Start Quiz').click();
      
      
      cy.get('@getQuestions').then((response) => {
        response.body.forEach((question, index) => {
    
          cy.get('h2').should('contain', question.question);
  
  
          const correctAnswer = question.answers.find(answer => answer.isCorrect);
          cy.get('button').contains(correctAnswer.text).click();
  
          if (index === response.body.length - 1) {
            cy.get('.alert-success').should('be.visible').and('contain', 'Your score');

            checkIfLastQuestion(index, totalQuestions);

          }
        });
      });
    });
  });