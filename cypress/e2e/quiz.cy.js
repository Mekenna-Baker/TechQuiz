Cypress.config('defaultCommandTimeout', 10000);

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

        const clickButtonByIndex = (index) => {
            cy.get('button').contains(index + 1).click();
        };

        clickButtonByIndex(0); 
        cy.wait('@getQuestions');

        clickButtonByIndex(1);
        cy.wait('@getQuestions');

        clickButtonByIndex(2); 
        cy.wait('@getQuestions');

        clickButtonByIndex(3); 
        cy.wait('@getQuestions');

        cy.get('.alert-success').should('contain', 'Your score: 4/4');
    });
});