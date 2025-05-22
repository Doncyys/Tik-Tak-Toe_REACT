describe('Tic Tac Toe Game', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render 9 empty tiles', () => {
    cy.get('button.square').should('have.length', 9);
    cy.get('button.square').each(($btn) => {
      cy.wrap($btn).should('have.text', '');
    });
  });

  it('Should alternate between X and O on clicks', () => {
    cy.get('button.square').eq(0).click().should('contain', 'X');
    cy.get('button.square').eq(1).click().should('contain', 'O');
  });

  it('Should not allow overwriting a tile', () => {
    cy.get('button.square').eq(0).click().should('contain', 'X');
    cy.get('button.square').eq(0).click().should('contain', 'X'); // stays X
  });

  it('Should reset board when clicking "Pradėti iš naujo"', () => {
    cy.get('button.square').eq(0).click();
    cy.contains('Pradėti iš naujo').click();
    cy.get('button.square').each(($btn) => {
      cy.wrap($btn).should('have.text', '');
    });
  });

  it('Should stop moves after game ends', () => {
    // Simulate win for X (0, 3, 6)
    const winMoves = [0, 1, 3, 2, 6];
    winMoves.forEach((i) => {
      cy.get('button.square').eq(i).click();
    });

    cy.contains('Laimėjo: X').should('exist');

    cy.get('button.square').each(($btn) => {
      const text = $btn.text().trim();
      if (text === '') {
        cy.wrap($btn).click();
        cy.wrap($btn).should('have.text', '');
      }
    });
  });

  it('Should end in a draw when no one wins', () => {
    const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    drawMoves.forEach((index) => {
      cy.get('button.square').eq(index).click();
    });

    cy.contains('Laimėjo').should('not.exist');
    cy.contains('Lygiosios').should('exist');
  });

  it('Should detect X as the winner', () => {
    const moves = [0, 1, 3, 2, 6]; // X wins vertically (0-3-6)
    moves.forEach((i) => {
      cy.get('button.square').eq(i).click();
    });
    cy.contains('Laimėjo: X').should('exist');
  });

  it('Should detect O as the winner', () => {
    // O wins diagonally (2, 4, 6)
    const moves = [0, 2, 1, 4, 3, 6]; // X, O, X, O, X, O
    moves.forEach((i) => {
      cy.get('button.square').eq(i).click();
    });
    cy.contains('Laimėjo: O').should('exist');
  });
});
