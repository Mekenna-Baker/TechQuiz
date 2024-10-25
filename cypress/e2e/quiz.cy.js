Cypress.config('defaultCommandTimeout', 15000);

describe('Tech Quiz End-to-End Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            body: [
                {
                    question: 'Scenario 1: Multiple Choice - Single Correct',
                    answers: [
                        { text: "Correct Answer", isCorrect: true },
                        { text: "Incorrect Answer 1", isCorrect: false },
                        { text: "Incorrect Answer 2", isCorrect: false },
                        { text: "Incorrect Answer 3", isCorrect: false }
                    ]
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
                        { text: 'Correct Answer', isCorrect: false },
                        { text: 'Incorrect Answer 2', isCorrect: true },
                        { text: 'Incorrect Answer 3', isCorrect: false }
                    ]
                },
                {
                    question: 'Scenario 4: Multiple Choice - Single Correct',
                    answers: [
                        { text: 'Incorrect Answer 1', isCorrect: false },
                        { text: 'Correct Answer', isCorrect: false },
                        { text: 'Incorrect Answer 2', isCorrect: false },
                        { text: 'Incorrect Answer 3', isCorrect: true }
                    ]
                }
            ]
                         
        }).as('getQuestions');

        cy.visit('/');
    });

    it('should allow a user to start the quiz', () => {
        
        cy.get('button').contains('Start Quiz').click();

        cy.wait('@getQuestions');

        cy.get('h2').should('contain', 'Scenario 1: Multiple Choice - Single Correct');
      });
    
      it('should navigate through the quiz and display the final score', () => {
        cy.get('button').contains('Start Quiz').click();

        cy.wait('@getQuestions');

        const questions = [
            {
                question: 'Scenario 1: Multiple Choice - Single Correct',
                correctAnswerIndex: 1 // Index 1 means button labeled as '1'
            },

            {
                question: 'Scenario 2: Multiple Choice - Single Correct',
                correctAnswerIndex: 2 // Index 2 means button labeled as '2'
            },

            {
                question: 'Scenario 3: Multiple Choice - Single Correct',
                correctAnswerIndex: 3 // Index 2 means button labeled as '3'
            },

            {
                question: 'Scenario 4: Multiple Choice - Single Correct',
                correctAnswerIndex: 4 // Index 2 means button labeled as '4'
            }

        ];

        
        questions.forEach((question) => {
            
            cy.get('h2').should('contain', question.question);

            
            cy.get('button').contains(question.correctAnswerIndex.toString()).click(); 
        });

        
        cy.get('.alert-success').should('contain', 'Your score: 4/4');
    });
});