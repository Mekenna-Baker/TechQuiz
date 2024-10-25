import React from 'react';
import { mount } from '@cypress/react';
import { getQuestions } from '../../client/src/services/questionApi';
import Quiz from '../../src/components/Quiz';

cy.stub(getQuestions, 'getQuestions').resolves([
    {
        question: 'Scenario 1: True/False',
        answers: [
            { text: 'Correct Answer', isCorrect: true },
            {text: 'Incorrect Answer', isCorrect: false}, 
        ],
      },

      {
        question: 'Scenario 2:  True/True',
        answers: [
            { text: 'Correct Answer', isCorrect: true },
            {text: 'Correct Answer', isCorrect: true}, 
        ]
      },

      {
        question: 'Scenario 3: False/False',
        answers: [
            { text: 'Incorrect Answer', isCorrect: false },
            {text: 'Incorrect Answer', isCorrect: false}, 
        ]
      },

      { question: 'Scenario 4: Multiple Choice -Multiple Correct',
        answers: [
            { text: 'Correct Answer', isCorrect: true },
            {text: 'Correct Answer', isCorrect: true},
            {text: 'Incorrect Answer', isCorrect: false},
            {text: 'Incorrect Answer', isCorrect: false},
        ]
      },

      { question: 'Scenario 5: Multiple Choice - Single Correct',
        answers: [
            { text: 'Correct Answer', isCorrect: true },
            {text: 'Incorrect Answer', isCorrect: false},
            {text: 'Incorrect Answer', isCorrect: false},
            {text: 'Incorrect Answer', isCorrect: false},
        ]
      }
]);

describe('Quiz Component Tests with Various Scenarios', () => {
    beforeEach(() => {
      mount(<Quiz />);
    });

    const checkIfLastQuestion = (index, totalQuestions) => {
        if (index === totalQuestions -1) {
            cy.get('.alert-success').should('be.visible');
        }
    };
  
    it('should display the Start button initially', () => {
        cy.get('button').contains('Start Quiz').should('be.visible');
      });
    
      it('should handle the True/False scenario correctly', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2').contains('Scenario 1: True/False').should('be.visible');
    
        cy.get('button').contains('Correct Answer').click();
        cy.get('button').contains('Next').click();
      });
    
      it('should handle the True/True scenario correctly', () => {
        cy.get('button').contains('Correct Answer 1').click();
        cy.get('button').contains('Next').click();
      });
    
      it('should handle the False/False scenario correctly', () => {
        cy.get('button').contains('Incorrect Answer 1').click();
        cy.get('button').contains('Next').click();
      });
    
      it('should handle a multiple-choice question with a single correct answer', () => {
        cy.get('h2').contains('Scenario 5: Multiple Choice - Single Correct').should('be.visible');

        cy.get('button').contains('Correct Choice').click();
        cy.get('button').contains('Next').click();

        checkIfLastQuestion(9, 10); questions
      });
    });