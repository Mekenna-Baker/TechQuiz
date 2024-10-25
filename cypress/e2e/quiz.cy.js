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


  });