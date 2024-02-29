describe('Students full test', () => {
     it('full test', () => {
          cy.visit('http://localhost:5173/alunos');

          //* Create Student
          cy.get('#add-student').click(); 

          cy.get('#name').type('Cadastro Aluno Cypress');
          cy.get('#email').type('aluno_cypress@gmail.com');
          cy.get('#cellphone').type('32991456783');

          cy.get('#primary-button').click(); 

          //* Edit Student
          cy.get('#item-1').get('#edit').click();
          
          cy.get('#name').clear().type('Cadastro Aluno Editado');
          cy.get('#email').clear().type('aluno_cypress_editado@gmail.com');
          cy.get('#cellphone').clear().type('32991454430');
          
          cy.get('#primary-button').click();
          
          //* Delete Student
          cy.get('#item-5').get('#delete').click();
          cy.get('#delete-student').click();
     })
})