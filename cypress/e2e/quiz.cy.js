Cypress.config('defaultCommandTimeout', 10000);

describe('Tech Quiz End-to-End Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            body: [
                {
                    question: "Scenario 1: True/False",
                    answers: [
                        { text: "Correct Answer", isCorrect: true },
                        { text: "Incorrect Answer", isCorrect: false }
                    ]
                },
                {
                    question: 'Scenario 2: True/True',
                    answers: [
                        { text: 'Correct Answer', isCorrect: true },
                        { text: 'Correct Answer', isCorrect: true }
                    ]
                },
                {
                    question: 'Scenario 3: False/False',
                    answers: [
                        { text: 'Incorrect Answer', isCorrect: false },
                        { text: 'Incorrect Answer', isCorrect: false }
                    ]
                },
                {
                    question: 'Scenario 4: Multiple Choice - Multiple Correct',
                    answers: [
                        { text: 'Choice A', isCorrect: true },
                        { text: 'Choice B', isCorrect: true },
                        { text: 'Choice C', isCorrect: false },
                        { text: 'Choice D', isCorrect: false }
                    ]
                },
                {
                    question: 'Scenario 5: Multiple Choice - Single Correct',
                    answers: [
                        { text: 'Choice A', isCorrect: false },
                        { text: 'Choice B', isCorrect: true },
                        { text: 'Choice C', isCorrect: false },
                        { text: 'Choice D', isCorrect: false }
                    ]
                },
                {
                    question: 'Scenario 6: True/False - Additional',
                    answers: [
                        { text: 'Correct Answer', isCorrect: true },
                        { text: 'Incorrect Answer', isCorrect: false }
                    ]
                },
                {
                    question: 'Scenario 7: True/True - Additional',
                    answers: [
                        { text: 'Correct Answer', isCorrect: true },
                        { text: 'Correct Answer', isCorrect: true }
                    ]
                },
                {
                    question: 'Scenario 8: False/False - Additional',
                    answers: [
                        { text: 'Incorrect Answer', isCorrect: false },
                        { text: 'Incorrect Answer', isCorrect: false }
                    ]
                },
                {
                    question: 'Scenario 9: Multiple Choice - Multiple Correct - Additional',
                    answers: [
                        { text: 'Choice A', isCorrect: true },
                        { text: 'Choice B', isCorrect: true },
                        { text: 'Choice C', isCorrect: false },
                        { text: 'Choice D', isCorrect: false }
                    ]
                },
                {
                    question: 'Scenario 10: Multiple Choice - Single Correct - Additional',
                    answers: [
                        { text: 'Choice A', isCorrect: false },
                        { text: 'Choice B', isCorrect: true },
                        { text: 'Choice C', isCorrect: false },
                        { text: 'Choice D', isCorrect: false }
                    ]
                }
            ]
            
        }).as('getQuestions');

        cy.visit('/');
    });

    it('should allow a user to start the quiz', () => {
        cy.wait('@getQuestions');
        

        cy.get('button').contains('Start Quiz').click();
        cy.get('h2').should('contain', 'Scenario 1: True/False');
      });
    
      it('should navigate through the quiz and display the final score', () => {
        cy.wait('@getQuestions');

        cy.get('button').contains('Start Quiz').click();


        cy.get('button').contains('Correct Answer').click(); // Q1 - True/False
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Correct Answer 1').click(); // Q2 - True/True
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Incorrect Answer 1').click(); // Q3 - False/False
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Choice A').click(); // Q4 - Multiple Correct
        cy.get('button').contains('Choice B').click();
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Correct Choice').click(); // Q5 - Single Correct
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Answer 1').click(); // Q6 - True/False Additional
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Answer A').click(); // Q7 - True/True Additional
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Wrong 1').click(); // Q8 - False/False Additional
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Option 2').click(); // Q9 - Mixed Multiple Choice
        cy.get('button').contains('Option 4').click();
        cy.get('button').contains('Next').click();
    
        cy.get('button').contains('Only Correct Answer').click(); // Q10 - Single Correct 
        cy.get('button').contains('Next').click();
    

        cy.get('.alert-success').should('contain', 'Your score: X/10'); 
      });
    });